import { BrowserRouter, Route, Routes } from "react-router-dom";
import CardNav, { items } from "./components/CardNav";
import LightRays from "./components/background";
import TargetCursor from "./components/Cursor";
import PricingPlans from "./components/PricingPlans";
import Footer from "./components/Footer";
import ModelViewer from "./components/ModelViewer";
import Admin from "./components/admin";
const App = () => {
  const logo = "/path-to-logo.png";

  return (
    <div className="relative">
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

      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <main className="relative z-20  md:mt-8">
                {/* Hero Section */}
                <section className="relative min-h-screen flex flex-col md:flex-row justify-center items-center text-white  md:px-20">
                  {/* Text Left */}
                  <div className="md:w-1/2 flex flex-col justify-center items-start space-y-6 z-20 ms-4 ms-6">
                    <h1 className="text-6xl font-bold leading-tight">
                      Welcome to MySite
                    </h1>
                    <p className="text-xl text-gray-300">
                      We create immersive experiences with cutting-edge design and visuals.
                    </p>
                    <button className="btn-theme cursor-target">Get Started</button>
                  </div>

                  {/* 3D Model Right */}
                  <div className="md:w-1/2 w-full md:mt-0 md:flex hidden">
                    <ModelViewer url="/models/gaming_desktop_pc_blend_file/scene.gltf" />
                  </div>

                  {/* Scroll Mouse Animation */}
                  <div className="absolute bottom-20  justify-center w-full z-20 md:flex hidden">
                    <div className="w-[30px] h-[50px] border-2 border-white rounded-full flex justify-center items-start p-[4px]">
                      <div className="w-2 h-2 bg-white rounded-full animate-scroll"></div>
                    </div>
                  </div>
                </section>
                {/* Pricing Plans Section */}
                <section className="py-20 bg-gray-900">
                  <PricingPlans />
                </section>
              </main>
            }
          />
          <Route path="/admin297_2" element={<Admin />} />

        </Routes>


      </BrowserRouter>

      {/* Footer */}
      <Footer />

    </div>
  );
};

export default App;
