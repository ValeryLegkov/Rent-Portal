import connectDB from "@/config/database";
import User from "@/models/User";
import { getSessionHelper } from "@/app/helper/getSessionHelper";
import { PropertyCard } from "@/components/PropertyCard";
import Property, { PropertiesType } from "@/models/Property";

const SavedPropertyPage = async () => {
  await connectDB();
  const userId = await getSessionHelper();

  const bookmarks = await User.findById(userId).populate("bookmarks");

  return (
    <section className="px-4 py-6">
      <div className="container lg:container mx-auto px-4 py-6">
        <h1 className="text-2xl mb-4">Saved Properties</h1>
        {bookmarks?.bookmarks?.length === 0 ? (
          <p>No Saved Properties</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bookmarks?.bookmarks?.map(async (propertyId) => (
              <PropertyCard
                key={propertyId.toString()}
                property={
                  (await Property.findById(propertyId)) as PropertiesType
                }
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SavedPropertyPage;
