import type { Artwork } from "@/types";
import { SCHEMA_NAMES } from "@/utils/constants";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../create-slice";
import { dispatchActionMethods } from "../hooks";

interface ArtworksSliceState {
  artworks: Artwork[];
  selectedArtwork: Artwork | null;
}

const initialState: ArtworksSliceState = {
  artworks: [],
  selectedArtwork: null,
};

export const artworksSlice = createAppSlice({
  name: SCHEMA_NAMES.ARTWORK.toLowerCase(),
  initialState,
  reducers: (create: any) => ({
    // Add a new artwork
    addArtwork: create?.reducer((state: ArtworksSliceState, action: PayloadAction<Artwork>) => {
      state.artworks.push(action.payload);
    }),

    // Update an existing artwork
    updateArtwork: create?.reducer((state: ArtworksSliceState, action: PayloadAction<Artwork>) => {
      const index = state.artworks.findIndex(artwork => artwork.id === action.payload.id);
      if (index !== -1) {
        state.artworks[index] = action.payload;
      }
    }),

    // Delete an artwork
    deleteArtwork: create?.reducer((state: ArtworksSliceState, action: PayloadAction<string>) => {
      state.artworks = state.artworks.filter(artwork => artwork.id !== action.payload);
    }),

    // Select an artwork
    selectArtwork: create?.reducer((state: ArtworksSliceState, action: PayloadAction<string>) => {
      state.selectedArtwork = state.artworks.find(artwork => artwork.id === action.payload) || null;
    }),

    // Clear selected artwork
    clearSelectedArtwork: create?.reducer((state: ArtworksSliceState) => {
      state.selectedArtwork = null;
    }),

    // Load artworks
    loadArtworks: create?.reducer((state: ArtworksSliceState, action: PayloadAction<Artwork[]>) => {
      state.artworks = action.payload;
    })
  }),
  selectors: {
    selectAllArtworks: (state: ArtworksSliceState) => state.artworks,
    selectArtworkById: (state: ArtworksSliceState, artworkId: string) =>
      state.artworks.find(artwork => artwork.id === artworkId),
    selectSelectedArtwork: (state: ArtworksSliceState) => state.selectedArtwork,
  },
});

export const useArtworks = () => dispatchActionMethods<typeof artworksSlice.actions>(artworksSlice);
