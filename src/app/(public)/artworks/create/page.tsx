"use client";

import { useAuth } from "@/context";
import {
  ActionIcon,
  Button,
  Container,
  Group,
  NumberInput,
  Stack,
  Text,
  TextInput,
  Textarea,
  Tooltip,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { useState } from "react";

export default function CreateArtworkForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>([""]);
  const { user } = useAuth();

  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      height: 0,
      width: 0,
      depth: 0,
      medium: "",
      price: 0,
      // artist: "", // This should be populated with the current user's ID if they're an artist
    },
    validate: {
      title: (value) => (value ? null : "Title is required"),
      price: (value) => (value > 0 ? null : "Price must be greater than 0"),
      // artist: (value) => (value ? null : "Artist is required"), //TODO: set current user
    },
  });

  const handleImageUrlChange = (index: number, value: string) => {
    const newImageUrls = [...imageUrls];
    newImageUrls[index] = value;
    setImageUrls(newImageUrls);
  };

  const addImageUrlField = () => {
    setImageUrls([...imageUrls, ""]);
  };

  const removeImageUrlField = (index: number) => {
    const newImageUrls = imageUrls.filter((_, i) => i !== index);
    setImageUrls(newImageUrls);
  };

  const handleSubmit = async (values: any) => {
    setIsLoading(true);
    try {
      const payload = {
        ...values,
        artist: user?.id,
        images: imageUrls.filter((url) => url), // Filter out empty URLs
      };

      const response = await fetch("/api/artworks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to create artwork");

      notifications.show({
        title: "Artwork created",
        message: response.statusText,
        autoClose: 2000,
      });
      form.reset();
      setImageUrls([""]);
    } catch (error) {
      console.error("Error creating artwork:", error);
      notifications.show({
        color: "red",
        autoClose: 5000,
        message: "Unable to create artwork",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container my="lg" size="sm">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="md">
          <TextInput
            required
            label="Title"
            placeholder="Enter artwork title"
            {...form.getInputProps("title")}
          />
          <Textarea
            label="Description"
            placeholder="Enter artwork description"
            {...form.getInputProps("description")}
          />
          <Group grow>
            <NumberInput
              label="Height"
              placeholder="Height"
              min={0}
              {...form.getInputProps("height")}
            />
            <NumberInput
              label="Width"
              placeholder="Width"
              min={0}
              {...form.getInputProps("width")}
            />
            <NumberInput
              label="Depth"
              placeholder="Depth"
              step={0.5}
              min={0}
              {...form.getInputProps("depth")}
            />
          </Group>
          <TextInput
            label="Medium"
            placeholder="Enter artwork medium"
            {...form.getInputProps("medium")}
          />
          <NumberInput
            required
            label="Price"
            placeholder="Enter artwork price"
            min={0}
            {...form.getInputProps("price")}
          />
          <Group align="center" justify="space-between">
            <Text>Add Image URLs</Text>
            <ActionIcon onClick={addImageUrlField} variant="subtle" size={24}>
              <Tooltip label="Add another URL" position="left">
                <IconPlus />
              </Tooltip>
            </ActionIcon>
          </Group>
          {imageUrls.map((url, index) => (
            <Group key={index} grow>
              <TextInput
                required
                width="80%"
                value={url}
                rightSection={
                  <Tooltip label="Remove URL" position="left">
                    <ActionIcon
                      onClick={() => removeImageUrlField(index)}
                      variant="subtle"
                      color="red"
                    >
                      <IconTrash />
                    </ActionIcon>
                  </Tooltip>
                }
                placeholder="Enter artwork image URL"
                onChange={(event) => handleImageUrlChange(index, event.currentTarget.value)}
              />
            </Group>
          ))}

          <Button type="submit" loading={isLoading}>
            Create Artwork
          </Button>
        </Stack>
      </form>
    </Container>
  );
}
