import React from "react";

interface Plan {
  name: string;
  price: number;
  features: string[];
  mostPopular?: boolean;
}

const plans: Plan[] = [
  {
    name: "Basic",
    price: 49,
    features: [
      "10k Visitors/mo",
      "10 Funnels, 50 Pages",
      "Unlimited Transactions",
      "Analytics",
      "Integrations",
      "Audience Data",
      "Premium templates",
      "White Labelling",
    ],
  },
  {
    name: "Professional",
    price: 69,
    mostPopular: true,
    features: [
      "10k Visitors/mo",
      "10 Funnels, 50 Pages",
      "Unlimited Transactions",
      "Analytics",
      "Integrations",
      "Audience Data",
      "Premium templates",
      "White Labelling",
    ],
  },
  {
    name: "Ultimate",
    price: 89,
    features: [
      "10k Visitors/mo",
      "10 Funnels, 50 Pages",
      "Unlimited Transactions",
      "Analytics",
      "Integrations",
      "Audience Data",
      "Premium templates",
      "White Labelling",
    ],
  },
];

const PricingPlans: React.FC = () => {
  return (
    <section className="p-20 relative z-50 bg-white m-10 rounded-4xl ">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-medium text-gray-400 tracking-widest">our price</span>
          <h2 className="mt-7 md:text-5xl text-3xl font-medium tracking-tight">Price Plans</h2>
          <div className="w-10 mx-auto mt-5 bg-gradient-to-r from-cyan-500 to-blue-500 h-[2px]"></div>
          <p className="mt-6 text-xl text-gray-600 dark:text-gray-400">
            Choose the plan that suits your needs best and enjoy the creative process of brainstorming your new project.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-10 mt-20 2xl:px-28">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`flex flex-col border border-gray-300 rounded-xl overflow-hidden dark:border-gray-700 relative ${
                plan.mostPopular ? "z-20" : ""
              }`}
            >
              {/* Most Popular Badge */}
              {plan.mostPopular && (
                <div className="absolute top-0 inset-x-0 flex justify-center mt-3 z-30">
                  <span className="text-xs font-medium uppercase border border-gray-700 text-white bg-black px-2 py-1 rounded-md">
                    most popular
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center pt-10">
                <h5 className="text-xl font-semibold">{plan.name}</h5>
                <h2 className="text-5xl mt-8 mb-3 flex justify-center items-center">
                  <sup className="text-2xl align-middle">$</sup>
                  {plan.price}
                </h2>
                <span>per user, per month</span>
              </div>

              {/* Features */}
              <div className="p-10">
                <ul className="mb-10 text-center space-y-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="font-medium dark:text-gray-300 ">
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Button */}
                <div className="flex justify-center">
                  <button className="btn-theme cursor-target">
                    Get {plan.name}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Plan */}
        <h5 className="text-center font-medium mt-14">
          Interested in a custom plan?{" "}
          <a href="#" className="text-purple-500 cursor-target">
            Get in touch
          </a>
        </h5>
      </div>
    </section>
  );
};

export default PricingPlans;
