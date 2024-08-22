import { useState } from "react";
import { useRouter } from "next/router";
import {
  Container,
  Grid,
  Paper,
  TextInput,
  PasswordInput,
  Button,
  Select,
  Group,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import UserProfileEdit from "@/app/(public)/profile/[uid]/page";

function AccountSettings() {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [accountType, setAccountType] = useState<string>("USER");

  const handleSaveChanges = async () => {
    try {
      // Call API to update user data
      await axios.put("/api/user/update", { username, email, password, accountType });
      showNotification({
        title: "Success",
        message: "Account updated successfully",
        color: "green",
      });
    } catch (error) {
      showNotification({ title: "Error", message: "Failed to update account", color: "red" });
    }
  };

  const handleDeleteAccount = async () => {
    try {
      // Call API to delete account
      await axios.delete("/api/user/delete");
      showNotification({
        title: "Account Deleted",
        message: "Your account has been deleted",
        color: "green",
      });
      router.push("/"); // Redirect to homepage after account deletion
    } catch (error) {
      showNotification({ title: "Error", message: "Failed to delete account", color: "red" });
    }
  };

  return (
    <Container size="sm">
      <Paper p="md" shadow="xs">
        <Grid>
          <Grid.Col span={12}>
            <TextInput
              label="Username"
              value={username}
              onChange={(event) => setUsername(event.currentTarget.value)}
              placeholder="Enter your username"
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <TextInput
              label="Email"
              value={email}
              onChange={(event) => setEmail(event.currentTarget.value)}
              placeholder="Enter your email"
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <PasswordInput
              label="Password"
              value={password}
              onChange={(event) => setPassword(event.currentTarget.value)}
              placeholder="Enter a new password"
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <Select
              label="Account Type"
              value={accountType}
              onChange={(value) => setAccountType(value as string)}
              data={[
                { value: "USER", label: "Regular User" },
                { value: "ARTIST", label: "Artist" },
              ]}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <UserProfileEdit />
          </Grid.Col>
          <Grid.Col span={12}>
            <Group gap="apart">
              <Button onClick={handleSaveChanges}>Save Changes</Button>
              <Button color="red" onClick={handleDeleteAccount}>
                Delete Account
              </Button>
            </Group>
          </Grid.Col>
        </Grid>
      </Paper>
    </Container>
  );
}

export default AccountSettings;
