import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';


export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow text-[#001837]' : 'bg-[#001837] text-white'
      }`}
    >
      <div className="max-w-[1080px] mx-auto px-6 py-[0.7rem] flex justify-between items-center">
        <img
          src="/BitlyLogo.svg"
          alt="Bitly logo"
          className={`h-7 md:h-11 ${scrolled ? '' : 'brightness-100'}`}
        />

        <nav className="hidden lg:flex items-center gap-7 text-[18px] font-medium">
          <a href="#" className="hover:underline font-semibold">Platform <ChevronDown className="inline " /></a>
          <a href="#" className="hover:underline font-semibold">Solutions <ChevronDown className="inline" /></a>
          <a href="#" className="hover:underline font-semibold">Pricing <ChevronDown className="inline" /></a>
          <a href="#" className="hover:underline font-semibold">Resources <ChevronDown className="inline" /></a>

          <button className={`px-4 py-1 border-2 rounded-[0.9rem] ml-7 ${
            scrolled ? 'border-[#001837] text-[#001837]' : 'border-white text-white'
          }`}>
            Log in
          </button>

          <button className={`ml-0 px-4 py-[0.31rem] font-semibold rounded-[0.9rem] ${
            scrolled
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-white text-[#001837] hover:bg-gray-100'
          }`}>
            Sign up Free
          </button>
        </nav>
      </div>
    </header>
  );
}
