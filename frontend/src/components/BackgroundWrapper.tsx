import { useState, useEffect } from 'react';
import LightRays from './background';
import TargetCursor from './Cursor';

const BackgroundWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [deviceOrientation, setDeviceOrientation] = useState({ alpha: 0, beta: 0, gamma: 0 });
  const [deviceMotion, setDeviceMotion] = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(isMobileDevice);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Device orientation and motion handlers for mobile
  useEffect(() => {
    if (!isMobile) return;

    const handleOrientationChange = (event: DeviceOrientationEvent) => {
      if (event.alpha !== null && event.beta !== null && event.gamma !== null) {
        setDeviceOrientation({
          alpha: event.alpha,
          beta: event.beta,
          gamma: event.gamma
        });
      }
    };

    const handleMotionChange = (event: DeviceMotionEvent) => {
      if (event.accelerationIncludingGravity) {
        const { x, y, z } = event.accelerationIncludingGravity;
        if (x !== null && y !== null && z !== null) {
          setDeviceMotion({ x, y, z });
        }
      }
    };

    // Request permission for iOS 13+ devices
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      (DeviceOrientationEvent as any).requestPermission()
        .then((response: string) => {
          if (response === 'granted') {
            window.addEventListener('deviceorientation', handleOrientationChange, true);
            window.addEventListener('devicemotion', handleMotionChange, true);
          }
        })
        .catch(console.error);
    } else {
      // For other browsers
      window.addEventListener('deviceorientation', handleOrientationChange, true);
      window.addEventListener('devicemotion', handleMotionChange, true);
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientationChange, true);
      window.removeEventListener('devicemotion', handleMotionChange, true);
    };
  }, [isMobile]);

  // Calculate ray direction based on device orientation and motion
  const getMobileRayDirection = () => {
    if (!isMobile) return { x: 0, y: 1 };

    // Convert device orientation to ray direction
    
    const beta = (deviceOrientation.beta || 0) * Math.PI / 180;
    const gamma = (deviceOrientation.gamma || 0) * Math.PI / 180;

    // Calculate ray direction based on device tilt
    const tiltX = Math.sin(gamma) * 0.5; // Left/right tilt affects X direction
    const tiltY = Math.sin(beta) * 0.5;  // Forward/back tilt affects Y direction

    // Add motion influence
    const motionX = Math.max(-0.3, Math.min(0.3, deviceMotion.x * 0.01));
    const motionY = Math.max(-0.3, Math.min(0.3, deviceMotion.y * 0.01));

    return {
      x: tiltX + motionX,
      y: 1 + tiltY + motionY
    };
  };

  const rayDirection = getMobileRayDirection();

  return (
    <div className="w-screen relative overflow-x-hidden">
      {/* Background */}
      <LightRays
        raysOrigin="top-center"
        raysColor={isMobile ? "#ffffff" : "#ffffffff"} // More visible on mobile
        raysSpeed={isMobile ? 1.2 : 0.5} // Faster on mobile
        lightSpread={isMobile ? 0.3 : 0.5} // More focused on mobile
        rayLength={isMobile ? 2.5 : 1.5} // Longer rays on mobile
        followMouse={!isMobile} // Disable mouse following on mobile
        mouseInfluence={isMobile ? 0 : 0.6}
        noiseAmount={isMobile ? 0.1 : 0} // Add some noise on mobile
        distortion={isMobile ? 0.05 : 0} // Add distortion on mobile
        className="rays-fullscreen"
        // Custom mobile ray direction
        customRayDirection={isMobile ? rayDirection : undefined}
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
