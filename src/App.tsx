import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/ServicesWithPricing';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsCondition from './pages/TermsCondition';
import Login from './pages/Login';
import EmployeeLogin from './pages/EmployeeLogin';
import Register from './pages/Register';
import Career from './pages/Career';
import Blogs from './pages/Blogs';
import CustomQuote from './pages/CustomQuote';
import CaseStudy from './pages/CaseStudy';
import ViewCaseStudies from './pages/ViewCaseStudies';
import GiveFeedback from './pages/GiveFeedback';
import Community from './pages/Community';
import ConcernsProducts from './pages/ConcernsProducts';
import ArtistModelList from './pages/ArtistModelList';
import AdminDashboard from './pages/admin/Dashboard';
import ClientDashboard from './pages/client/Dashboard';
import EmployeeDashboard from './pages/employee/Dashboard';

// Service category pages
import DigitalMarketing from './pages/services/DigitalMarketing';
import WebDevelopment from './pages/services/WebDevelopment';
import CreativesSolution from './pages/services/CreativesSolution';
import VideoProduction from './pages/services/VideoProduction';

// Sub-service pages
import VSMM from './pages/services/subservices/VSMM';
import SEONext from './pages/services/subservices/VSMM'; // Reuse VSMM for now
import SocialMedia from './pages/services/subservices/VSMM';
import PPC from './pages/services/subservices/VSMM';
import LandingPage from './pages/services/subservices/LandingPage';
import Ecommerce from './pages/services/subservices/Ecommerce';
import PortfolioWebsite from './pages/services/subservices/PortfolioWebsite';
import NewsPortal from './pages/services/subservices/NewsPortal';
import Corporate from './pages/services/subservices/LandingPage';
import WebApp from './pages/services/subservices/Ecommerce';
import GoPack from './pages/services/subservices/VSMM';
import BrandIdentity from './pages/services/subservices/VSMM';
import GraphicDesign from './pages/services/subservices/VSMM';
import ContentCreation from './pages/services/subservices/VSMM';
import TVCOVC from './pages/services/subservices/TVCOVC';
import MicroOVC from './pages/services/subservices/TVCOVC';
import ExplainerVideo from './pages/services/subservices/TVCOVC';
import AnimationMotion from './pages/services/subservices/TVCOVC';
import CommercialPhotoshoot from './pages/services/subservices/TVCOVC';

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [location.pathname]);

  return null;
};

export function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/case-study" element={<CaseStudy />} />
          <Route path="/case-studies" element={<ViewCaseStudies />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/custom-quote" element={<CustomQuote />} />
          <Route path="/feedback" element={<GiveFeedback />} />
          <Route path="/community" element={<Community />} />
          <Route path="/concerns" element={<ConcernsProducts />} />
          <Route path="/artists" element={<ArtistModelList />} />
          <Route path="/company-profile" element={<About />} /> {/* Redirect to about for now */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsCondition />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/career" element={<Career />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/employee-login" element={<EmployeeLogin />} />
          
          {/* Service Category Pages */}
          <Route path="/services/digital-marketing" element={<DigitalMarketing />} />
          <Route path="/services/web-development" element={<WebDevelopment />} />
          <Route path="/services/creatives" element={<CreativesSolution />} />
          <Route path="/services/video-production" element={<VideoProduction />} />
          
          {/* Digital Marketing Sub-services */}
          <Route path="/services/digital-marketing/vsmm" element={<VSMM />} />
          <Route path="/services/digital-marketing/seo-next" element={<SEONext />} />
          <Route path="/services/digital-marketing/social-media" element={<SocialMedia />} />
          <Route path="/services/digital-marketing/ppc" element={<PPC />} />
          
          {/* Web Development Sub-services */}
          <Route path="/services/web-development/landing-page" element={<LandingPage />} />
          <Route path="/services/web-development/ecommerce" element={<Ecommerce />} />
          <Route path="/services/web-development/portfolio" element={<PortfolioWebsite />} />
          <Route path="/services/web-development/news-portal" element={<NewsPortal />} />
          <Route path="/services/web-development/corporate" element={<Corporate />} />
          <Route path="/services/web-development/web-app" element={<WebApp />} />
          
          {/* Creatives Sub-services */}
          <Route path="/services/creatives/gopack" element={<GoPack />} />
          <Route path="/services/creatives/brand-identity" element={<BrandIdentity />} />
          <Route path="/services/creatives/graphic-design" element={<GraphicDesign />} />
          <Route path="/services/creatives/content-creation" element={<ContentCreation />} />
          
          {/* Video Production Sub-services */}
          <Route path="/services/video-production/tvc-ovc" element={<TVCOVC />} />
          <Route path="/services/video-production/micro-ovc" element={<MicroOVC />} />
          <Route path="/services/video-production/explainer-video" element={<ExplainerVideo />} />
          <Route path="/services/video-production/animation-motion" element={<AnimationMotion />} />
          <Route path="/services/video-production/commercial-photoshoot" element={<CommercialPhotoshoot />} />
          
          {/* Protected Routes - Authentication checks are inside the components for simplicity in this demo */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/client/dashboard" element={<ClientDashboard />} />
          <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
