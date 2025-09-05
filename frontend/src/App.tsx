import CardNav from "./components/CardNav";
import LightRays from "./components/background";
import TargetCursor from "./components/Cursor";

const App = () => {
  const logo = "/path-to-logo.png"; // Add your logo path here

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
    <div className="w-screen h-screen cursor-none relative overflow-hidden">
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

      {/* Background */}
      <LightRays
        raysOrigin="top-center"
        raysColor="#ffffffff"
        raysSpeed={0.5}
        lightSpread={0.5}
        rayLength={1.5}
        followMouse={true}
        mouseInfluence={0.1}
        noiseAmount={0}
        distortion={0}
        className="rays-fullscreen"
      />

      {/* Cursor */}
      <TargetCursor spinDuration={2} hideDefaultCursor={true} />

      {/* Main Content */}
      <div className="absolute top-0 left-0 w-full h-full flex items-center px-24">
        {/* Left Typography */}
        <div className="text-white space-y-6 max-w-lg">
          <h1 className="text-6xl font-bold leading-tight">
            Welcome to MySite
          </h1>
          <p className="text-xl text-gray-300">
            We create immersive experiences with cutting-edge design and visuals.
          </p>
          <button className="btn-theme cursor-target">
            Get Started
          </button>

        </div>
      </div>
    </div>
  );
};

export default App;
