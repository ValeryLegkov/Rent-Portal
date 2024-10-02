"use client";
import { PropertiesType } from "@/models/Property";
import React from "react";
import {
  TelegramShareButton,
  TwitterShareButton,
  EmailShareButton,
  WhatsappShareButton,
  PinterestShareButton,
  TelegramIcon,
  TwitterIcon,
  EmailIcon,
  WhatsappIcon,
  PinterestIcon,
} from "react-share";

export const ShareButton = ({ property }: { property: PropertiesType }) => {
  const shareURL = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`;

  return (
    <>
      <h3 className="text-lg font-bold text-center pt-2">Share Property</h3>

      <div className="flex justify-center gap-4 pb-4">
        <TelegramShareButton url={shareURL} title={property.name}>
          <TelegramIcon size={32} round />
        </TelegramShareButton>

        <TwitterShareButton
          url={shareURL}
          title={property.name}
          hashtags={[`${property.type.replace(/\s/g, "")}ForRent`]}
        >
          <TwitterIcon size={32} round={true} />
        </TwitterShareButton>

        <EmailShareButton
          url={shareURL}
          subject={property.name}
          body={"Check out this property - "}
        >
          <EmailIcon size={32} round={true} />
        </EmailShareButton>

        <WhatsappShareButton
          url={shareURL}
          title={property.name}
          separator="::"
        >
          <WhatsappIcon size={32} round={true} />
        </WhatsappShareButton>

        <PinterestShareButton
          url={shareURL}
          media={property?.images?.[0] ?? ""}
        >
          <PinterestIcon size={32} round={true} />
        </PinterestShareButton>
      </div>
    </>
  );
};

// <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center">
//   <FaShare className="mr-2 " /> Share Property
// </button>
