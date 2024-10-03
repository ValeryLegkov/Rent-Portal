import React from "react";
import Link from "next/link";
import { PropertyCard } from "@/components/PropertyCard";
import { PropertySearchForm } from "@/components/PropertySearchForm";
import connectDB from "@/config/database";
import Property, { PropertiesType } from "@/models/Property";
import { convertToSerializedObject } from "@/utils/convertToObject";
import { FaArrowAltCircleLeft } from "react-icons/fa";

interface SearchParams {
  location: string;
  propertyType: PropertiesType["type"];
}

interface QueryType {
  $or: Array<{
    name?: RegExp;
    description?: RegExp;
    "location.street"?: RegExp;
    "location.city"?: RegExp;
    "location.state"?: RegExp;
    "location.zipcode"?: RegExp;
  }>;
  type?: RegExp;
}

const SearchResultPage = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  await connectDB();
  const { location, propertyType } = searchParams;

  const locationPattern = new RegExp(location, "i");

  const query: QueryType = {
    $or: [
      { name: locationPattern },
      { description: locationPattern },
      { "location.street": locationPattern },
      { "location.city": locationPattern },
      { "location.state": locationPattern },
      { "location.zipcode": locationPattern },
    ],
  };

  if (propertyType && propertyType !== "All") {
    const typePattern = new RegExp(propertyType, "i");
    query.type = typePattern;
  }

  const propertiesQueryResult = (await Property.find(
    query
  ).lean()) as Array<PropertiesType>;
  const properties = propertiesQueryResult.map((property) =>
    convertToSerializedObject(property)
  );

  return (
    <>
      <section className="bg-indigo-500 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px6 lg:px-8">
          <PropertySearchForm />
        </div>
      </section>

      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto py-6 px-4">
          <Link
            href={"/properties"}
            className="flex items-center text-indigo-500 hover:underline mb-3"
          >
            <FaArrowAltCircleLeft className="mr-2 " />
            Back to Properties
          </Link>

          <h1 className="text-2xl mb-4">Search Results</h1>
          {properties.length === 0 ? (
            <p className="text-2xl text-rose-400">No properties found</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard
                  key={property._id?.toString()}
                  property={property}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};
export default SearchResultPage;
