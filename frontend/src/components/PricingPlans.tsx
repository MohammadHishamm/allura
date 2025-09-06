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
    <>
      {/* Mobile Design - New Modern Design */}
      <section className="md:hidden py-16 px-4 relative z-50">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-400/30 mb-6">
              <span className="text-sm font-medium text-purple-300 tracking-wider uppercase">Pricing Plans</span>
            </div>
            <h2 className="text-4xl font-bold text-white mb-6">
              Choose Your
              <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Perfect Plan
              </span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Select the plan that fits your needs and start building amazing projects today.
            </p>
          </div>

          {/* Plans Grid - Mobile Only */}
          <div className="grid grid-cols-1 gap-8">
            {plans.map((plan) => {
              const isSelected = selectedPlan === plan.name;
              return (
                <div
                  key={plan.name}
                  className={`group relative rounded-3xl overflow-visible transition-all duration-500 transform hover:scale-105 hover:-translate-y-2
                    ${plan.mostPopular 
                      ? 'ring-2 ring-purple-400/50 shadow-2xl shadow-purple-500/20' 
                      : 'shadow-xl shadow-black/20'
                    }
                    ${isSelectable && isSelected ? "ring-2 ring-purple-400 scale-105" : ""}
                  `}
                  onClick={() => isSelectable && onPlanSelect?.(plan.name)}
                >
                  {/* Most Popular Badge - Positioned outside the card */}
                  {plan.mostPopular && (
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-20">
                      <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                        ⭐ Most Popular
                      </div>
                    </div>
                  )}

                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br transition-all duration-500 rounded-3xl
                    ${plan.mostPopular 
                      ? 'from-purple-500/20 via-blue-500/20 to-purple-600/20' 
                      : 'from-white/5 via-white/10 to-purple-500/10'
                    }
                    group-hover:from-purple-500/30 group-hover:via-blue-500/30 group-hover:to-purple-600/30
                  `} />
                  
                  {/* Glass Effect */}
                  <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 p-8 h-full flex flex-col rounded-3xl">

                    {/* Plan Header */}
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-white mb-4">{plan.name}</h3>
                      <div className="flex items-baseline justify-center mb-2">
                        <span className="text-5xl font-bold text-white">${plan.price}</span>
                        <span className="text-gray-400 ml-2">/month</span>
                      </div>
                      <p className="text-gray-400 text-sm">per user, per month</p>
                    </div>

                    {/* Features */}
                    <div className="flex-1 mb-8">
                      <ul className="space-y-4">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-center text-gray-200 group-hover:text-white transition-colors">
                            <div className="w-5 h-5 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 flex items-center justify-center mr-3 flex-shrink-0">
                              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Button */}
                    <div className="mt-auto">
                      {isSelectable ? (
                        <button 
                          className={`w-full py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
                            isSelected
                              ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/30"
                              : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            onPlanSelect?.(plan.name);
                          }}
                        >
                          {isSelected ? "✓ Selected" : `Select ${plan.name}`}
                        </button>
                      ) : (
                        <button className="w-full py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 shadow-lg shadow-purple-500/30">
                          Get {plan.name}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Custom Plan CTA */}
          <div className="text-center mt-16">
            <div className="inline-flex items-center px-8 py-4 rounded-2xl bg-gradient-to-r from-white/5 to-purple-500/10 border border-white/10 backdrop-blur-xl">
              <span className="text-gray-300 mr-2">Need something custom?</span>
              <a 
                href="#" 
                className="text-purple-400 hover:text-purple-300 font-semibold transition-colors cursor-target"
              >
                Let's talk →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Desktop Design - Original Design */}
      <section className="hidden md:block p-20 relative z-50 
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
    </>
  );
};

export default PricingPlans;
