import { Link } from 'react-router-dom';
import dashboardPreview from '../../assets/short-link-card.png';

export default function LandingPage() {
  return (
    <div className="flex flex-col w-full bg-[#F4F6FA] min-h-screen">
      
      <section className="relative w-full bg-[#0B101E] pt-[160px] pb-[160px] px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="mx-auto max-w-[1024px] text-center z-10">
          <h1 className="mx-auto text-[52px] leading-[1.1] font-[800] tracking-tight text-white sm:text-[64px] md:text-[76px]">
            Build stronger digital <span className="text-[#FF5A00]">connections</span>
          </h1>
          
          <p className="mx-auto mt-[24px] max-w-[760px] text-[18px] leading-[30px] font-[500] text-[#AAB0C0] sm:text-[22px] sm:leading-[34px]">
            Use our URL shortener, QR Codes, and Link-in-bio pages to engage your audience and connect them to the right information. Build, edit, and track everything inside the TinyLink platform.
          </p>
          
          <div className="mt-[40px] flex flex-col items-center justify-center gap-[16px] sm:flex-row sm:gap-[20px]">
            <Link 
              to="/signup" 
              className="flex h-[56px] w-full items-center justify-center rounded-[4px] bg-[#0057FF] px-[36px] text-[18px] font-[800] text-white transition-all hover:bg-[#004BD6] sm:w-auto"
            >
              Get Started for Free
            </Link>
            <Link 
              to="/pricing" 
              className="flex h-[56px] w-full items-center justify-center rounded-[4px] border-[2px] border-white bg-transparent px-[36px] text-[18px] font-[800] text-white transition-all hover:bg-white/10 sm:w-auto"
            >
              Get a Quote
            </Link>
          </div>
          
          <p className="mt-[24px] text-[15px] font-[600] text-[#AAB0C0]">
            No credit card required. Free plan available.
          </p>
        </div>
      </section>

      <section className="relative w-full px-4 sm:px-6 lg:px-8 mt-[-100px] z-20 pb-[120px]">
        <div className="mx-auto max-w-[1100px]">
          <img 
            src={dashboardPreview} 
            alt="TinyLink Dashboard Preview" 
            className="w-full h-auto rounded-[12px] shadow-[0_24px_60px_rgba(0,0,0,0.2)] border border-gray-200"
          />
        </div>
      </section>

    </div>
  );
}