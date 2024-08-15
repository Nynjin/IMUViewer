import { NextUIProvider } from "@nextui-org/react";
import ThreeScene from "@/pages/viewer/pages/ThreeScene";
import TrackerProvider from "@/pages/viewer/context/TrackerContext";

export default function Home() {
  return (
    <NextUIProvider>
      <TrackerProvider>
        <ThreeScene />
      </TrackerProvider>
    </NextUIProvider>
  );
}
