"use client";

import { Button, Dialog, Group, Text, Overlay } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { useState } from "react";

interface DeleteAccountConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

function DeleteAccountConfirmation({ isOpen, onClose, onConfirm }: DeleteAccountConfirmationProps) {
  const { height, width } = useViewportSize();
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      onConfirm();
    } catch (error) {
      console.error("Error deleting account:", error);
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  return (
    <>
      {isOpen && (
        <Overlay
          blur={5}
          center
          style={{ position: "fixed", zIndex: 200, transition: "ease-in-out" }}
        />
      )}
      <Dialog
        size="lg"
        radius="md"
        withCloseButton
        opened={isOpen}
        transitionProps={{ transition: "fade-up", duration: 1000 }}
        onClose={onClose}
        style={{ zIndex: 201 }}
        position={{ top: height / 2 - 250, left: width / 2 - 250 }}
      >
        <Text size="lg" fw={700} mb="md">
          Are you sure you want to delete your account?
        </Text>
        <Text size="sm" mb="md">
          This action cannot be undone. All of your data will be permanently deleted.
        </Text>
        <Group justify="right" mt="md">
          <Button variant="light" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button color="red" onClick={handleConfirm} loading={isLoading}>
            Delete Account
          </Button>
        </Group>
      </Dialog>
    </>
  );
}

export default DeleteAccountConfirmation;
