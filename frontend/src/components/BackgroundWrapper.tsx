import { useState, useEffect } from 'react';
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

      {/* Cursor - Only show on desktop */}
      {!isMobile && <TargetCursor spinDuration={2} hideDefaultCursor={true} />}

      {children}
    </div>
  );
};

export default BackgroundWrapper;
