"use server";

import { ResponseHandler } from "@/core";
import { DB } from "@/database";
import { Artist, Artwork, Cart, User } from "@/modules";
import { NextResponse, type NextRequest } from "next/server";

/** /api/ */
export async function GET() {
  const conn = await DB.connect();
  return NextResponse.json({
    message: `ArtConnect API runnning...${conn.name}`,
  });
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const result = { ...data };//await createSampleData(data);
  // const result = await Artwork.updateMany({},
  //   {
  //     images: ["https://picsum.photos/512"]
  //   }
  //   ,
  //   { maxTimeMS: 60000, allowDiskUse: true }
  // );

  return ResponseHandler.success({
    message: "Sample data created successfully!",
    ...result
  }, 201);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function createSampleData(artworkDataRaw: any) {
  // Helper function to generate random prices
  const randomPrice = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min) * 100;

  // Helper function to get a random element from an array
  // const randomElement = (array: string | any[]) => array[Math.floor(Math.random() * array.length)];

  // Load artwork data from JSON file
  // const artworkDataRaw = await fs.readFile(path.join(__dirname, "artworkData.json"), "utf-8");
  const { artworks: artworkData } = artworkDataRaw;

  // Create Artists
  const artists = await Artist.m.create([
    {
      name: "Emily Johnson",
      bio: "Contemporary abstract artist specializing in large-scale oil paintings and mixed media installations.",
      background: "MFA from Rhode Island School of Design, 2015. Residencies at the Tate Modern and MASS MoCA.",
      gallery: [],
      availableArtworks: []
    },
    {
      name: "Michael Chen",
      bio: "Sculptor and environmental artist working primarily with recycled materials and found objects.",
      background: "Self-taught artist with a background in environmental science. Former Fulbright Scholar.",
      gallery: [],
      availableArtworks: []
    }
  ]);

  // Create Users
  const users = await User.m.create([
    {
      username: "artlover",
      email: "artlover@mailinator.com",
      password: "artlover@123",
      profile: {
        firstName: "Sarah",
        lastName: "Thompson",
        address: {
          street: "123 Art Street",
          city: "New York",
          state: "NY",
          zip: "10001",
          country: "USA"
        }
      },
      orderHistory: [],
      wishlist: [],
      type: "Users"
    },
    {
      username: "creativesoul",
      email: "creativesoul@mailinator.com",
      password: "creativesoul@123",
      profile: {
        firstName: "Alex",
        lastName: "Rivera",
        address: {
          street: "456 Gallery Avenue",
          city: "Los Angeles",
          state: "CA",
          zip: "90001",
          country: "USA"
        }
      },
      orderHistory: [],
      wishlist: [],
      type: "Artists"
    },
    {
      username: "artcollector",
      email: "artcollector@mailinator.com",
      password: "artcollector@123",
      profile: {
        firstName: "Jordan",
        lastName: "Lee",
        address: {
          street: "789 Museum Road",
          city: "Chicago",
          state: "IL",
          zip: "60601",
          country: "USA"
        }
      },
      orderHistory: [],
      wishlist: [],
      type: "Users"
    }
  ]);

  // Create Artworks
  const artworks = await Promise.all(artworkData.map(async (data: any, index: number) => {
    const artwork = await Artwork.m.create({
      title: data.title,
      description: data.description,
      dimensions: {
        height: Math.floor(Math.random() * 200) + 50,
        width: Math.floor(Math.random() * 200) + 50,
        depth: Math.floor(Math.random() * 10) + 1
      },
      medium: data.medium,
      images: [`https://example.com/artwork${index + 1}_image1.jpg`, `https://example.com/artwork${index + 1}_image2.jpg`],
      price: randomPrice(1000, 10000),
      artist: artists[data.artistIndex]._id,
      relatedArtworks: []
    });

    // Update artist's gallery and available artworks
    await Artist.m.findByIdAndUpdate(artists[data.artistIndex]._id, {
      $push: {
        gallery: artwork._id,
        availableArtworks: artwork._id
      }
    });

    return artwork;
  }));

  // Assign some artworks to users' wishlists
  for (const user of users) {
    const wishlistItems = artworks.slice(0, 3).map(artwork => artwork._id);
    await User.m.findByIdAndUpdate(user._id, { $push: { wishlist: { $each: wishlistItems } } });
  }

  // Create Carts
  const carts = await Cart.m.create([
    {
      user: users[0]._id,
      items: [{
        artwork: artworks[0]._id,
        quantity: 1
      }],
      totalCost: artworks[0].price
    },
    {
      user: users[1]._id,
      items: [{
        artwork: artworks[1]._id,
        quantity: 1
      }],
      totalCost: artworks[1].price
    },
    {
      user: users[2]._id,
      items: [
        {
          artwork: artworks[2]._id,
          quantity: 1
        },
        {
          artwork: artworks[3]._id,
          quantity: 1
        }
      ],
      totalCost: artworks[2].price + artworks[3].price
    }
  ]);

  return { users, artists, artworks, carts };
}

