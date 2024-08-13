import type { ReactNode } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyObj = Record<string, any>;

export interface Props {
  readonly children?: ReactNode;
}

export type ReadOnlyProps<T = Props> = Readonly<T & Props>;

export type Params<S extends string> = { params: Record<S, string> };

export type LoginProps = {
  onSuccess?: (user: User) => void;
  onError?: (err: any) => void;
};

export interface Address {
  street: string,
  city: string,
  state: string,
  zip: string,
  country: string,
}

export interface SocialAccounts {
  google?: string;
  facebook?: string;
}

export interface Profile {
  firstName?: string;
  lastName?: string;
  address?: Address;
}

export interface User {
  id: string;
  username: string;
  email: string;
  password?: string;
  socialAccounts?: {
    google?: string;
    facebook?: string;
  };
  profile?: {
    firstName?: string;
    lastName?: string;
    address?: Address;
  };
  orderHistory?: string[];
  wishlist?: string[];
  type: "Users" | "Artists";
  artistInfo?: string;
}

export interface Dimensions {
  height: number;
  width: number;
  depth: number;
}

export interface Artwork {
  title: string;
  description?: string;
  dimensions: Dimensions;
  medium?: string;
  images: string[];
  price: number;
  artist: Artist;
  relatedArtworks: Artwork[];
  id: string;
}

export interface Artist {
  id: string;
  name?: string;
  bio: string;
  background?: string;
  gallery: Artwork["id"];
  availableArtworks: Artwork["id"];
}

export interface CartContextType {
  cart: CartItemType[];
  addToCart: (artwork: Artwork) => void;
  removeFromCart: (artworkId: string) => void;
  updateQuantity: (artworkId: string, quantity: number) => void;
  clearCart: () => void;
  totalCost: number;
  isLoading: boolean;
}

export interface CartType {
  id: string;
  user: string;
  items: CartItemType[];
  totalCost: number;
}

export interface CartItemType {
  id: string;
  artwork: Artwork;
  quantity: number;
}

export interface CartItemComponentProps {
  item: CartItemType;
  onRemove: () => void;
  onUpdateQuantity: (newQuantity: number) => void;
}