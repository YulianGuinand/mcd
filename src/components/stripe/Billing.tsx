"use client";

import { CheckIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { TextShimmer } from "../ui/text-shimmer";

interface PlansData {
  link: string;
  priceId: string;
  price: number;
  duration: string;
}

interface BillingProps {
  title: string;
  data: PlansData[];
  features: string[];
  email?: string;
}

const Billing = ({ title, data, features, email }: BillingProps) => {
  const [selectedTime, setSelectedTime] = useState<number>(0);

  return (
    <div className="inline-flex justify-center items-center w-full h-screen gap-3">
      <Card className="w-[350px] dark">
        <div className="w-full flex items-center px-4 gap-10 pt-4">
          {data.map((plan, index) => (
            <div key={index} className="flex items-center">
              <label className="relative flex items-center cursor-pointer">
                <input
                  name="time"
                  type="radio"
                  className="peer h-4 w-4 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-slate-400 transition-all "
                  id={plan.duration}
                  onChange={() => setSelectedTime(index)}
                  checked={selectedTime === index}
                />
                <span className="absolute bg-primary w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </label>
              <label
                onClick={() => setSelectedTime(index)}
                className="ml-2 text-white cursor-pointer text-sm"
                htmlFor={plan.duration}
              >
                {index === 0 ? "Pay monthly" : "pay yearly"}
              </label>
            </div>
          ))}
        </div>
        <CardHeader>
          <CardTitle className="text-3xl w-full flex justify-between">
            <TextShimmer duration={2} className="text-white/60">
              {title}
            </TextShimmer>
            <div>
              <TextShimmer duration={2} className="text-white/60">
                {`$${data[selectedTime].price}.00`}
              </TextShimmer>
              <span className="text-sm text-muted-foreground ml-[2px]">
                {data[selectedTime].duration}
              </span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full flex flex-col gap-3">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center">
                <CheckIcon className="size-4 mr-2" />
                {feature}
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <a
            href={data[selectedTime].link + "?prefilled_email=" + email}
            target="_blank"
          >
            <Button variant="primary" className="w-full">
              Choose
            </Button>
          </a>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Billing;
