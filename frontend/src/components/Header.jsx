import { useEffect, useState } from 'react';

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
      <div className="max-w-[1280px] mx-auto px-6 py-4 flex justify-between items-center">
        <img
          src="/BitlyLogo.svg"
          alt="Bitly logo"
          className={`h-7 md:h-11 ${scrolled ? '' : 'brightness-200'}`}
        />


        <nav className="hidden lg:flex items-center gap-6 text-[15px] font-medium">
          <a href="#" className="hover:underline">Platform</a>
          <a href="#" className="hover:underline">Solutions</a>
          <a href="#" className="hover:underline">Pricing</a>
          <a href="#" className="hover:underline">Resources</a>

          <button className={`px-4 py-1 border rounded ${
            scrolled ? 'border-[#001837] text-[#001837]' : 'border-white text-white'
          }`}>
            Log in
          </button>

          <button className={`ml-2 px-4 py-1 font-semibold rounded ${
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
