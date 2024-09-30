"use server";
import connectDB from "@/config/database";
import Property, { PropertiesType } from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { Types } from "mongoose";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function updateProperty(propertyId: string, formData: FormData) {
  await connectDB();

  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required");
  }
  const { userId } = sessionUser;

  const existingProperty = await Property.findById(propertyId);

  // verify ownership
  if (existingProperty?.owner.toString() !== userId) {
    throw new Error("Current user does not own this property!");
  }

  const propertyData: PropertiesType = {
    owner: new Types.ObjectId(userId),
    type: formData.get("type") as string,
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    location: {
      street: formData.get("location.street") as string,
      city: formData.get("location.city") as string,
      state: formData.get("location.state") as string,
      zipcode: formData.get("location.zipcode") as string,
    },
    beds: parseInt(formData.get("beds") as string),
    baths: parseInt(formData.get("baths") as string),
    square_feet: parseInt(formData.get("square_feet") as string),
    amenities: formData.getAll("amenities") as string[],
    rates: {
      nightly: formData.get("rates.nightly")
        ? parseInt(formData.get("rates.nightly") as string)
        : undefined,
      weekly: formData.get("rates.weekly")
        ? parseInt(formData.get("rates.weekly") as string)
        : undefined,
      monthly: formData.get("rates.monthly")
        ? parseInt(formData.get("rates.monthly") as string)
        : undefined,
    },
    seller_info: {
      name: formData.get("seller_info.name") as string,
      email: formData.get("seller_info.email") as string,
      phone: formData.get("seller_info.phone") as string,
    },
  };

  const updateData = await Property.findByIdAndUpdate(propertyId, propertyData);

  revalidatePath("/", "layout");

  redirect(`/properties/${updateData?._id}`);
}

export default updateProperty;
