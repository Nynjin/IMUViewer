import React, { useState } from "react";
import { Card, CardBody, CardFooter, CardHeader, Image } from "@nextui-org/react";
import { motion, useAnimate } from "framer-motion";
import { useRouter } from "next/navigation";

type CardComponentProps = {
  title: string;
  description: string;
  image: string;
};

const variants = {
  initial: { opacity: 1, scale: 0.5 },
  hover: { scale: 0.6 },
  zoom: { opacity: 0, scale: 0.95 },
}

const CardComponent: React.FC<CardComponentProps> = ({
  title,
  description,
  image,
}) => {
  const [isZoomed, setZoom] = useState(false);
  const [scope, animate] = useAnimate();

  const router = useRouter()

  const handleMouseEnter = async () => {
    if (!isZoomed) {
      await animate(scope.current, variants.hover, { duration: 0.2 });
    }
  };

  const handleMouseLeave = async () => {
    if (!isZoomed) {
      await animate(scope.current, variants.initial, { duration: 0.2 });
    }
  };

  const handleCardClick = async () => {
    setZoom(true);
    await animate(scope.current, variants.zoom, { duration: 0.5 });
    router.push('/viewer');
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}>
        <motion.div
          initial="initial"
          variants={variants}
          onClick={handleCardClick}
          ref={scope}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          
          <Card
            className="cursor-pointer"
            shadow="sm"
          >
            <CardHeader className="absolute z-10 top-1 flex-col !items-start ml-4 mt-4">
              <p className="text-5xl text-white/50 uppercase font-bold">
                {title}
              </p>
            </CardHeader>
            <CardBody>
              <Image
                removeWrapper
                alt="Card background"
                className="z-0 w-full h-full object-cover"
                src={image}
              />
              <div className="absolute inset-0 bg-black opacity-50"></div>
            </CardBody>
            <CardFooter className="flex justify-center items-center absolute z-10 bottom-1 flex-col mb-4">
              <p className="text-3xl text-white font-light mt-14">
                {description}
              </p>
            </CardFooter>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CardComponent;
