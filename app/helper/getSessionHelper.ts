import connectDB from "@/config/database";
import { getSessionUser } from "@/utils/getSessionUser";

export const getSessionHelper = async () => {
  await connectDB();
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required");
  }
  const { userId } = sessionUser;

  return userId;
};
