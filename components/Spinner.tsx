"use client";
import { MoonLoader } from "react-spinners";
import { PacmanLoader } from "react-spinners";

export const Spinner = () => {
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

export const PacmanSpinner = ({
  size,
  margin,
}: {
  size: number;
  margin: number;
}) => {
  const override = {
    display: "block",
    margin: "100px auto",
  };

  return (
    <PacmanLoader
      size={size}
      margin={margin}
      color="#5eead4"
      cssOverride={override}
      speedMultiplier={1}
      aria-label="Loading Spinner"
    />
  );
};
