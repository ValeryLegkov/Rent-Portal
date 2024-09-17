import PropertyCard from "@/components/PropertyCard";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { InferSchemaType } from "mongoose";

const PropertiesPage = async () => {
  await connectDB();
  const properties = (await Property.find({}).lean().exec()) as Array<
    InferSchemaType<typeof Property.schema>
  >;

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto py-6 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {properties.length === 0 ? (
            <p className="text-2xl text-rose-400">No properties found</p>
          ) : (
            properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default PropertiesPage;
