// src/data/boats.ts

export interface Boat {
    slug: string;
    name: string;
    description: string;
    price: string;
    image: string;
    capacity: number;
    features: string[];
  }
  
  export const boats: Boat[] = [
    {
      slug: "sargos-42",
      name: "Sargos 42",
      description: "Luxury yacht for day or multi-day cruises in the Aegean.",
      price: "€450/day",
      image: "/images/sargos-42.jpg", // Μπορεί να είναι προσωρινά dummy
      capacity: 8,
      features: ["Wi-Fi", "Sound System", "Snorkeling Gear"]
    },
    {
      slug: "sunseeker-phantom",
      name: "Sunseeker Phantom",
      description: "High-end yacht ideal for private island tours.",
      price: "€800/day",
      image: "/images/sunseeker.jpg",
      capacity: 10,
      features: ["Bar", "Flybridge", "Air Conditioning"]
    }
  ];
  