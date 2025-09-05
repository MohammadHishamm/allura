import CardNav from "./components/CardNav";
import LightRays from "./components/background";
import TargetCursor from "./components/Cursor";
import PricingPlans from "./components/PricingPlans"; // Pricing component

const App = () => {
  const logo = "/path-to-logo.png";

  const items = [
    {
      label: "About",
      bgColor: "#0D0716",
      textColor: "#fff",
      links: [
        { label: "Company", ariaLabel: "About Company", href: "/company" },
        { label: "Careers", ariaLabel: "About Careers", href: "/careers" },
      ],
    },
    {
      label: "Projects",
      bgColor: "#170D27",
      textColor: "#fff",
      links: [
        { label: "Featured", ariaLabel: "Featured Projects", href: "/projects/featured" },
        { label: "Case Studies", ariaLabel: "Project Case Studies", href: "/projects/case-studies" },
      ],
    },
    {
      label: "Contact",
      bgColor: "#271E37",
      textColor: "#fff",
      links: [
        { label: "Email", ariaLabel: "Email us", href: "mailto:example@example.com" },
        { label: "Twitter", ariaLabel: "Twitter", href: "https://twitter.com/example" },
        { label: "LinkedIn", ariaLabel: "LinkedIn", href: "https://linkedin.com/in/example" },
      ],
    },
  ];

  return (
    <div className="w-screen cursor-none relative overflow-x-hidden">
      {/* Background */}
      <LightRays
        raysOrigin="top-center"
        raysColor="#ffffffff"
        raysSpeed={0.5}
        lightSpread={0.5}
        rayLength={1.5}
        followMouse={true}
        mouseInfluence={0.6}
        noiseAmount={0}
        distortion={0}
        className="rays-fullscreen"
      />

      {/* Overlay */}
      <div className="fixed top-0 left-0 w-full h-full bg-black/20 z-10"></div>

      {/* Navbar */}
      <CardNav
        logo={logo}
        logoAlt="Company Logo"
        items={items}
        baseColor="#fff"
        menuColor="#000"
        buttonBgColor="#060010"
        buttonTextColor="#fff"
        ease="power3.out"
      />

      {/* Cursor */}
      <TargetCursor spinDuration={2} hideDefaultCursor={true} />

      {/* Content */}
      <main className="relative z-20">
        {/* Hero Section */}
        <section className=" min-h-screen flex flex-col justify-center items-center text-center text-white">
          <div className="max-w-lg space-y-6">
            <h1 className="text-6xl font-bold leading-tight">Welcome to MySite</h1>
            <p className="text-xl text-gray-300">
              We create immersive experiences with cutting-edge design and visuals.
            </p>
            <button className="btn-theme cursor-target">Get Started</button>
          </div>
        </section>

        {/* Pricing Plans Section */}
        <section className=" ">
          <PricingPlans />
        </section>
      </main>
    </div>
  );
};

export default App;
