import React, { useState, useEffect } from 'react';
import LightRays from './background';
import TargetCursor from './Cursor';

const BackgroundWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(isMobileDevice);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);


  return (
    <div className="w-screen relative overflow-x-hidden">
      {/* Background */}
      <LightRays
        raysOrigin="top-center"
        raysColor={isMobile ? "#ffffff" : "#ffffffff"} // More visible on mobile
        raysSpeed={isMobile ? 1.5 : 0.5} // Faster on mobile
        lightSpread={isMobile ? 0.2 : 0.5} // More focused on mobile
        rayLength={isMobile ? 3.0 : 1.5} // Longer rays on mobile
        followMouse={!isMobile} // Disable mouse following on mobile
        mouseInfluence={isMobile ? 0 : 0.6}
        noiseAmount={isMobile ? 0.15 : 0} // Add some noise on mobile
        distortion={isMobile ? 0.08 : 0} // Add distortion on mobile
        className="rays-fullscreen"
      />

      {/* Overlay */}
      <div className="fixed top-0 left-0 w-full h-full bg-black/20 z-10"></div>

      {/* Cursor - Only show on desktop */}
      {!isMobile && <TargetCursor spinDuration={2} hideDefaultCursor={true} />}

      {children}
    </div>
  );
};

export default BackgroundWrapper;
