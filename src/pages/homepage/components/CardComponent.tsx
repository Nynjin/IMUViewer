import React, { useState } from "react";
import { Card, CardBody, CardFooter, CardHeader, Image } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

type CardComponentProps = {
  title: string;
  description: string;
  image: string;
  route: string;
};

const variants = {
  initial: { opacity: 1, scale: 0.5, transition: { duration: 0.2 }},
  zoom: { opacity: 0, scale: 0.95, transition: { duration: 0.5 }},
}

const CardComponent: React.FC<CardComponentProps> = ({
  title,
  description,
  image,
  route,
}) => {
  const [isZoomed, setZoom] = useState(false);
  const router = useRouter()

  return (
    <div className="flex justify-center items-center h-screen bg-black overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}>
        <motion.div
          initial={"initial"}
          animate={isZoomed ? "zoom" : ""}
          variants={variants}
          onClick={() => setZoom(true)}
          onAnimationComplete={() => {
              if(isZoomed) {
                router.push(route);
              }
            }
          }
        >
          <Card
            className={isZoomed ? "scale-125" : "cursor-pointer transition duration-300 hover:scale-125"}
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
              <p className="text-2xl text-white font-light mt-14 text-center">
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
