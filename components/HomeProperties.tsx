import { PropertyCard } from "./PropertyCard";
import Link from "next/link";
import connectDB from "@/config/database";
import Property, { PropertiesType } from "@/models/Property";

export const HomeProperties = async () => {
  await connectDB();

  const recentProperties = (await Property.find({})
    .sort({ createdAt: -1 })
    .limit(3)
    .lean()) as Array<PropertiesType>;

  return (
    <>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto py-6 px-4">
          <h2 className="text-3xl font-bold text-indigo-500 text-center mb-3">
            Recent Properties
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentProperties.length === 0 ? (
              <p className="text-2xl text-rose-400">No properties found</p>
            ) : (
              recentProperties.map((property) => (
                <PropertyCard
                  key={property._id?.toString()}
                  property={property}
                />
              ))
            )}
          </div>
        </div>
      </section>

      <section className="m-auto max-w-lg my-3 px-6">
        <Link
          href="/properties"
          className="block bg-pink-400 hover:bg-gray-500 text-white text-center px-4 py-2 rounded-xl tracking-wide font-mono"
        >
          View All Properties
        </Link>
      </section>
    </>
  );
};
