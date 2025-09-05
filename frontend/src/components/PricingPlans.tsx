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
  // If it's being used in signup form, render a compact version
  if (isSelectable) {
    return (
      <div className="pricing-plans-compact">
        <div className="plans-grid-compact">
          {plans.map((plan) => {
            const isSelected = selectedPlan === plan.name;
            return (
              <div
                key={plan.name}
                className={`plan-card-compact ${isSelected ? 'selected' : ''}`}
                onClick={() => onPlanSelect?.(plan.name)}
              >
                {/* Most Popular Badge */}
                {plan.mostPopular && (
                  <div className="plan-badge-compact">
                    <span>Most Popular</span>
                  </div>
                )}

                {/* Selection Indicator */}
                {isSelected && (
                  <div className="selection-indicator">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}

                {/* Plan Header */}
                <div className="plan-header-compact">
                  <h5 className="plan-name-compact">{plan.name}</h5>
                  <div className="plan-price-compact">
                    <sup className="currency-compact">$</sup>
                    <span className="amount-compact">{plan.price}</span>
                    <span className="period-compact">/month</span>
                  </div>
                </div>

                {/* Features */}
                <div className="plan-features-compact">
                  <ul>
                    {plan.features.slice(0, 4).map((feature, i) => (
                      <li key={i} className="feature-item-compact">
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Button */}
                <div className="plan-button-compact">
                  <button 
                    className={`select-button-compact ${isSelected ? 'selected' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onPlanSelect?.(plan.name);
                    }}
                  >
                    {isSelected ? 'Selected' : `Select ${plan.name}`}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Original full version for other uses
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
          {plans.map((plan) => {
            const isSelected = selectedPlan === plan.name;
            return (
              <div
                key={plan.name}
                className={`flex flex-col border rounded-xl overflow-hidden relative cursor-pointer transition-all duration-300 ${
                  isSelectable 
                    ? isSelected 
                      ? 'border-blue-500 ring-2 ring-blue-200 bg-blue-50' 
                      : 'border-gray-300 hover:border-gray-400 dark:border-gray-700'
                    : 'border-gray-300 dark:border-gray-700'
                } ${plan.mostPopular ? "z-20" : ""}`}
                onClick={() => isSelectable && onPlanSelect?.(plan.name)}
              >
                {/* Most Popular Badge */}
                {plan.mostPopular && (
                  <div className="absolute top-0 inset-x-0 flex justify-center mt-3 z-30">
                    <span className="text-xs font-medium uppercase border border-gray-700 text-white bg-black px-2 py-1 rounded-md">
                      most popular
                    </span>
                  </div>
                )}

                {/* Selection Indicator */}
                {isSelectable && isSelected && (
                  <div className="absolute top-4 right-4 z-30">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
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
                    {isSelectable ? (
                      <button 
                        className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                          isSelected
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          onPlanSelect?.(plan.name);
                        }}
                      >
                        {isSelected ? 'Selected' : `Select ${plan.name}`}
                      </button>
                    ) : (
                      <button className="btn-theme cursor-target">
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
