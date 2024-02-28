"use client";

import { NextUIProvider } from "@nextui-org/react";
import ThreeScene from "./pages/ThreeScene/ThreeScene";
import TrackerProvider from "./context/TrackerContext/TrackerContext";

export default function Home() {
  return (
    <NextUIProvider>
      <TrackerProvider>
        <ThreeScene />
      </TrackerProvider>
    </NextUIProvider>
  );
}