import React from "react";

interface Plan {
  name: string;
  price: number;
  features: string[];
  mostPopular?: boolean;
}

interface PricingPlansProps {
  onPlanSelect?: (planName: string) => void;
  selectedPlan?: string | null;
  isSelectable?: boolean;
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

const PricingPlans: React.FC<PricingPlansProps> = ({ 
  onPlanSelect, 
  selectedPlan, 
  isSelectable = false 
}) => {
  return (
    <section className="p-20 relative z-50 
      backdrop-blur-[10px] 
      bg-gradient-to-r from-white/10 to-purple-400/10
      border border-white/10
      m-10 rounded-4xl shadow-md text-white"
    >
      <div className="container mx-auto">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-medium text-gray-300 tracking-widest">our price</span>
          <h2 className="mt-7 md:text-5xl text-3xl font-medium tracking-tight">Price Plans</h2>
          <div className="w-10 mx-auto mt-5 bg-gradient-to-r from-purple-300 to-blue-400 h-[2px]"></div>
          <p className="mt-6 text-xl text-gray-300">
            Choose the plan that suits your needs best and enjoy the creative process of brainstorming your new project.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-10 mt-20 2xl:px-28">
          {plans.map((plan) => {
            const isSelected = selectedPlan === plan.name;
            return (
              <div
                key={plan.name}
                className={`flex flex-col rounded-xl overflow-hidden relative cursor-pointer transition-all duration-300
                  border border-white/10
                  backdrop-blur-[8px]
                  bg-gradient-to-br from-white/10 to-purple-400/10
                  shadow-lg
                  ${isSelectable && isSelected ? "ring-2 ring-purple-400" : ""}
                `}
                onClick={() => isSelectable && onPlanSelect?.(plan.name)}
              >
                {/* Most Popular Badge */}
                {plan.mostPopular && (
                  <div className="absolute top-0 inset-x-0 flex justify-center mt-3 z-30">
                    <span className="text-xs font-medium uppercase border border-purple-400 text-white bg-purple-600/70 px-2 py-1 rounded-md">
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
                  <span className="text-gray-300">per user, per month</span>
                </div>

                {/* Features */}
                <div className="p-10">
                  <ul className="mb-10 text-center space-y-4">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="font-medium text-gray-200">
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Button */}
                  <div className="flex justify-center">
                    {isSelectable ? (
                      <button 
                        className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                          isSelected
                            ? "bg-purple-500 text-white"
                            : "bg-white/10 text-white hover:bg-white/20"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          onPlanSelect?.(plan.name);
                        }}
                      >
                        {isSelected ? "Selected" : `Select ${plan.name}`}
                      </button>
                    ) : (
                      <button className="px-6 py-3 rounded-lg font-medium btn-theme transition-all cursor-target">
                        Get {plan.name}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Plan */}
        <h5 className="text-center font-medium mt-14 text-gray-300">
          Interested in a custom plan?{" "}
          <a href="#" className="text-purple-300 hover:text-purple-200 cursor-target">
            Get in touch
          </a>
        </h5>
      </div>
    </section>
  );
};

export default PricingPlans;
