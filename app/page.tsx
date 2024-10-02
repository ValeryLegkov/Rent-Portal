import { Hero } from "@/components/Hero";
import { InfoBoxes } from "@/components/InfoBoxes";
import { HomeProperties } from "@/components/HomeProperties";
import connectDB from "@/config/database";
import React from "react";

export default function HomePage() {
  connectDB();
  return (
    <>
      <Hero />
      <InfoBoxes />
      <HomeProperties />
    </>
  );
}
