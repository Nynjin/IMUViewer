import { NextUIProvider } from "@nextui-org/react";
import { HomePage } from "./pages/HomePage/HomePage";

export default function Home() {
    return (
        <NextUIProvider>
            <HomePage />
        </NextUIProvider>
    );
}