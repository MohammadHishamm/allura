import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import LightRays from "./components/background";
import TargetCursor from "./components/Cursor";
import PricingPlans from "./components/PricingPlans";
import CardSwap, { Card } from './components/aboutUs'
import ProfileCard from './components/profileCard'
import Footer from './components/Footer'
import Admin from './components/admin'
import SignupForm from "./components/SignupForm";
import SigninForm from "./components/SigninForm";
import UserNavbar from "./components/UserNavbar";
import { UserProvider, useUser } from './contexts/UserContext';
import ModelViewer from "./components/ModelViewer";

const AppContent = () => {
  const location = useLocation();
  const isAdminPage = location.pathname === '/admin297_2';
  const { isLoggedIn } = useUser();
  
  return (
    <>
      <Routes>
        <Route path="/company" element={
          <div style={{ height: '100vh', position: 'relative', width: '100%', overflow: 'hidden' }} className="mt-30 mb-15">
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
                avatarUrl="/zeyad.jpeg"
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
          <main className="relative z-20 md:mt-8">
            {/* Hero Section */}
            <section className="relative min-h-screen flex flex-col md:flex-row justify-center items-center text-white md:px-20">
              {/* Text Left */}
              <div className="md:w-1/2 flex flex-col justify-center items-start space-y-6 z-20 ms-4 ms-6">
                <h1 className="text-6xl font-bold leading-tight">
                  Welcome to MySite
                </h1>
                <p className="text-xl text-gray-300">
                  We create immersive experiences with cutting-edge design and visuals.
                </p>
                {!isLoggedIn ? (
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button 
                      className="btn-theme cursor-target"
                      onClick={() => window.location.href = '/signup'}
                    >
                      Get Started
                    </button>
                    <button 
                      className="btn-theme-outline cursor-target"
                      onClick={() => window.location.href = '/signin'}
                    >
                      Sign In
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button 
                      className="btn-theme cursor-target"
                      onClick={() => window.location.href = '/company'}
                    >
                      View Company
                    </button>
                    <button 
                      className="btn-theme-outline cursor-target"
                      onClick={() => window.location.href = '/admin297_2'}
                    >
                      Admin Panel
                    </button>
                  </div>
                )}
              </div>

              {/* 3D Model Right */}
              <div className="md:w-1/2 w-full md:mt-0 md:flex hidden">
                <ModelViewer url="/models/gaming_desktop_pc_blend_file/scene.gltf" />
              </div>

              {/* Scroll Mouse Animation */}
              <div className="absolute bottom-20 justify-center w-full z-20 md:flex hidden">
                <div className="w-[30px] h-[50px] border-2 border-white rounded-full flex justify-center items-start p-[4px]">
                  <div className="w-2 h-2 bg-white rounded-full animate-scroll"></div>
                </div>
              </div>
            </section>
            {/* Pricing Plans Section */}
            <section className="py-20">
              <PricingPlans />
            </section>
          </main>
        } />
        <Route path="/admin297_2" element={<Admin />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/signin" element={<SigninForm />} />
      </Routes>
      
      {/* Footer - only show on non-admin pages */}
      {!isAdminPage && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <UserProvider>
      <div className="w-screen relative overflow-x-hidden">
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
        <UserNavbar />

        {/* Cursor */}
        <TargetCursor spinDuration={2} hideDefaultCursor={true} />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </div>
    </UserProvider>
  );
};

export default App;
