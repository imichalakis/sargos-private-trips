import { boats } from "@/data/boats";
import Link from "next/link";

export default function BoatsPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Our Yachts</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {boats.map((boat) => (
          <div key={boat.slug} className="border rounded-md p-4 shadow-sm bg-white">
            <img
              src={boat.image}
              alt={boat.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold">{boat.name}</h3>
            <p className="text-sm text-gray-600">{boat.description}</p>
            <p className="mt-2 font-medium">Capacity: {boat.capacity} people</p>
            <p className="text-blue-600 font-bold">{boat.price}</p>
            <Link
              href={`/boats/${boat.slug}`}
              className="inline-block mt-3 text-sm text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
