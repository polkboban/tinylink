import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const NavItem = ({ text, hasDropdown }) => (
    <button 
      className={`flex items-center ml-[1.2rem] gap-[0.2rem] text-[1.1rem] font-[500] leading-[24px] tracking-tight transition-colors ${
        isScrolled 
          ? 'text-[#2A2E30] hover:text-[#0057FF]' 
          : 'text-white hover:text-gray-200'
      }`}
    >
      {text}
      {hasDropdown && (
        <ChevronDown size={18} strokeWidth={2.5} className="mt-[2px] opacity-75" />
      )}
    </button>
  );

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled 
          ? 'bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)]' 
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
        <div className="flex h-[80px] items-center justify-between">
          
          <div className="flex items-center gap-[30px]">
            <Link to="/" className="flex items-center">
              <img 
                src="/BitlyLogo.svg" 
                alt="Bitly" 
                className={`h-[45px]  w-auto transition-all duration-200`} 
              />
            </Link>

            <nav className="hidden lg:flex items-center gap-[22px]">
              <NavItem text="Products" hasDropdown={true} />
              <NavItem text="Solutions" hasDropdown={true} />
              <NavItem text="Pricing" hasDropdown={false} />
              <NavItem text="Resources" hasDropdown={true} />
            </nav>
          </div>

          <div className="hidden lg:flex items-center gap-[24px]">
            <Link 
              to="/login" 
              className={`text-[16px] font-[500] tracking-tight transition-colors ${
                isScrolled 
                  ? 'text-[#2A2E30] hover:text-[#0057FF]' 
                  : 'text-white hover:text-gray-200'
              }`}
            >
              Log in
            </Link>
            
            <div className="flex items-center gap-[12px]">
              <Link 
                to="/pricing" 
                className={`flex items-center justify-center rounded-[8px] border-[2px] px-[8px] py-[4px] text-[17px] font-[600] transition-all ${
                  isScrolled 
                    ? 'border-[#0057FF] bg-transparent text-[#0057FF] hover:bg-[#F0F5FF]' 
                    : 'border-white bg-transparent text-white hover:bg-white/10'
                }`}
              >
                Get a Quote
              </Link>
              
              <Link 
                to="/signup" 
                className={`flex items-center justify-center rounded-[8px] border-[2px] px-[8px] py-[4px] text-[17px] font-[600] transition-all ${
                  isScrolled
                    ? 'border-[#0057FF] bg-[#0057FF] text-white hover:border-[#004BD6] hover:bg-[#004BD6]'
                    : 'border-white bg-white text-gray-800 hover:bg-gray-100 hover:border-gray-100 text-[#000000]'
                }`}
              >
                Sign up Free
              </Link>
            </div>
          </div>

          <div className="flex items-center lg:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className={`p-2 transition-colors ${
                isScrolled ? 'text-[#2A2E30] hover:text-[#0057FF]' : 'text-white hover:text-gray-200'
              }`}
            >
              {isMenuOpen ? <X size={32} strokeWidth={2.5} /> : <Menu size={32} strokeWidth={2.5} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="absolute left-0 top-[80px] w-full flex-col gap-6 border-b border-gray-200 bg-white px-6 py-6 shadow-xl lg:hidden h-[calc(100vh-80px)] overflow-y-auto">
          <nav className="flex flex-col gap-6">
            <Link to="#" className="flex items-center justify-between text-[18px] font-[800] text-[#2A2E30]">
              Products <ChevronDown size={22} strokeWidth={2.5} className="text-gray-400" />
            </Link>
            <Link to="#" className="flex items-center justify-between text-[18px] font-[800] text-[#2A2E30]">
              Solutions <ChevronDown size={22} strokeWidth={2.5} className="text-gray-400" />
            </Link>
            <Link to="/pricing" className="text-[18px] font-[800] text-[#2A2E30]">
              Pricing
            </Link>
            <Link to="#" className="flex items-center justify-between text-[18px] font-[800] text-[#2A2E30]">
              Resources <ChevronDown size={22} strokeWidth={2.5} className="text-gray-400" />
            </Link>
          </nav>
          
          <div className="my-6 h-px w-full bg-gray-200"></div>
          
          <div className="flex flex-col gap-4">
            <Link to="/login" className="text-[18px] font-[800] text-[#2A2E30]">
              Log in
            </Link>
            <Link to="/pricing" className="flex w-full items-center justify-center rounded-[4px] border-[2px] border-[#0057FF] bg-transparent py-[12px] text-[16px] font-[800] text-[#0057FF] hover:bg-[#F0F5FF]">
              Get a Quote
            </Link>
            <Link to="/signup" className="flex w-full items-center justify-center rounded-[4px] border-[2px] border-[#0057FF] bg-[#0057FF] py-[12px] text-[16px] font-[800] text-white hover:border-[#004BD6] hover:bg-[#004BD6]">
              Sign up Free
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}