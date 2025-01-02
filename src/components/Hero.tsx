"use client";

import cogImage from "@/assets/cog.png";
import cylinderImage from "@/assets/cylinder.png";
import noodleImage from "@/assets/noodle.png";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Button } from "./ui/button";
import { TextShimmer } from "./ui/text-shimmer";

export const Hero = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });
  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);

  return (
    <section
      ref={heroRef}
      className="px-3 pt-8 md:pt-5 pb-20 md:pb-10 bg-[radial-gradient(ellipse_200%__100%_at_bottom_left,#7e22ce,#141414_75%)] overflow-x-clip"
    >
      <div className="container mx-auto">
        <div className="md:flex items-center">
          <div className="md:w-[478px] ">
            <div className="tag">
              <TextShimmer duration={2.3}>Version 1.0 is here</TextShimmer>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter title mt-6">
              Pathway to productivity
            </h1>
            <p className="text-xl tracking-tight mt-6">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur
              laboriosam dicta quam sequi distinctio error maiores veritatis
              possimus esse at?
            </p>
            <div className="flex gap-1 items-center mt-[30px]">
              <Button variant="primary" className="tracking-tight">
                Get for free
              </Button>
              <Button variant="ghost" className="tracking-tight gap-1">
                <span>Learn more</span>
                <ArrowRight className="size-5" />
              </Button>
            </div>
          </div>

          <div className="mt-20 md:mt-0 md:h-[648px] md:flex-1 relative">
            {/* IMAGES */}
            <motion.img
              className="md:absolute md:h-full md:w-auto md:max-w-none md:-left-6 lg:left-20"
              src={cogImage.src}
              alt="CogImage"
              animate={{
                translateY: [-30, 30],
              }}
              transition={{
                repeat: Infinity,
                repeatType: "mirror",
                duration: 3,
                ease: "easeInOut",
              }}
            />
            <motion.img
              src={cylinderImage.src}
              alt="CylinderImage"
              width={220}
              height={220}
              className="hidden md:block -top-8 -left-32 md:absolute"
              style={{ translateY: translateY }}
            />
            <motion.img
              src={noodleImage.src}
              alt="noodleImage"
              width={220}
              className="hidden lg:block top-[524px] right-0 lg:absolute"
              style={{
                rotate: 30,
                translateY: translateY,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
