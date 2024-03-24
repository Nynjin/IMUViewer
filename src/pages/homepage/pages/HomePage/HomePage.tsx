import React from "react";
import CardComponent from "../../components/CardComponent";

export const HomePage: React.FC = () => {
    return (
        <CardComponent title={"IMU Viewer"} description={"ThreeJS App that allows user to view the movements of an IMU connected to the webserver via websocket"} image={"imu.PNG"}/>
    );
}