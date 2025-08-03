import { ArrowRight } from 'lucide-react';

export default function BitlyConnectionsSection() {
  return (
    <div className="w-full bg-[#f6f5ee] py-20 px-6">
  <div className="max-w-7xl mx-auto px-4 text-center text-[#001837]">
    <p className="uppercase text-sm font-semibold text-gray-500 tracking-wide mb-2">
      Great connections start with a click or scan
    </p>
    <h2 className="text-4xl font-extrabold mb-4">
      The Bitly Connections Platform
    </h2>
    <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
      All the products you need to build brand connections, manage links and QR Codes, and connect with audiences everywhere, in a single unified platform.
    </p>

    <div className="flex justify-center gap-4 mb-16 flex-wrap">
      <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-[1.2rem] transition">
        Get started for free {<ArrowRight className="inline" />}
      </button>
      <button className="border border-[#001837] text-[#001837] font-semibold px-6 py-3 rounded-[1.2rem] transition hover:bg-gray-100">
        Get a quote {<ArrowRight className="inline" />}
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-[130px] mt-10 max-w-4xl mx-auto">
      {/* Card 1 */}
      <div className="bg-[#eeeae3] rounded-[4rem] shadow border border-gray-200 p-6 flex flex-col items-center text-center border-black
                      transition-all duration-300 hover:shadow-xl hover:ring-2 hover:ring-blue-500 delay-100">
        <img src="/short-link-card.png" alt="URL Shortener" className="w-full max-w-xs mb-6" />
        <h3 className="text-[1.6rem] font-bold flex items-center gap-2 text-[#001837]">
          <img src="/link.svg" className="h-8" alt="" />
          URL Shortener
        </h3>
        <p className="text-sm text-gray-600 mt-2">
          A comprehensive solution to help make every point of connection between your content and your audience more powerful.
        </p>
      </div>

      {/* Card 2 */}
      <div className="bg-[#eeeae3] rounded-[4rem] shadow border border-gray-200 p-6 flex flex-col items-center text-center border-black
                      transition-all duration-300 hover:shadow-xl hover:ring-2 hover:ring-blue-500 delay-200">
        <img src="/qr-code-card.png" alt="QR Codes" className="w-full max-w-xs mb-6" />
        <h3 className="text-[1.6rem] font-bold flex items-center gap-2 text-[#001837]">
          <img src="/qr.svg" className="h-8" alt="" />
          QR Codes
        </h3>
        <p className="text-sm text-gray-600 mt-2">
          QR Code solutions for every customer, business and brand experience.
        </p>
      </div>
    </div>

  </div>
</div>
  );
} 