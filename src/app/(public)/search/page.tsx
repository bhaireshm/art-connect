"use client";

import { ArtworkGrid } from "@/components/artwork-grid/artwork-grid";
import { filterArtworks } from "@/redux";
import { isEmpty } from "@bhairesh/ez.js";
import {
  ActionIcon,
  Button,
  Container,
  Group,
  Loader,
  Pagination,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
import { IconSearch, IconX } from "@tabler/icons-react";
import React, { useCallback, useEffect, useState } from "react";

export default function SearchPage(): React.JSX.Element {
  const [searchTerm, setSearchTerm] = useState("");
  const [medium, setMedium] = useState<string | null>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [artworks, setArtworks] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 12;

  useEffect(() => {
    if (!isEmpty(medium)) loadArtworks({ medium });
    else loadArtworks();
  }, [currentPage, medium]);

  const loadArtworks = async (filter = {}) => {
    setIsLoading(true);
    try {
      const result = await filterArtworks(currentPage, itemsPerPage, filter);
      setArtworks(result?.data?.results);
      // eslint-disable-next-line no-unsafe-optional-chaining
      setTotalPages(Math.ceil(result?.data?.total / itemsPerPage));
    } catch (error) {
      console.error("Failed to fetch artworks:", error);
    }
    setIsLoading(false);
  };

  const handleSearch = useCallback((value: string) => {
    if (value.length > 2) {
      setSearchTerm(value);
      setCurrentPage(1);
      loadArtworks({ description: value });
    }
  }, []);

  const clearFilters = () => {
    setMedium("");
    setSearchTerm("");
    setCurrentPage(1);
    loadArtworks();
  };

  return (
    <Container fluid py={10}>
      <Container>
        <Text
          fz="40"
          my={20}
          fw={900}
          variant="gradient"
          gradient={{ from: "blue", to: "cyan", deg: 90 }}
        >
          Search Artworks
        </Text>
        <Group mb="md">
          <TextInput
            placeholder="Search artworks"
            value={searchTerm}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === "") handleSearch(searchTerm);
            }}
            onChange={(event) => setSearchTerm(event.target.value)}
            style={{ flexGrow: 1 }}
            leftSection={<IconSearch size={14} />}
            rightSection={
              <ActionIcon variant="subtle" onClick={clearFilters}>
                <IconX size={14} />
              </ActionIcon>
            }
          />
          <Select
            value={medium}
            placeholder="Select medium"
            onChange={setMedium}
            data={[
              { value: "", label: "All" },
              { value: "Oil", label: "Oil" },
              { value: "Acrylic", label: "Acrylic" },
              { value: "Watercolor", label: "Watercolor" },
              { value: "Sculpture", label: "Sculpture" },
            ]}
          />
          <Button onClick={() => handleSearch(searchTerm)}>Search</Button>
        </Group>
        {isLoading ? (
          <Loader size="lg" style={{ display: "block", margin: "40px auto" }} />
        ) : (
          <>
            <ArtworkGrid artworks={artworks} />
            <Group justify="center" mt="xl">
              <Pagination total={totalPages} value={currentPage} onChange={setCurrentPage} />
            </Group>
          </>
        )}
      </Container>
    </Container>
  );
}
