"use client";

import { ArtworkGrid } from "@/components/artwork-grid/artwork-grid";
import { Button, Container, Group, Pagination, Select, Text, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import React, { useState } from "react";

// Mock data - in a real application, this would come from an API
const mockArtworks = Array(50)
  .fill(null)
  .map((_, index) => ({
    id: `${index + 1}`,
    title: `Artwork ${index + 1}`,
    description: `Description for Artwork ${index + 1}`,
    medium: ["Oil", "Acrylic", "Watercolor", "Sculpture"][Math.floor(Math.random() * 4)],
    images: [`https://dummyimage.com/${index + 1}/000/fff`],
    price: Math.floor(Math.random() * 5000) + 500,
    artist: `Artist ${Math.floor(index / 10) + 1}`,
  }));

export default function SearchPage(): React.JSX.Element {
  const [searchTerm, setSearchTerm] = useState("");
  const [medium, setMedium] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const filteredArtworks = mockArtworks.filter(
    (artwork) =>
      artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!medium || artwork.medium === medium)
  );

  const paginatedArtworks = filteredArtworks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredArtworks.length / itemsPerPage);

  return (
    <Container fluid py={6}>
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
            onChange={(event) => setSearchTerm(event.currentTarget.value)}
            style={{ flexGrow: 1 }}
            leftSection={<IconSearch size={14} />}
          />
          <Select
            placeholder="Select medium"
            value={medium}
            onChange={setMedium}
            data={[
              { value: "Oil", label: "Oil" },
              { value: "Acrylic", label: "Acrylic" },
              { value: "Watercolor", label: "Watercolor" },
              { value: "Sculpture", label: "Sculpture" },
            ]}
            style={{ width: 200 }}
          />
          <Button
            onClick={() => {
              setSearchTerm("");
              setMedium(null);
            }}
          >
            Clear Filters
          </Button>
        </Group>
        <ArtworkGrid artworks={paginatedArtworks} />
        <Group justify="center" mt="xl">
          <Pagination total={totalPages} value={currentPage} onChange={setCurrentPage} />
        </Group>
      </Container>
    </Container>
  );
}
