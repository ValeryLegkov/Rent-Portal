import { PropertyEditForm } from "@/components/PropertyEditForm";
import connectDB from "@/config/database";
import Property, { PropertiesType } from "@/models/Property";
import { convertToSerializedObject } from "@/utils/convertToObject";

type ParamsType = {
  id: string;
};

const EditPage = async ({ params }: { params: ParamsType }) => {
  await connectDB();

  const propertyDoc = await Property.findById(params.id).lean();
  const property = convertToSerializedObject(propertyDoc as PropertiesType);

  if (!property) {
    return (
      <h1 className="font-bold text-center text-2xl mt-10">
        Property Not Found
      </h1>
    );
  }

  return (
    <section className="bg-indigo-50">
      <div className="container mx-auto max-w-2xl py-24">
        <div className="bg-white px-4 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <PropertyEditForm property={property} />
        </div>
      </div>
    </section>
  );
};

export default EditPage;
