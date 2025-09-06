import ProfileCard from './profileCard';
import CardSwap, { Card } from './aboutUs';

const CompanyPage = () => {
  return (
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
  );
};

export default CompanyPage;
