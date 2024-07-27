"use client";

import { ArtworkGrid } from "@/components/artwork";
import { filterArtworks } from "@/redux";
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
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

export default function ArtworksListingPage(): React.JSX.Element {
  const router = useRouter();
  const searchParams = useSearchParams();

  const artistId = searchParams.get("artist") || "";
  const page = searchParams.get("page") || "1";
  const search = searchParams.get("search") || "";

  const [searchTerm, setSearchTerm] = useState(search);
  const [medium, setMedium] = useState<string | null>("");
  const [currentPage, setCurrentPage] = useState(parseInt(page, 10));
  const [artworks, setArtworks] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 12;

  const loadArtworks = useCallback(
    async (filter = {}) => {
      setIsLoading(true);
      try {
        const result = await filterArtworks(currentPage, itemsPerPage, filter);
        setArtworks(result?.data?.results);
        setTotalPages(Math.ceil((result?.data?.total ?? 1) / itemsPerPage));
      } catch (error) {
        console.error("Failed to fetch artworks:", error);
      }
      setIsLoading(false);
    },
    [currentPage]
  );

  const handleSearch = useCallback(() => {
    const params = new URLSearchParams(searchParams);
    params.set("search", searchTerm);
    params.set("page", "1");
    router.push(`/artworks?${params.toString()}`);
    setCurrentPage(1);
  }, [router, searchParams, searchTerm]);

  const clearFilters = () => {
    setMedium("");
    setSearchTerm("");
    setCurrentPage(1);
    router.push("/artworks");
  };

  const handlePageChange = (selectedPage: number) => {
    setCurrentPage(selectedPage);
    const params = new URLSearchParams(searchParams);
    params.set("page", selectedPage.toString());
    router.push(`/artworks?${params.toString()}`);
  };

  useEffect(() => {
    const filter = {
      ...(medium && { medium }),
      ...(artistId && { artistId }),
      ...(search && { description: search }),
    };
    loadArtworks(filter);
  }, [currentPage, medium, artistId, search, loadArtworks]);

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
              if (event.key === "Enter") handleSearch();
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
          <Button onClick={handleSearch}>Search</Button>
        </Group>
        {isLoading ? (
          <Loader size="lg" style={{ display: "block", margin: "40px auto" }} />
        ) : (
          <>
            <ArtworkGrid artworks={artworks} />
            <Group justify="center" mt="xl">
              <Pagination total={totalPages} value={currentPage} onChange={handlePageChange} />
            </Group>
          </>
        )}
      </Container>
    </Container>
  );
}
