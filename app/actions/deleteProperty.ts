"use server";
import connectDB from "@/config/database";
import cloudinary from "@/config/cloudinary";
import Property from "@/models/Property";
import { revalidatePath } from "next/cache";
import { getSessionUser } from "@/utils/getSessionUser";

async function deleteProperty(id: string) {
  await connectDB();
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required");
  }
  const { userId } = sessionUser;

  const property = await Property.findById(id);
  if (!property) {
    throw new Error("Property not found");
  }

  // verify ownership
  if (property.owner.toString() !== userId) {
    throw new Error("You are not authorized to delete this property");
  }

  // extract public ID from image URL
  const imageId = property.images?.map((imageUrl) => {
    const part = imageUrl.split("/");
    return part.at(-1)?.split(".").at(0);
  });

  // delete image from cloudinary
  if (imageId && imageId.length > 0) {
    for (const imgId of imageId) {
      await cloudinary.uploader.destroy("Rent-Portal/" + imgId);
    }
  }

  await property.deleteOne();

  revalidatePath("/", "layout");
}

export default deleteProperty;
