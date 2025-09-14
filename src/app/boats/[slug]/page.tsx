import BoatTripPanel from "@/components/BoatTripPanel";
import { notFound } from "next/navigation";
import { getBoatBySlug } from "@/lib/boatsRepo";

type BoatPageProps = {
  params: {
    slug: string;
  };
};

export default async function BoatDetailPage({
  params,
}: BoatPageProps) {
  const boat = await getBoatBySlug(params.slug);
  if (!boat || !boat.isActive) return notFound();
  return (
    <BoatTripPanel
      boat={{
        slug: boat.slug,
        name: boat.name,
        description: boat.description,
        price: `${boat.pricePerDay}`,
        image: boat.image,
        capacity: boat.capacity,
        features: boat.features,
      }}
    />
  );
}
