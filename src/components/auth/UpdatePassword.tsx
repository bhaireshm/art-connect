"use client";

import classes from "@/assets/styles/auth.module.css";
import { API } from "@/core";
import type { ReadOnlyProps } from "@/types";
import { ROUTES } from "@/utils/constants";
import {
  Anchor,
  Box,
  Button,
  Center,
  Container,
  Divider,
  Group,
  Paper,
  PasswordInput,
  rem,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconArrowLeft } from "@tabler/icons-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function UpdatePassword(props: ReadOnlyProps<{ resetMode: boolean }>) {
  const [isResetMode, setIsResetMode] = useState(props.resetMode);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();

  const form = useForm({
    initialValues: {
      email: "",
      newPassword: "",
      confirmPassword: "",
    },
    validate: {
      email: (value) => !isResetMode && (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      newPassword: (value) =>
        isResetMode && value.length < 6 ? "Password must be at least 6 characters" : null,
      confirmPassword: (value, values) =>
        isResetMode && value !== values.newPassword ? "Passwords do not match" : null,
    },
  });

  useEffect(() => {
    const resetToken = searchParams.get("token");
    if (resetToken) setIsResetMode(true);
  }, [searchParams]);

  const handleSubmit = async (values: typeof form.values) => {
    console.log("file: ResetPassword.tsx:52  handleSubmit  values", values);
    setIsLoading(true);
    setMessage("");

    try {
      let response;
      if (isResetMode)
        response = await API.post("/api/auth/update-password", {
          method: "POST",
          data: { newPassword: values.newPassword, resetToken: searchParams.get("token") },
        });
      else
        response = await API.post("/api/auth/update-password", {
          method: "POST",
          data: { email: values.email },
        });

      console.log("file: ResetPassword.tsx:70  handleSubmit  response", response);
      let msg;
      if (response.status) {
        msg =
          response.data.message ||
          (isResetMode
            ? "Password updated successfully."
            : "Reset email sent. Please check your inbox.");

        form.reset();
      } else msg = response.data.error || "An error occurred. Please try again.";

      setMessage(msg);
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container size={460} my={30}>
      <Title className={classes.title} ta="center">
        {isResetMode ? "Reset Your Password" : "Forgot your password?"}
      </Title>
      <Text c="dimmed" fz="sm" ta="center">
        {isResetMode ? "Enter your new password below" : "Enter your email to get a reset link"}
      </Text>
      <br />
      <Divider />

      <Paper p={30} radius="md">
        Text code in SUCCESS AND ERROR
        <form onSubmit={form.onSubmit(handleSubmit)}>
          {isResetMode ? (
            <>
              <PasswordInput
                label="New Password"
                placeholder="Enter your new password"
                required
                {...form.getInputProps("newPassword")}
                mb="md"
              />
              <PasswordInput
                label="Confirm New Password"
                placeholder="Confirm your new password"
                required
                {...form.getInputProps("confirmPassword")}
              />
            </>
          ) : (
            <TextInput
              label="Your email"
              placeholder="me@example.com"
              required
              {...form.getInputProps("email")}
            />
          )}
          {message && (
            <Text
              c={message.toLowerCase().includes("error") ? "red" : "green"}
              mt="sm"
              size="xs"
              fz="sm"
            >
              {message}
            </Text>
          )}
          <Group mt="lg">
            {!isResetMode && (
              <Anchor size="sm" href={ROUTES.LOGIN.path}>
                <Center inline>
                  <IconArrowLeft style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
                  <Box ml={5}>Back to the login page</Box>
                </Center>
              </Anchor>
            )}
            <Button
              type="submit"
              variant="light"
              flex="1 1 auto"
              className={classes.control}
              loading={isLoading}
            >
              {isResetMode ? "Reset Password" : "Verify Email"}
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
}
