import { objectToQueryParams } from "@bhairesh/ez.js";

export const API = fetch;

const API_BASE_URL = "/api";

// Artworks
export const fetchArtworks = async (id = "") => {
  const response = await API(`${API_BASE_URL}/artworks/${id}`);
  const data = await response.json();
  // console.log("file: index.ts:10  fetchArtworks  data", data);
  return data;
};

export const filterArtworks = async (page: number, limit: number, filter = {}) => {
  const searchFilter = { page, limit, ...filter };
  const response = await API(`${API_BASE_URL}/artworks/filter?${objectToQueryParams(searchFilter)}`);
  const data = await response.json();
  return data;
};

export const fetchUserById = async (userId: string) => {
  const response = await API(`${API_BASE_URL}/users/${userId}`);
  const data = await response.json();
  // console.log("file: index.ts:17  fetchUserById  data", data);
  return data;
};


// Artist
export const fetchArtists = async () => {
  const artistsData = await fetch(`${API_BASE_URL}/artists`).then(res => res.json());
  // console.log("file: index.ts:36  fetchArtists  artistsData", artistsData);
  return artistsData;
};