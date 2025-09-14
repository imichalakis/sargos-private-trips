export interface Boat {
  id: string;
  name: string;
  slug: string;
  description: string;
  capacity: number;
  pricePerDay: number;
  features: string[];
  image: string;
  gallery?: string[];
  location?: string;
  isActive: boolean;
}
