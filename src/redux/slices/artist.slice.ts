import type { Artist } from "@/types";
import { SCHEMA_NAMES } from "@/utils/constants";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../create-slice";
import { useSliceMethods } from "../hooks";

interface ArtistsSliceState {
  artists: Artist[];
  selectedArtist: Artist | null;
}

const initialState: ArtistsSliceState = {
  artists: [],
  selectedArtist: null,
};

export const artistsSlice = createAppSlice({
  name: SCHEMA_NAMES.ARTIST.toLowerCase(),
  initialState,
  reducers: (create: any) => ({
    // Add a new artist
    addArtist: create?.reducer((state: ArtistsSliceState, action: PayloadAction<Artist>) => {
      state.artists.push(action.payload);
    }),

    // Update an existing artist
    updateArtist: create?.reducer((state: ArtistsSliceState, action: PayloadAction<Artist>) => {
      const index = state.artists.findIndex(artist => artist.id === action.payload.id);
      if (index !== -1) state.artists[index] = action.payload;
    }),

    // Delete an artist
    deleteArtist: create?.reducer((state: ArtistsSliceState, action: PayloadAction<string>) => {
      state.artists = state.artists.filter(artist => artist.id !== action.payload);
    }),

    // Select an artist
    selectArtist: create?.reducer((state: ArtistsSliceState, action: PayloadAction<string>) => {
      state.selectedArtist = state.artists.find(artist => artist.id === action.payload) || null;
    }),

    // Clear selected artist
    clearSelectedArtist: create?.reducer((state: ArtistsSliceState) => {
      state.selectedArtist = null;
    }),

    // Load artists
    loadArtists: create?.reducer((state: ArtistsSliceState, action: PayloadAction<Artist[]>) => {
      state.artists = action.payload;
    })
  }),
  selectors: {
    selectAllArtists: (state: ArtistsSliceState) => state.artists,
    selectArtistById: (state: ArtistsSliceState, artistId: string) =>
      state.artists.find(artist => artist.id === artistId),
    selectSelectedArtist: (state: ArtistsSliceState) => state.selectedArtist,
  },
});

export const useArtists = () => useSliceMethods<typeof artistsSlice.actions & typeof artistsSlice.selectors>(artistsSlice);
