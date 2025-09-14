import { boats } from "@/data/boats";
import BoatTripPanel from "@/components/BoatTripPanel";
import { notFound } from "next/navigation";

type BoatPageProps = {
  params: {
    slug: string;
  };
};

export default function BoatDetailPage({ params }: BoatPageProps) {
  const boat = boats.find((b) => b.slug === params.slug);

  if (!boat) return notFound();

  return <BoatTripPanel boat={boat} />;
}
