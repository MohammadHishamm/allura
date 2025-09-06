import { useUser } from '../contexts/UserContext';
import ModelViewer from './ModelViewer';

const HeroSection = () => {
  const { isLoggedIn } = useUser();

  return (
    <section className="relative min-h-screen flex flex-col md:flex-row justify-center items-center text-white md:px-20 p-5">
      {/* Text Left */}
      <div className="md:w-1/2 flex flex-col justify-center items-start space-y-6 z-20 ms-4 ms-6">
        <h1 className="text-6xl font-bold leading-tight title">
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
              className="btn-theme2 cursor-target"
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
        <div className="w-[27px] h-[45px] border-2 border-white rounded-full flex justify-center items-start p-[4px]">
          <div className="w-1 h-3 bg-white rounded-full animate-scroll"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
