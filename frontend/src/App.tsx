import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Footer from './components/Footer';
import Admin from './components/admin';
import SignupForm from "./components/SignupForm";
import SigninForm from "./components/SigninForm";
import UserNavbar from "./components/UserNavbar";
import { UserProvider } from './contexts/UserContext';
import HomePage from './components/HomePage';
import CompanyPage from './components/CompanyPage';
import BackgroundWrapper from './components/BackgroundWrapper';

const AppContent = () => {
  const location = useLocation();
  const isAdminPage = location.pathname === '/admin297_2';
  
  return (
    <>
      <Routes>
        <Route path="/company" element={<CompanyPage />} />
        <Route path="/" element={<HomePage />} />
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
      <BackgroundWrapper>
        {/* Navbar */}
        <UserNavbar />

        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </BackgroundWrapper>
    </UserProvider>
  );
};

export default App;
