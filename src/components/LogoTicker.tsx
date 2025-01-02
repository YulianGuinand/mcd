"use client";
import acmeLogo from "@/assets/logo-acme.png";
import apexLogo from "@/assets/logo-apex.png";
import celestialLogo from "@/assets/logo-celestial.png";
import echoLogo from "@/assets/logo-echo.png";
import pusleLogo from "@/assets/logo-pulse.png";
import quantumLogo from "@/assets/logo-quantum.png";
import { motion } from "motion/react";
import Image from "next/image";
const images = [
  acmeLogo,
  quantumLogo,
  echoLogo,
  celestialLogo,
  pusleLogo,
  apexLogo,
];

export const LogoTicker = () => {
  return (
    <div className="py-8 bg-black md:py-12">
      <div className="container">
        <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black,transparent)]">
          <motion.div
            className="flex gap-14 flex-none lg:justify-center lg:w-full pr-14"
            animate={{ translateX: "-50%" }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop",
            }}
          >
            {images.map((url, index) => (
              <Image
                key={index}
                src={url}
                alt={`${url}`}
                className="h-8 w-auto"
              />
            ))}
            {/* SECOND SET OF LOGOS */}
            {images.map((url, index) => (
              <Image
                key={`2-${index}`}
                src={url}
                alt={`${url}-2`}
                className="h-8 w-auto"
              />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
