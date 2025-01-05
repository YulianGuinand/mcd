export const plans = [
  {
    pro: [
      {
        name: "pro month",
        link:
          process.env.STRIPE_MODE === "development"
            ? "https://buy.stripe.com/test_fZeg0C3Xjfoa32E5kl"
            : "", // CHANGE
        priceId:
          process.env.STRIPE_MODE === "development"
            ? "price_1QdHdcHvxrVVgOXgfwOu4TeN"
            : "", // CHANGE
        price: 9,
        duration: "/month",
      },
      {
        name: "pro year",
        link:
          process.env.STRIPE_MODE === "development"
            ? "https://buy.stripe.com/test_bIY01EdxT0tg7iU9AC"
            : "", // CHANGE
        priceId:
          process.env.STRIPE_MODE === "development"
            ? "price_1QdHjmHvxrVVgOXgyRIdWZKk"
            : "", // CHANGE
        price: 99,
        duration: "/year",
      },
    ],
    features: [
      "Unlimited projects",
      "Unlimited tasks",
      "Unlimited users",
      "Unlimited storage",
      "Priority support",
    ],
  },
];
