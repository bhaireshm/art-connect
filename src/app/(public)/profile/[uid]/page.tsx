"use client";

import classes from "@/assets/styles/profile.module.css";
import { API } from "@/core";
import { Button, Container, Group, Loader, Paper, Stack, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserProfileEdit() {
  const { uid } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [userFormData, setUserFormData] = useState(null);

  const form = useForm({
    initialValues: {
      email: "",
      // password: "",
      socialAccounts: {
        google: "",
        facebook: "",
      },
      profile: {
        firstName: "",
        lastName: "",
        address: {
          street: "",
          city: "",
          state: "",
          zip: "",
          country: "",
        },
      },
      // TODO: add user-type
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      // password: (value) => (value.length >= 6 ? null : "Password must be at least 6 characters"),
    },
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/users/${uid}`);
        if (!response.ok) throw new Error("Failed to fetch artist data");
        const userData = await response.json();
        setUserFormData(userData.data);
        form.setValues(userData.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid]);

  const handleSubmit = async (values: any) => {
    setIsLoading(true);
    try {
      const response = await API(`/api/users/${uid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        data: values,
      });
      if (response.status > 299) throw new Error("Failed to update user profile");
      notifications.show({
        title: "Profile Updated",
        message: response.statusText,
        autoClose: 2000,
      });
    } catch (error) {
      console.error("Error updating user profile:", error);
      notifications.show({
        color: "red",
        autoClose: 5000,
        message: "Profile update error",
        // message: error ?? "An error occurred while updating your profile.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!userFormData) return <Loader size="xl" style={{ display: "block", margin: "40px auto" }} />;

  return (
    <Container size="xs">
      <Paper p="md">
        <Text
          fz="40"
          my={20}
          fw={900}
          variant="gradient"
          gradient={{ from: "blue", to: "cyan", deg: 90 }}
        >
          Profile
        </Text>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack gap="md">
            <TextInput
              required
              label="Email"
              classNames={classes}
              placeholder="your@email.com"
              {...form.getInputProps("email")}
            />
            {/* <TextInput
              label="Password"
              type="password"
              classNames={classes}
              placeholder="Enter new password (leave blank to keep current)"
              {...form.getInputProps("password")}
            /> */}
            <Group grow>
              <TextInput
                required
                label="First Name"
                classNames={classes}
                placeholder="Your first name"
                {...form.getInputProps("profile.firstName")}
              />
              <TextInput
                label="Last Name"
                classNames={classes}
                placeholder="Your last name"
                {...form.getInputProps("profile.lastName")}
              />
            </Group>
            <TextInput
              label="Street"
              classNames={classes}
              placeholder="Street address"
              {...form.getInputProps("profile.address.street")}
            />
            <Group grow>
              <TextInput
                label="City"
                placeholder="City"
                classNames={classes}
                {...form.getInputProps("profile.address.city")}
              />
              <TextInput
                label="State"
                placeholder="State"
                classNames={classes}
                {...form.getInputProps("profile.address.state")}
              />
            </Group>
            <Group grow>
              <TextInput
                label="ZIP"
                classNames={classes}
                placeholder="ZIP code"
                {...form.getInputProps("profile.address.zip")}
              />
              <TextInput
                label="Country"
                classNames={classes}
                placeholder="Country"
                {...form.getInputProps("profile.address.country")}
              />
            </Group>
            <TextInput
              label="Google Account"
              placeholder="Google account email"
              {...form.getInputProps("socialAccounts.google")}
            />
            <TextInput
              label="Facebook Account"
              placeholder="Facebook account email"
              {...form.getInputProps("socialAccounts.facebook")}
            />
            <Button type="submit" loading={isLoading}>
              Update Profile
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}
