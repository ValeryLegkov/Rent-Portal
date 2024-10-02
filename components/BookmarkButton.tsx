"use client";
import { useState, useEffect } from "react";
import { FaBookmark } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa6";
import bookmarkProperty from "@/app/actions/bookmarkProperty";
import checkBookmarkStatus from "@/app/actions/checkBookmarkedStatus";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { PropertiesType } from "@/models/Property";
import { Types } from "mongoose";
import { PacmanSpinner } from "./Spinner";

export const BookmarkButton = ({ property }: { property: PropertiesType }) => {
  const { data: session } = useSession();
  const userId = session?.user.id;

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    checkBookmarkStatus({ propertyId: property._id as Types.ObjectId }).then((res) => {
      if (res.error) toast.error(res.error);
      if (res.bookmarkStatus) setIsBookmarked(res.bookmarkStatus ?? false);
      setLoading(false);
    });
  }, [property._id, userId]);

  const handleClick = async () => {
    if (!userId) {
      toast.error("Please login to bookmark property");
      return;
    }

    bookmarkProperty({ propertyId: property._id as Types.ObjectId }).then((res) => {
      if (res.error) {
        return toast.error(res.error);
      }
      setIsBookmarked(res.bookmarkStatus ?? false);
      toast.success(res.message);
    });
  };

  if (loading) {
    return <PacmanSpinner size={10} margin={1} />;
  }

  return isBookmarked ? (
    <button
      onClick={handleClick}
      className="bg-rose-500 hover:bg-rose-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaBookmark className="mr-2 " /> Remove Bookmark
    </button>
  ) : (
    <button
      onClick={handleClick}
      className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaRegBookmark className="mr-2 " /> Bookmark Property
    </button>
  );
};
