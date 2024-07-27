import { API } from "@/core";
import { useUser } from "@/redux";
import type { LoginProps } from "@/types";
import { ROUTES } from "@/utils/constants";
import { isEmpty } from "@bhairesh/ez.js";
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
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { upperFirst, useToggle } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login(props: Readonly<LoginProps>) {
  const [type, toggle] = useToggle(["login", "register"]);
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useUser();
  const router = useRouter();

  const form = useForm({
    initialValues: {
      email: "",
      name: "",
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
      const url = `/api/${type}`;
      const response = await API.post(url, values);
      const { token, user } = response.data;

      if (isEmpty(token) || isEmpty(user)) throw new Error("Invalid response from server");

      setUser({ token, user });
      notifications.show({
        title: "Success",
        message: `${upperFirst(type)} successful`,
        color: "green",
      });
      props.onSuccess?.(user);
      router.push(ROUTES.HOME.path);
    } catch (err: any) {
      notifications.show({
        title: "Error",
        message: err.response?.data?.message || "An error occurred",
        color: "red",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Paper radius="md" p="xl">
      <Text size="lg" fw={500} ta="center">
        Welcome to Art Connect, please {type}
      </Text>
      <br />
      <Divider />
      <br />

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          {type === "register" && (
            <TextInput
              label="Name"
              placeholder="Your name"
              value={form.values.name}
              onChange={(event) => form.setFieldValue("name", event.currentTarget.value)}
              radius="md"
            />
          )}

          <TextInput
            required
            label="Email"
            placeholder="john@mailinator.com"
            value={form.values.email}
            onChange={(event) => form.setFieldValue("email", event.currentTarget.value)}
            error={form.errors.email && "Invalid email"}
            radius="md"
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) => form.setFieldValue("password", event.currentTarget.value)}
            error={form.errors.password && "Password should include at least 6 characters"}
            radius="md"
          />

          {type === "register" && (
            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) => form.setFieldValue("terms", event.currentTarget.checked)}
            />
          )}
        </Stack>

        <Group justify="space-between" mt="xl">
          <Anchor component="button" type="button" c="dimmed" onClick={() => toggle()} size="xs">
            {type === "register"
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </Anchor>
          <Button type="submit" radius="xl" loading={isLoading}>
            {upperFirst(type)}
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
