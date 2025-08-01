import { useEffect, useState } from 'react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow text-[#001837]' : 'bg-[#001837] text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1
          className={`text-3xl font-bold ${
            scrolled ? 'text-orange-500' : 'text-orange-400'
          }`}
        >
          bitly
        </h1>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <a href="#" className="hover:underline">Platform</a>
          <a href="#" className="hover:underline">Solutions</a>
          <a href="#" className="hover:underline">Pricing</a>
          <a href="#" className="hover:underline">Resources</a>

          <button className={`px-4 py-1 rounded border ${
            scrolled ? 'border-[#001837] text-[#001837]' : 'border-white text-white'
          } hover:bg-opacity-10`}>
            Log In
          </button>

          <button className={`ml-2 px-4 py-1 rounded font-semibold ${
            scrolled
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-white text-[#001837] hover:bg-gray-200'
          }`}>
            Sign up Free
          </button>
        </nav>
      </div>
    </header>
  );
}
