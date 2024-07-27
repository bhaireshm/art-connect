import { API } from "@/core";
import { useUser } from "@/redux";
import type { LoginProps } from "@/types";
import { PROJECT_NAME, ROUTES } from "@/utils/constants";
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

const LOGIN = "login";
const REGISTER = "register";

export default function Login(props: Readonly<LoginProps>) {
  const [type, toggle] = useToggle([LOGIN, REGISTER]);
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useUser();
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
      const url = `/api/${type === REGISTER ? "users" : LOGIN}`;
      const response = await API.post(url, values);
      const data = response.data;
      if (data?.error) throw new Error(data.error);

      let userData = {};
      if (type === "LOGIN") {
        if (!data?.token || !data?.user) throw new Error("Unable to login");
        userData = { user: data.user, token: data.token };
      } else if (type === "REGISTER") {
        if (!data) throw new Error(data.message || "Unable to register");
        userData = { user: data.user, token: data.token };
      }

      setUser(userData);
      props.onSuccess?.(data.user);

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
      <Text size="lg" fw={500} ta="center">
        Welcome to {PROJECT_NAME},<br /> please {type}
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
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) => form.setFieldValue("password", event.currentTarget.value)}
            error={form.errors.password && "Password should include at least 6 characters"}
          />

          {type === "register" && (
            <Checkbox
              required
              label="I accept terms and conditions"
              checked={form.values.terms}
              error={form.errors.terms && "Please accept terms and conditions"}
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
          <Button type="submit" variant="light" loading={isLoading}>
            {upperFirst(type)}
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
