"use server";
import connectDB from "@/config/database";
import User from "@/models/User";
import { getSessionHelper } from "@/app/helper/getSessionHelper";
import { revalidatePath } from "next/cache";
import { Types } from "mongoose";
// import { PropertiesType } from "@/models/Property";

const bookmarkProperty = async ({
  propertyId,
}: {
  propertyId: Types.ObjectId;
}) => {
  try {
    await connectDB();
    const userId = await getSessionHelper();

    const user = await User.findById(userId);
    let bookmarkStatus = user?.bookmarks?.includes(propertyId);

    let message;

    if (bookmarkStatus) {
      // if already bookmarked, then remove
      (user?.bookmarks as Types.Array<Types.ObjectId>).pull(propertyId);
      message = "Bookmark Removed";
      bookmarkStatus = false;
    } else {
      // if not bookmarked, Add it
      user?.bookmarks?.push(propertyId);
      message = "Bookmark Added";
      bookmarkStatus = true;
    }

    await user?.save();
    revalidatePath("/properties/saved", "page");

    return {
      message,
      bookmarkStatus,
    };
  } catch (error) {
    return {
      error: "An error occurred while updating bookmarks",
    };
  }
};

export default bookmarkProperty;

// user?.bookmarks?.pull(propertyId);
// const index = user?.bookmarks?.indexOf(propertyId);
// if (index !== -1 && index !== undefined) {
//   user?.bookmarks?.splice(index, 1);
// }
