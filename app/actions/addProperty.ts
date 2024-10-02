"use server";
import Property, { PropertiesType } from "@/models/Property";
import connectDB from "@/config/database";
// import { getSessionUser } from "@/utils/getSessionUser";
import { getSessionHelper } from "@/app/helper/getSessionHelper";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Types } from "mongoose";
import cloudinary from "@/config/cloudinary";

async function addProperty(formData: FormData) {
  await connectDB();

  // const sessionUser = await getSessionUser();
  // if (!sessionUser || !sessionUser.userId) {
  //   throw new Error("User ID is required");
  // }
  // const { userId } = sessionUser;
  const userId = await getSessionHelper();

  // Access the data in the formData object
  const images = formData.getAll("images") as File[];
  const imageNames = images.filter((image) => image.name !== "");
  // console.log(images);

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

  const imageUrls = [];

  for (const imageFile of imageNames) {
    const imageBuffer = await imageFile.arrayBuffer();
    const imageArray = Array.from(new Uint8Array(imageBuffer));
    const imageData = Buffer.from(imageArray);

    // convert Base64
    const base64Image = imageData.toString("base64");

    // make request to cloudinary
    const result = await cloudinary.uploader.upload(
      `data:image/jpeg;base64,${base64Image}`,
      {
        folder: "Rent-Portal",
      }
    );

    imageUrls.push(result.secure_url);
  }
  propertyData.images = imageUrls;

  const newProperty = new Property(propertyData);
  await newProperty.save();

  revalidatePath("/", "layout");
  redirect(`/properties/${newProperty._id}`);
}
export default addProperty;
