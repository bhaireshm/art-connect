"use client";

import classes from "@/assets/styles/auth.module.css";
import { useAuth } from "@/context";
import { API } from "@/core";
import type { LoginProps, User } from "@/types";
import { COOKIE, PROJECT_NAME, ROUTES, SCHEMA_NAMES } from "@/utils/constants";
import {
  Anchor,
  Button,
  Checkbox,
  Divider,
  Group,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { upperFirst, useToggle } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LOGIN = "login";
const REGISTER = "register";

export default function Login(props: Readonly<LoginProps>) {
  const [type, toggle] = useToggle([LOGIN, REGISTER]);
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useAuth();
  const router = useRouter();

  const form = useForm({
    initialValues: {
      email: "",
      username: "",
      password: "",
      terms: false,
    },
    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) => (val.length < 6 ? "Password should include at least 6 characters" : null),
    },
  });

  const handleSubmit = async (values: any) => {
    setIsLoading(true);

    try {
      const url = `/api/auth/${type}`;
      const response = (await API.post(url, values)).data;

      if (response.error) throw new Error(response.error);

      let userData = {};
      if (type === LOGIN) {
        if (!response.token || !response.user) throw new Error("Unable to login");
        userData = { user: response.user, token: response.token };
      } else if (type === REGISTER) {
        if (!response) throw new Error(response.message || "Unable to register");
        userData = { user: response.user, token: response.token };
      }

      // Set the token in the cookie
      setCookie(COOKIE.name, response.token, COOKIE.serializeOptions);
      response.user && localStorage?.setItem(SCHEMA_NAMES.USER, JSON.stringify(userData));

      setUser(response.user as User);
      props.onSuccess?.(response.user);

      notifications.show({
        title: "Success",
        color: "green",
        message: `${upperFirst(type)} successful`,
      });

      router.push(ROUTES.HOME.path);
    } catch (err: any) {
      notifications.show({
        title: "Error",
        color: "red",
        message: err.message || "An error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Paper radius="md" p="xl">
      <Title className={classes.title} ta="center">
        Welcome to {PROJECT_NAME},
      </Title>
      <Text c="dimmed" fz="sm" ta="center">
        enter details to {type}
      </Text>
      <br />
      <Divider />
      <br />

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          {type === "register" && (
            <TextInput
              required
              label="Username"
              placeholder="Your username"
              value={form.values.username}
              onChange={(event) => form.setFieldValue("username", event.currentTarget.value)}
              error={form.errors.username && "Invalid username"}
            />
          )}
          <TextInput
            required
            label="Email"
            placeholder="john@mailinator.com"
            value={form.values.email}
            onChange={(event) => form.setFieldValue("email", event.currentTarget.value)}
            error={form.errors.email && "Invalid email"}
          />

          <PasswordInput
            required
            rightSection
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) => form.setFieldValue("password", event.currentTarget.value)}
            error={form.errors.password && "Password should include at least 6 characters"}
          />

          <Group justify="space-between" className={classes.controls}>
            {type === "register" && (
              <Checkbox
                required
                label="I accept terms and conditions"
                checked={form.values.terms}
                error={form.errors.terms && "Please accept terms and conditions"}
                onChange={(event) => form.setFieldValue("terms", event.currentTarget.checked)}
              />
            )}
            {type === LOGIN && (
              <Anchor size="xs" ta="center" href={ROUTES.FORGOT_PASSWORD.path}>
                Forgot password?
              </Anchor>
            )}
            <Button type="submit" variant="light" loading={isLoading}>
              {upperFirst(type)}
            </Button>
          </Group>

          <Anchor type="button" ta="center" onClick={() => toggle()} size="xs">
            {type === REGISTER
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </Anchor>
        </Stack>
      </form>
    </Paper>
  );
}
