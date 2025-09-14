import { boats } from "@/data/boats";
import { notFound } from "next/navigation";

type BoatPageProps = {
  params: {
    slug: string;
  };
};

export default function BoatDetailPage({ params }: BoatPageProps) {
  const boat = boats.find((b) => b.slug === params.slug);

  if (!boat) return notFound();

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
      <img
        src={boat.image}
        alt={boat.name}
        className="w-full h-64 object-cover rounded mb-4"
      />

      <h1 className="text-2xl font-bold mb-2">{boat.name}</h1>
      <p className="text-gray-700 mb-4">{boat.description}</p>

      <ul className="mb-4 text-sm text-gray-600">
        <li><strong>Capacity:</strong> {boat.capacity} people</li>
        <li><strong>Price:</strong> {boat.price}</li>
      </ul>

      <h2 className="font-semibold mb-2">Features</h2>
      <ul className="list-disc list-inside text-gray-600">
        {boat.features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
    </div>
  );
}
