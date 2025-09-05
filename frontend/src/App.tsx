import CardNav from "./components/CardNav";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LightRays from "./components/background";
import TargetCursor from "./components/Cursor";
import PricingPlans from "./components/PricingPlans"; // Pricing component
import { items } from "./components/CardNav";
import CardSwap, { Card } from './components/aboutUs'
import ProfileCard from './components/profileCard'
import Footer from './components/Footer'
import Admin from './components/admin'

const App = () => {
  const logo = "/path-to-logo.png";
  return (
    <div >
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
          <Route path="/company" element={
            <div style={{ height: '100vh', position: 'relative', width: '100%', overflow: 'hidden' }}>
              {/* First Profile Card positioned on the left */}
              <div style={{ position: 'absolute', left: '5%', top: '50%', transform: 'translateY(-50%)', zIndex: 20 }}>
                <ProfileCard
                  avatarUrl="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
                  name="Mohammad"
                  title="CEO & Founder"
                  handle="Mohammad"
                  status="Online"
                  contactText="Contact"
                  showUserInfo={true}
                  enableTilt={true}
                  onContactClick={() => window.open('https://www.linkedin.com/in/mohammad-hisham-24963b2ab/', '_blank')}
                />
              </div>

              {/* Second Profile Card positioned beside the first */}
              <div style={{ position: 'absolute', left: '35%', top: '50%', transform: 'translateY(-50%)', zIndex: 20 }}>
                <ProfileCard
                  avatarUrl="/zeyad.jpg"
                  name="Zeyad Zayaty"
                  title="Founder & CEO"
                  handle="zeyadzayaty"
                  status="Online"
                  contactText="Contact"
                  showUserInfo={true}
                  enableTilt={true}
                  onContactClick={() => window.open('https://www.linkedin.com/in/zeyad-z-225607276/', '_blank')}
                />
              </div>

              {/* CardSwap positioned on the bottom-right as before */}
              <CardSwap
                width={600}
                height={450}
                cardDistance={80}
                verticalDistance={100}
                delay={3000}
                pauseOnHover={false}
              >
                <Card>
                  <h3>Reliable</h3>
                  <p>Consistent performance and dependable solutions you can trust for your business needs.</p>
                </Card>
                <Card>
                  <h3>Customizable</h3>
                  <p>Tailored solutions that adapt to your unique requirements and grow with your business.</p>
                </Card>
                <Card>
                  <h3>Smooth</h3>
                  <p>Seamless user experience with intuitive design and fluid interactions.</p>
                </Card>
              </CardSwap>
            </div>
          } />
          <Route path="/" element={
            <main className="relative z-20">
              {/* Hero Section */}
              {/* Hero Section */}
              <section className="relative min-h-screen flex flex-col justify-center items-center text-center text-white">
                <div className="max-w-lg space-y-6">
                  <h1 className="text-6xl font-bold leading-tight">Welcome to MySite</h1>
                  <p className="text-xl text-gray-300">
                    We create immersive experiences with cutting-edge design and visuals.
                  </p>
                  <button className="btn-theme cursor-target">Get Started</button>
                </div>

                {/* Mouse Scroll Indicator */}
                <div className="absolute bottom-10 flex justify-center w-full">
                  <div className="w-[22px] h-[40px] border-2 border-white rounded-full flex justify-center items-start p-[4px]">
                    <div className="w-2 h-2 bg-white rounded-full animate-scroll"></div>
                  </div>
                </div>
              </section>


              {/* Pricing Plans Section */}
              <section>
                <PricingPlans />
              </section>
            </main>

          } />
          <Route path="/admin297_2" element={<Admin />} />
        </Routes>
      </BrowserRouter>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
