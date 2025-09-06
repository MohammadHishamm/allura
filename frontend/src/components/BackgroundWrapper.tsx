import LightRays from './background';
import TargetCursor from './Cursor';

const BackgroundWrapper = ({ children }: { children: React.ReactNode }) => {
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

      {/* Cursor */}
      <TargetCursor spinDuration={2} hideDefaultCursor={true} />

      {children}
    </div>
  );
};

export default BackgroundWrapper;
