"use client";

import { API } from "@/core";
import type { Artist } from "@/types";
import {
  ActionIcon,
  Button,
  Card,
  Container,
  Grid,
  Group,
  Image,
  Loader,
  Pagination,
  Text,
  TextInput,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function ArtistsListingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get("page") ?? "1";
  const search = searchParams.get("searchTerm") ?? "";

  const [artists, setArtists] = useState<Artist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(search);
  const [currentPage, setCurrentPage] = useState(parseInt(page, 10));
  const [totalPages, setTotalPages] = useState(1);

  const itemsPerPage = 9;

  const fetchArtists = useCallback(async (pageNo: number, _searchTerm: string) => {
    setIsLoading(true);
    try {
      const response = await API.get(
        `/api/artists/filter?page=${pageNo}&limit=${itemsPerPage}&searchTerm=${_searchTerm}`
      );
      if (response.data.error) throw new Error("Failed to fetch artists");
      if (response.data?.results?.length) setArtists(response.data.results);
      setTotalPages(Math.ceil((response.data?.total ?? 1) / itemsPerPage));
    } catch (error) {
      console.error("Error fetching artists:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchArtists(currentPage, searchTerm);
  }, [currentPage, searchTerm, fetchArtists]);

  const handleSearch = useCallback(() => {
    const params = new URLSearchParams(searchParams);
    params.set("searchTerm", searchTerm);
    params.set("page", "1");
    router.push(`/artists?${params.toString()}`);
    setCurrentPage(1);
  }, [router, searchParams, searchTerm]);

  const handlePageChange = (selectedPage: number) => {
    setCurrentPage(selectedPage);
    const params = new URLSearchParams(searchParams);
    params.set("page", selectedPage.toString());
    router.push(`/artists?${params.toString()}`);
  };

  if (isLoading) return <Loader size="xl" style={{ display: "block", margin: "10px auto" }} />;

  if (artists?.length === 0)
    return (
      <Text fz="lg" c="dimmed" ta="center">
        No artists found
      </Text>
    );

  return (
    <Container mb="md">
      <Group justify="space-between" mb="xl">
        <Text
          fz="40"
          my={20}
          fw={900}
          variant="gradient"
          gradient={{ from: "blue", to: "cyan", deg: 90 }}
        >
          Artists
        </Text>
        <TextInput
          placeholder="Search artists"
          styles={{ input: { width: "300px" } }}
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.currentTarget.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") handleSearch();
          }}
          rightSection={
            <ActionIcon onClick={handleSearch} variant="subtle">
              <IconSearch size={16} stroke={2} />
            </ActionIcon>
          }
        />
      </Group>
      <>
        <Grid>
          {artists.map((artist) => (
            <Grid.Col key={artist.id} span={{ xs: 12, sm: 6, md: 4 }}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Card.Section>
                  <Image
                    height={160}
                    alt={artist.name}
                    fallbackSrc="https://picsum.photos/200/300"
                  />
                </Card.Section>
                <Group justify="space-around" mt="md" mb="xs">
                  <Text fw={500}>{artist.name}</Text>
                </Group>
                <Text size="sm" c="dimmed" w={250} truncate="end">
                  {artist.bio}
                </Text>
                <Button
                  component={Link}
                  href={`/artists/${artist.id}`}
                  variant="light"
                  color="blue"
                  fullWidth
                  mt="md"
                  radius="md"
                >
                  View Profile
                </Button>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
        <Group justify="center" mt="xl">
          <Pagination
            size="sm"
            withEdges
            total={totalPages}
            value={currentPage}
            onChange={handlePageChange}
          />
        </Group>
      </>
    </Container>
  );
}
