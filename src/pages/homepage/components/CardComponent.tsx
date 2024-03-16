import React, { useState } from "react";
import { Card, CardHeader, Image } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation'

type CardComponentProps = {
  title: string;
  description: string;
  image: string;
};

const variants = {
  zoom: { opacity: 0, zoom: 1 },
  unzoom: { opacity: 1, zoom: 0.3 },
}

const CardComponent: React.FC<CardComponentProps> = ({
  title,
  description,
  image,
}) => {
  const [isZoomed, setZoom] = useState(false);
  const router = useRouter()

  const handleCardClick = () => {
    setZoom(!isZoomed);
  };

  const handleAnimationComplete = () => {
    if (isZoomed) {
      router.push('/viewer')
    }
  };

  console.log("isZoomed: ", isZoomed);

  return (
    <div className="flex justify-center items-center h-screen">
      <motion.div
        initial={{ zoom: 0.3 }}
        animate={isZoomed ? "zoom" : "unzoom"}
        variants={variants}
        whileHover={isZoomed ? { scale: 1 } : { scale: 1.1 }}
        onAnimationComplete={handleAnimationComplete}
      >
        <Card
          className="card"
          shadow="sm"
          isPressable
          onPress={handleCardClick}
        >
          <CardHeader className="absolute z-10 top-1 flex-col !items-start">
            <p className="text-tiny text-white/50 uppercase font-bold">
              {title}
            </p>
            <h4 className="text-white font-medium text-large">
              {description}
            </h4>
          </CardHeader>
          <Image
            removeWrapper
            alt="Card background"
            className="z-0 w-full h-full object-cover"
            src={image}
          />
        </Card>
      </motion.div>
    </div>
  );
};

export default CardComponent;
