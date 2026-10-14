export type Spot = {
  name: string;
  description: string;
  image: string;
  category: string;
  coordinates: {
    lat: number;
    lng: number;
  };
};

export function getSpotSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function getSpotBySlug(slug: string) {
  return spots.find((spot) => getSpotSlug(spot.name) === slug);
}

export const spots: Spot[] = [
  {
    name: "Laiya Beach",
    description:
      "A popular stretch of white-sand shoreline in San Juan known for clear water, resort stays, and relaxed seaside weekends.",
    image: "/laiya.jpg",
    category: "Beach",
    coordinates: {
      lat: 13.6704,
      lng: 121.4039,
    },
  },
  {
    name: "Fantasy World",
    description:
      "A dramatic unfinished castle-themed attraction in Lemery that remains one of Batangas' most recognizable photo spots.",
    image: "/fantasy-world.jpg",
    category: "Theme Park",
    coordinates: {
      lat: 13.9408,
      lng: 120.9094,
    },
  },
  {
    name: "Monte Maria",
    description:
      "A major pilgrimage destination in Batangas City with sweeping views and a towering shrine dedicated to the Blessed Virgin Mary.",
    image: "/monte-maria.jpg",
    category: "Pilgrimage Site",
    coordinates: {
      lat: 13.7574,
      lng: 121.0967,
    },
  },
  {
    name: "Taal Heritage Town",
    description:
      "A preserved old town filled with ancestral houses, heritage churches, and some of the best examples of Spanish-era architecture in Batangas.",
    image: "/taal.webp",
    category: "Heritage Town",
    coordinates: {
      lat: 13.8807,
      lng: 120.9296,
    },
  },
  {
    name: "Kakang Emong",
    description:
      "A local dining stop often included in Batangas road trips for its rustic charm and regional food experience.",
    image: "/kakang-emong.webp",
    category: "Restaurant",
    coordinates: {
      lat: 13.8268,
      lng: 120.9949,
    },
  },
];
