"use server";
import connectDB from "@/config/database";
import User from "@/models/User";
import { getSessionHelper } from "@/app/helper/getSessionHelper";
import { Types } from "mongoose";

const checkBookmarkedStatus = async ({
  propertyId,
}: {
  propertyId: Types.ObjectId;
}) => {
  try {
    await connectDB();

    const userId = await getSessionHelper();

    const user = await User.findById(userId);
    const bookmarkStatus = user?.bookmarks?.includes(
      propertyId as Types.ObjectId
    );

    return { bookmarkStatus };
  } catch (error) {
    return { error: "Something went wrong when checking bookmark status" };
  }
};
export default checkBookmarkedStatus;
