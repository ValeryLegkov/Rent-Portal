"use client";
import { MoonLoader } from "react-spinners";

const LoadingPage = () => {
  const override = {
    display: "block",
    margin: "100px auto",
  };

  return (
    <MoonLoader
      size={60}
      color="#f43f5e"
      cssOverride={override}
      speedMultiplier={0.5}
      aria-label="Loading Spinner"
    />
  );
};

export default LoadingPage;
