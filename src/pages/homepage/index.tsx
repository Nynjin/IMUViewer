import { NextUIProvider } from "@nextui-org/react";
import CardComponent from "./components/CardComponent";

export default function Home() {
    return (
        <NextUIProvider>
            <CardComponent title={"IMU Viewer"} description={"desc"} image={"imu.PNG"}/>
        </NextUIProvider>
    );
}