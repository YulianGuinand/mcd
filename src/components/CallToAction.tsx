import springImage from "@/assets/spring.png";
import starImage from "@/assets/star.png";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";

export const CallToAction = () => {
  return (
    <section className="bg-gradient-to-b from-black to-primary py-24 overflow-x-clip">
      <div className="container mx-auto">
        <div className="section-content relative">
          <h2 className="section-title">Sign up for free today</h2>
          <p className="section-description">
            Celebrate the joy of accessing exclusive content and features by
            signing up now.
          </p>

          <Image
            src={starImage}
            alt="starImage"
            width={360}
            className="absolute -left-[350px] -top-[137px] hidden md:block"
          />
          <Image
            src={springImage}
            alt="springImage"
            width={360}
            className="absolute -right-[331px] -top-[50px] hidden md:block"
          />
        </div>
        <div className="flex gap-2 mt-10 justify-center">
          <Button variant="primary">Get for free</Button>
          <Button variant="ghost" className="gap-1">
            <span>Learn more</span>
            <ArrowRight className="size-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};
