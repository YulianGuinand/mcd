import { CheckIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { Button } from "./ui/button";
import { TextShimmer } from "./ui/text-shimmer";
const pricingTiers = [
  {
    title: "Free",
    monthlyPrice: 0,
    buttonText: "Get started for free",
    popular: false,
    inverse: false,
    features: [
      "Up to 5 project members",
      "Unlimited tasks and projects",
      "2GB storage",
      "Integrations",
      "Basic support",
    ],
  },
  {
    title: "Pro",
    monthlyPrice: 9,
    buttonText: "Sign up now",
    popular: true,
    inverse: true,
    features: [
      "Up to 50 project members",
      "Unlimited tasks and projects",
      "50GB storage",
      "Integrations",
      "Priority support",
      "Advanced support",
      "Export support",
    ],
  },
  {
    title: "Business",
    monthlyPrice: 19,
    buttonText: "Sign up now",
    popular: false,
    inverse: false,
    features: [
      "Up to 5 project members",
      "Unlimited tasks and projects",
      "200GB storage",
      "Integrations",
      "Dedicated account manager",
      "Custom fields",
      "Advanced analytics",
      "Export capabilities",
      "API access",
      "Advanced security features",
    ],
  },
];

export const Pricing = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-[#141414] to-black">
      <div className="container mx-auto">
        <h2 className="section-title">Pricing</h2>
        <div className="section-content">
          <p className="section-description">
            Free forever. Upgrade for unlimited tasks, better security, and
            exclusive features.
          </p>
        </div>
        <div className="px-3 flex flex-col lg:flex-row lg:items-end lg:justify-center gap-6 items-center mt-10">
          {pricingTiers.map(
            (
              { title, monthlyPrice, buttonText, popular, inverse, features },
              index
            ) => (
              <div
                key={index}
                className={twMerge(
                  "card-comp",
                  inverse && "bg-primary border-white/40 "
                )}
              >
                <div className="flex justify-between">
                  <h3 className="text-lg font-bold text-white/50">
                    {popular ? (
                      <TextShimmer className="text-white/60" duration={1.5}>
                        {title}
                      </TextShimmer>
                    ) : (
                      title
                    )}
                  </h3>
                  <div
                    className={twMerge(
                      "inline-flex text-sm px-4 py-1.5 rounded-xl",
                      popular && "border border-white/40"
                    )}
                  >
                    {popular && (
                      <TextShimmer
                        className="text-white/50 font-medium text-sm"
                        duration={1.5}
                      >
                        Most Popular
                      </TextShimmer>
                    )}
                  </div>
                </div>
                <div className="flex items-baseline gap-1 mt-[30px]">
                  <span className="text-4xl font-bold tracking-tighter leading-none">
                    {monthlyPrice}€
                  </span>
                  <span className="tracking-tight font-bold text-white/50">
                    /month
                  </span>
                </div>
                <Button
                  variant={popular ? "secondary" : "primary"}
                  className="w-full mt-[30px]"
                >
                  {buttonText}
                </Button>
                <ul className="flex flex-col gap-5 mt-8">
                  {features.map((feature, index) => (
                    <li key={index} className="text-sm flex items-center gap-4">
                      <CheckIcon className="size-6" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};
