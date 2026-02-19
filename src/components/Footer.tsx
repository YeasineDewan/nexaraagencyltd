import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-16 sm:pt-24 pb-8 sm:pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-16 mb-16 sm:mb-20">
          {/* Company Info */}
          <div>
             <Link to="/" className="flex items-center gap-3 mb-8 group">
              <img 
                src="/logo.png" 
                alt="Nexara Agency Ltd" 
                className="h-14 w-auto transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="hidden text-primary font-extrabold text-2xl tracking-tight">NEXARA</div>
              <span className="font-extrabold text-2xl text-white tracking-tight">NEXARA <span className="text-primary font-bold text-lg">Agency Ltd.</span></span>
            </Link>
            <p className="text-gray-400 mb-8 leading-relaxed text-sm">
              One of the leading Digital Marketing agencies in Bangladesh. With our innovative strategies and results-oriented approach, we help businesses thrive in the digital world.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="text-gray-400 hover:text-primary transition-all p-2 rounded-full border border-white/10 hover:border-primary/50 bg-white/5">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Access */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-8">Quick Access</h3>
            <ul className="space-y-4">
              {[
                { name: 'Our Concerns & Products', path: '/concerns' },
                { name: 'Give Feedback', path: '/feedback' },
                { name: 'Artist/Model List', path: '/artists' },
                { name: 'Quotation Request', path: '/custom-quote' },
                { name: 'Blogs', path: '/blogs' },
                { name: 'Our Clients', path: '/portfolio' },
                { name: 'Ad Scope Tool', path: '#' }
              ].map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/20 group-hover:bg-primary transition-all"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Know More */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-8">Know More</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/career" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/20 group-hover:bg-primary transition-all"></span>
                  Career <span className="bg-primary text-[10px] text-white px-1.5 rounded-sm font-bold ml-1">Hiring</span>
                </Link>
              </li>
              {[
                { name: 'About Us', path: '/about' },
                { name: 'Community', path: '/community' },
                { name: 'Privacy Policy', path: '/privacy-policy' },
                { name: 'Company Profile', path: '/company-profile' },
                { name: 'Terms & Condition', path: '/terms-conditions' }
              ].map((link) => (
                 <li key={link.name}>
                  <Link to={link.path} className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/20 group-hover:bg-primary transition-all"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Contact */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-8">Quick Contact</h3>
            <ul className="space-y-5">
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-primary mt-0.5" />
                <div className="text-sm">
                  <p className="text-gray-300 font-medium">+8801797-242610</p>
                  <p className="text-gray-300 font-medium">+8801939-229988</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-primary mt-0.5" />
                <p className="text-sm text-gray-300 font-medium">info@nexara.agency</p>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary mt-0.5" />
                <p className="text-sm text-gray-400 leading-relaxed">
                  1st Floor, House: 21, Road: 3, Banani DOHS, Dhaka- 1206, Bangladesh
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-12">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex flex-wrap items-center gap-6 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
                    <span className="text-xs font-bold text-white uppercase tracking-widest mr-4">Registered Member:</span>
                    <img src="https://via.placeholder.com/100x40?text=BASIS" alt="BASIS" className="h-6" />
                    <img src="https://via.placeholder.com/100x40?text=e-CAB" alt="e-CAB" className="h-6" />
                    <img src="https://via.placeholder.com/100x40?text=E-CLUB" alt="E-CLUB" className="h-6" />
                </div>
                <div className="text-gray-500 text-xs text-center md:text-right">
                    <p>&copy; {new Date().getFullYear()} NEXARA Agency Ltd. All rights reserved.</p>
                </div>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
