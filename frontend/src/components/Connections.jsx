import React from 'react';

export default function BitlyClone() {
  return (
    <div className="text-on-surface selection:bg-primary-fixed selection:text-on-primary-fixed font-body bg-background min-h-screen">
      {/* Embedded Custom Styles */}
      <style dangerouslySetInnerHTML={{__html: `
        .font-body { font-family: 'Inter', sans-serif; }
        h1, h2, h3, h4, .font-plus-jakarta-sans { font-family: 'Plus Jakarta Sans', sans-serif; }
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        
        /* Transition for the content panel sliding up */
        .card-content {
            transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* Adjusted hover transform values to keep the panel lower as requested */
        .card-group:hover .card-content {
            transform: translateY(35%);
        }
        
        @media (min-width: 768px) {
            .card-group:hover .card-content {
                transform: translateY(10%);
            }
        }
      `}} />

      <main>
        {/* The Bitly Connections Platform Section */}
        <section className="py-24 px-6 overflow-hidden bg-[#f6f0ea]">
          <div className="max-w-7xl mx-auto text-center mb-16">
            {/* Eyebrow */}
            <span className="inline-block text-[15px] sm:text-s font-bold tracking-[0.2em] text-outline mb-4 font-label uppercase">
              Great connections start with a click or scan
            </span>
            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-5xl font-extrabold text-bitly-navy tracking-tight mb-6 leading-[1.1]">
              The Bitly Connections Platform
            </h1>
            {/* Description */}
            <p className="text-lg md:text-2xl text-stone-600 max-w-5xl mx-auto mb-10 leading-relaxed font-body">
              All the products you need to build brand connections, manage links and QR Codes, and connect with audiences everywhere, in a single unified platform.
            </p>
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="group flex items-center gap-2 bg-bitly-blue text-[1.3rem] text-white px-5 py-3.5 rounded-[15px] font-bold text-base transition-all hover:shadow-lg active:scale-95">
                Get started for free
                <span className="material-symbols-outlined text-[2rem]" data-icon="arrow_forward">arrow_forward</span>
              </button>
              <button className="group flex items-center gap-2 border-2 border-bitly-blue text-[1.3rem] text-bitly-blue px-5 py-3.5 rounded-[15px] font-bold text-base transition-all hover:bg-white/40 active:scale-95">
                Get a quote
                <span className="material-symbols-outlined text-[2rem]" data-icon="arrow_forward">arrow_forward</span>
              </button>
            </div>
          </div>
          
          {/* Cards Container */}
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* URL Shortener Card */}
            <div className="card-group relative h-[550px] bg-[#eae3dc] rounded-[22px] overflow-hidden border border-gray-500/60 shadow-sm cursor-pointer group">
              <div className="absolute inset-0 h-[65%] flex items-center justify-center p-2">
                <img alt="URL Shortener" className="max-w-full max-h-full object-contain" src="/short-link-card.png"/>
              </div>
              <div className="card-content absolute bottom-0 left-0 right-0 h-[100%] bg-white rounded-[22px] translate-y-[65%] p-8 flex flex-col border-t border-gray-500/80 shadow-[0_-8px_30px_rgba(0,0,0,0.04)]">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-3xl text-orange-600" data-icon="link">link</span>
                    <h3 className="text-3xl font-extrabold text-bitly-navy">URL Shortener</h3>
                  </div>
                  <span className="material-symbols-outlined text-3xl text-bitly-navy group-hover:rotate-180 transition-transform duration-500" data-icon="arrow_upward">arrow_upward</span>
                </div>
                <p className="text-stone-600 font-semibold text-[0.9rem] mb-4 leading-relaxed">
                  A comprehensive solution to help make every point of connection between your content and your audience more powerful.
                </p>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 flex-grow">
                  <h4 className="font-bold text-bitly-navy mb-4">Popular URL Shortening Features</h4>
                  <ul className="space-y-3 mb-3">
                    <li className="flex items-center gap-3 text-sm font-medium text-bitly-navy">
                      <span className="material-symbols-outlined text-orange-600 text-lg font-bold" data-icon="check_circle">check_circle</span>
                      URL shortening at scale
                    </li>
                    <li className="flex items-center gap-3 text-sm font-medium text-bitly-navy">
                      <span className="material-symbols-outlined text-orange-600 text-lg font-bold" data-icon="check_circle">check_circle</span>
                      AI-generated custom domains
                    </li>
                    <li className="flex items-center gap-3 text-sm font-medium text-bitly-navy">
                      <span className="material-symbols-outlined text-orange-600 text-lg font-bold" data-icon="check_circle">check_circle</span>
                      URL redirects
                    </li>
                    <li className="flex items-center gap-3 text-sm font-medium text-bitly-navy">
                      <span className="material-symbols-outlined text-orange-600 text-lg font-bold" data-icon="check_circle">check_circle</span>
                      Advanced analytics & tracking
                    </li>
                  </ul>
                  <div className="space-y-3 mx-[-10px]">
                    <button className="w-full py-3 bg-bitly-blue text-white rounded-[8px] font-bold text-[1rem]">Get started for free</button>
                    <button className="w-full py-2 border border-bitly-blue border-[2px] text-bitly-blue rounded-[8px] font-bold text-[1rem] hover:bg-stone-50">Learn more</button>
                  </div>
                </div>
              </div>
            </div>

            {/* QR Codes Card */}
            <div className="card-group relative h-[550px] bg-[#eae3dc] rounded-[22px] overflow-hidden border border-gray-500/60 shadow-sm cursor-pointer group">
              <div className="absolute inset-0 h-[65%]  flex items-center justify-center p-2">
                <img alt="QR Codes" className="max-w-full max-h-full object-contain" src="/qr-code-card.png"/>
              </div>
              <div className="card-content absolute bottom-0 left-0 right-0 h-[100%] bg-white rounded-[22px] translate-y-[65%] p-8 flex flex-col border-t border-gray-500/80 shadow-[0_-8px_30px_rgba(0,0,0,0.04)]">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-3xl text-orange-600" data-icon="qr_code_2">qr_code_2</span>
                    <h3 className="text-3xl font-extrabold text-bitly-navy">QR Codes</h3>
                  </div>
                  <span className="material-symbols-outlined text-3xl text-bitly-navy group-hover:rotate-180 transition-transform duration-500" data-icon="arrow_upward">arrow_upward</span>
                </div>
                <p className="text-stone-600 font-semibold text-[0.9rem] mb-9 leading-relaxed">
                  QR Code solutions for every customer, business and brand experience. 
                </p>
                {/* Hidden Features (Revealed on Hover) */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 flex-grow">
                  <h4 className="font-bold text-bitly-navy mb-5">Popular QR Code Features</h4>
                  <ul className="space-y-3 mb-12">
                    <li className="flex items-center gap-3 text-sm font-medium text-bitly-navy">
                      <span className="material-symbols-outlined text-orange-600 text-lg font-bold" data-icon="check_circle">check_circle</span>
                      Custom branded designs
                    </li>
                    <li className="flex items-center gap-3 text-sm font-medium text-bitly-navy">
                      <span className="material-symbols-outlined text-orange-600 text-lg font-bold" data-icon="check_circle">check_circle</span>
                      Dynamic QR destinations
                    </li>
                    <li className="flex items-center gap-3 text-sm font-medium text-bitly-navy">
                      <span className="material-symbols-outlined text-orange-600 text-lg font-bold" data-icon="check_circle">check_circle</span>
                      Real-time scan tracking
                    </li>
                  </ul>
                  <div className="space-y-3 mx-[-10px]">
                    <button className="w-full py-3 bg-bitly-blue text-white rounded-[8px] font-bold text-[1rem]">Get started for free</button>
                    <button className="w-full py-2 border border-bitly-blue border-[2px] text-bitly-blue rounded-[8px] font-bold text-[1rem] hover:bg-stone-50">Learn more</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Landing Pages Card */}
            <div className="card-group relative h-[550px] bg-[#eae3dc] rounded-[22px] overflow-hidden border border-gray-500/60 shadow-sm cursor-pointer group">
              <div className="absolute inset-0 h-[65%] flex items-center justify-center p-2">
                <img alt="Landing Pages" className="max-w-full max-h-full object-contain" src="pages-card.png"/>
              </div>
              <div className="card-content absolute bottom-0 left-0 right-0 h-[100%] bg-white rounded-[22px] translate-y-[65%] p-8 flex flex-col border-t border-gray-500/80 shadow-[0_-8px_30px_rgba(0,0,0,0.04)]">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-3xl text-orange-600" data-icon="layers">layers</span>
                    <h3 className="text-3xl font-extrabold text-bitly-navy">Landing Pages</h3>
                  </div>
                  <span className="material-symbols-outlined text-3xl text-bitly-navy group-hover:rotate-180 transition-transform duration-500" data-icon="arrow_upward">arrow_upward</span>
                </div>
                <p className="text-stone-600 font-semibold text-[0.9rem] mb-7 leading-relaxed">
                  Bitly Pages helps you create engaging, mobile-optimized landing pages in minutes.
                </p>
                {/* Hidden Features (Revealed on Hover) */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 flex-grow">
                  <h4 className="font-bold text-bitly-navy mb-4">Popular Page Features</h4>
                  <ul className="space-y-3 mb-9">
                    <li className="flex items-center gap-3 text-sm font-medium text-bitly-navy">
                      <span className="material-symbols-outlined text-orange-600 text-lg font-bold" data-icon="check_circle">check_circle</span>
                      Drag-and-drop builder
                    </li>
                    <li className="flex items-center gap-3 text-sm font-medium text-bitly-navy">
                      <span className="material-symbols-outlined text-orange-600 text-lg font-bold" data-icon="check_circle">check_circle</span>
                      Link-in-bio optimized
                    </li>
                    <li className="flex items-center gap-3 text-sm font-medium text-bitly-navy">
                      <span className="material-symbols-outlined text-orange-600 text-lg font-bold" data-icon="check_circle">check_circle</span>
                      Conversion analytics
                    </li>
                  </ul>
                  <div className="space-y-3 mx-[-10px]">
                    <button className="w-full py-3 bg-bitly-blue text-white rounded-[8px] font-bold text-[1rem]">Get started for free</button>
                    <button className="w-full py-2 border border-bitly-blue border-[2px] text-bitly-blue rounded-[8px] font-bold text-[1rem] hover:bg-stone-50">Learn more</button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>
      </main>
      <div>
        <section className="relative bg-[#031F39] pt-24 px-6 overflow-hidden">
          <div className="absolute top-12 left-[15%] text-[#3b5b6d] rotate-12">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 0L13.5 10.5L24 12L13.5 13.5L12 24L10.5 13.5L0 12L10.5 10.5L12 0Z" /></svg>
          </div>
          <div className="absolute top-40 left-[25%] text-[#3b5b6d] w-10 h-10 -rotate-12">
             <svg width="100%" height="100%" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 0L13.5 10.5L24 12L13.5 13.5L12 24L10.5 13.5L0 12L10.5 10.5L12 0Z" /></svg>
          </div>
          <div className="absolute top-20 right-[20%] text-[#3b5b6d] w-8 h-8 rotate-45">
             <svg width="100%" height="100%" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 0L13.5 10.5L24 12L13.5 13.5L12 24L10.5 13.5L0 12L10.5 10.5L12 0Z" /></svg>
          </div>

          <div className="max-w-3xl mx-auto text-center relative z-10">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#ff7300] tracking-tight mb-6">
              More than a link shortener
            </h2>
            <p className="text-lg md:text-xl text-white mb-10 leading-relaxed font-body">
              Knowing how your clicks and scans are performing should be as easy as making them. Track, analyze, and optimize all your connections in one place.
            </p>
            <button className="group inline-flex items-center gap-2 border-2 border-white text-white px-8 py-3.5 rounded-full font-bold text-base transition-all hover:bg-white hover:text-bitly-navy active:scale-95">
              Get started for free
              <span className="material-symbols-outlined text-xl transition-transform group-hover:translate-x-1" data-icon="arrow_forward">arrow_forward</span>
            </button>
          </div>

          <div className="max-w-5xl mx-auto mt-2 relative z-10 flex justify-center translate-y-1">
            <img 
              alt="Bitly Dashboard Preview" 
              className="w-full h-auto object-cover rounded-t-xl md:rounded-t-3xl" 
              src="https://mkt-static.bitly.com/static/1775658203/pages/wp-content/uploads/2024/04/banner-footer-bitly_desktop.png" /* <--- ADD YOUR IMAGE URL OR PATH HERE */
            />
          </div>
        </section>
      
    </div>
    </div>
  );
}