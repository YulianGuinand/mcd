"use client";
import productImage from "@/assets/product-image.png";
import pyramidImage from "@/assets/pyramid.png";
import tubeImage from "@/assets/tube.png";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

export const ProductShowcase = () => {
  const showCaseRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: showCaseRef,
    offset: ["start end", "end start"],
  });
  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);
  return (
    <section
      ref={showCaseRef}
      className="bg-gradient-to-b from-black to-primary py-24 overflow-x-clip"
    >
      <div className="container mx-auto md:px-0">
        <div className="section-content">
          <div className="flex justify-center">
            <div className="tag">Boost your productivity</div>
          </div>
          <h2 className="section-title mt-5">
            A more effective way to track your progress
          </h2>
          <p className="section-description">
            Effortlessly turn your ideas into a fully functionnal, responsive,
            SaaS website in just minutes with this template.
          </p>
        </div>
        <div className="relative">
          <Image src={productImage} alt="productImage" className="mt-10" />
          <motion.img
            src={pyramidImage.src}
            alt="pyramidImage"
            height={262}
            width={262}
            className="md:block absolute hidden -right-36 -top-32 lg:w-[362px]"
            style={{ translateY: translateY }}
          />
          <motion.img
            src={tubeImage.src}
            alt="tubeImage"
            className="absolute md:block hidden bottom-24 -left-36 lg:w-[362px]"
            height={248}
            width={248}
            style={{ translateY: translateY }}
          />
        </div>
      </div>
    </section>
  );
};
