import CardSwap, { Card } from './aboutUs';

const CompanyPage = () => {
  return (
    <div style={{ height: '100vh', position: 'relative', width: '100%', overflow: 'hidden' }} className="mt-30 mb-15">
      {/* Mohammad Hisham Info Card */}
      <div style={{ position: 'absolute', left: '5%', top: '50%', transform: 'translateY(-50%)', zIndex: 20 }}>
        <div className="relative group">
          {/* Glassy Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-purple-500/20 rounded-2xl blur-sm"></div>
          
          {/* Card Container */}
          <div className="relative backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl w-80 hover:bg-white/15 transition-all duration-300 group-hover:scale-105">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                MH
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Mohammad Hisham</h3>
              <p className="text-purple-200 text-lg">CEO & Founder</p>
            </div>

            {/* Info Section */}
            <div className="space-y-4 mb-6">
              <div className="text-center">
                <p className="text-white/80 text-sm leading-relaxed">
                  Visionary leader and technical expert with a passion for creating innovative software solutions. 
                  Mohammad brings years of experience in full-stack development and strategic business planning.
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-center space-x-2 text-purple-200">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">Full-Stack Developer</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-purple-200">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">Strategic Planning</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-purple-200">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">Team Leadership</span>
                </div>
              </div>
            </div>

            {/* LinkedIn Button */}
            <div className="text-center">
              <button
                onClick={() => window.open('https://www.linkedin.com/in/mohammad-hisham-24963b2ab/', '_blank')}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                </svg>
                <span>Connect on LinkedIn</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Zeyad Zayaty Info Card */}
      <div style={{ position: 'absolute', left: '35%', top: '50%', transform: 'translateY(-50%)', zIndex: 20 }}>
        <div className="relative group">
          {/* Glassy Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-blue-500/20 rounded-2xl blur-sm"></div>
          
          {/* Card Container */}
          <div className="relative backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl w-80 hover:bg-white/15 transition-all duration-300 group-hover:scale-105">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                ZZ
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Zeyad Zayaty</h3>
              <p className="text-purple-200 text-lg">Founder & CEO</p>
            </div>

            {/* Info Section */}
            <div className="space-y-4 mb-6">
              <div className="text-center">
                <p className="text-white/80 text-sm leading-relaxed">
                  Creative entrepreneur and technology innovator with expertise in modern web technologies. 
                  Zeyad leads our development initiatives with a focus on user experience and cutting-edge solutions.
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-center space-x-2 text-purple-200">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">Frontend Specialist</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-purple-200">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">UI/UX Design</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-purple-200">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">Innovation Focus</span>
                </div>
              </div>
            </div>

            {/* LinkedIn Button */}
            <div className="text-center">
              <button
                onClick={() => window.open('https://www.linkedin.com/in/zeyad-z-225607276/', '_blank')}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                </svg>
                <span>Connect on LinkedIn</span>
              </button>
            </div>
          </div>
        </div>
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
  );
};

export default CompanyPage;
