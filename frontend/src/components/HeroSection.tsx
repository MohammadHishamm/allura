import { useAuth } from '../auth/auth';

const HeroSection = () => {
  const { isAuth, isAdmin } = useAuth();

  return (
    <section className="relative min-h-screen flex flex-col md:flex-row justify-center items-center text-white md:px-20 p-2">
      {/* Text Center */}
      <div className="md:w-1/2 flex flex-col justify-center items-center text-center space-y-6 z-20 px-4">
        <h1 className="text-6xl font-bold leading-tight title">
          Welcome to Allura
        </h1>
        <p className="text-xl text-gray-300">
          A software house agency that provides software development services to businesses. We are a team of experienced developers who are dedicated to providing the best possible software development services to our clients.
        </p>
        {!isAuth ? (
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              className="btn-purple-filled cursor-target"
              onClick={() => window.location.href = '/contact'}
            >
              Get Started
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
            {isAdmin && (
              <button
                className="btn-theme-outline cursor-target"
                onClick={() => window.location.href = '/admin297_2'}
              >
                Admin Panel
              </button>
            )}
          </div>
        )}
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
