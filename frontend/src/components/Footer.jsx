import React from "react";
import { Instagram, Facebook, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#031F39] text-white pt-16 pb-8 border-t-[3px] border-[#ff7300] font-sans">
      <div className="max-w-[1400px] mx-auto px-8">
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16">
          
          <div>
            <h3 className="text-[#ff7300] font-bold mb-5">Why Bitly?</h3>
            <ul className="space-y-3 text-[13px] text-gray-200 font-medium">
              <li><a href="#" className="hover:text-white transition">Integrations & API</a></li>
              <li><a href="#" className="hover:text-white transition">Enterprise Class</a></li>
              <li><a href="#" className="hover:text-white transition">Pricing</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-[#ff7300] font-bold mb-5">Products</h3>
            <ul className="space-y-3 text-[13px] text-gray-200 font-medium mb-8">
              <li><a href="#" className="hover:text-white transition">URL Shortener</a></li>
              <li><a href="#" className="hover:text-white transition">QR Code Generator</a></li>
              <li><a href="#" className="hover:text-white transition">2D Barcodes</a></li>
              <li><a href="#" className="hover:text-white transition">Analytics</a></li>
              <li><a href="#" className="hover:text-white transition">Pages</a></li>
            </ul>

            <h3 className="text-[#ff7300] font-bold mb-5">Features</h3>
            <ul className="space-y-3 text-[13px] text-gray-200 font-medium">
              <li><a href="#" className="hover:text-white transition">Link-in-bio</a></li>
              <li><a href="#" className="hover:text-white transition">Branded Links</a></li>
              <li><a href="#" className="hover:text-white transition">Mobile Links</a></li>
              <li><a href="#" className="hover:text-white transition">UTM Campaigns</a></li>
              <li><a href="#" className="hover:text-white transition">Digital Business Cards</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-[#ff7300] font-bold mb-5">Solutions</h3>
            <ul className="space-y-3 text-[13px] text-gray-200 font-medium">
              <li><a href="#" className="hover:text-white transition">Retail</a></li>
              <li><a href="#" className="hover:text-white transition">Consumer Packaged Goods</a></li>
              <li><a href="#" className="hover:text-white transition">Hospitality</a></li>
              <li><a href="#" className="hover:text-white transition">Media & Entertainment</a></li>
              <li><a href="#" className="hover:text-white transition">Tech Software & Hardware</a></li>
              <li><a href="#" className="hover:text-white transition">Healthcare</a></li>
              <li><a href="#" className="hover:text-white transition">Insurance</a></li>
              <li><a href="#" className="hover:text-white transition">Financial Services</a></li>
              <li><a href="#" className="hover:text-white transition">Professional Services</a></li>
              <li><a href="#" className="hover:text-white transition">Education</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-[#ff7300] font-bold mb-5">Resources</h3>
            <ul className="space-y-3 text-[13px] text-gray-200 font-medium">
              <li><a href="#" className="hover:text-white transition">Blog</a></li>
              <li><a href="#" className="hover:text-white transition">Guides & eBooks</a></li>
              <li><a href="#" className="hover:text-white transition">Videos & Webinars</a></li>
              <li><a href="#" className="hover:text-white transition">Customer Stories</a></li>
              <li><a href="#" className="hover:text-white transition">QR Code Inspiration Gallery</a></li>
              <li><a href="#" className="hover:text-white transition">Developers</a></li>
              <li><a href="#" className="hover:text-white transition">Apps and Integrations</a></li>
              <li><a href="#" className="hover:text-white transition">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition">Trust Center</a></li>
              <li><a href="#" className="hover:text-white transition">Security Center</a></li>
              <li><a href="#" className="hover:text-white transition">Browser Extension</a></li>
              <li><a href="#" className="hover:text-white transition">Mobile App</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-[#ff7300] font-bold mb-5">Legal</h3>
            <ul className="space-y-3 text-[13px] text-gray-200 font-medium">
              <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition">Acceptable Use Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Code of Conduct</a></li>
              <li><a href="#" className="hover:text-white transition">Transparency Report</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-[#ff7300] font-bold mb-5">Company</h3>
            <ul className="space-y-3 text-[13px] text-gray-200 font-medium">
              <li><a href="#" className="hover:text-white transition">About Bitly</a></li>
              <li><a href="#" className="hover:text-white transition">Careers</a></li>
              <li><a href="#" className="hover:text-white transition">Inclusion at Bitly</a></li>
              <li><a href="#" className="hover:text-white transition">Partners</a></li>
              <li><a href="#" className="hover:text-white transition">Press</a></li>
              <li><a href="#" className="hover:text-white transition">Contact</a></li>
              <li><a href="#" className="hover:text-white transition">Reviews</a></li>
              <li><a href="#" className="hover:text-white transition">Accessibility Report</a></li>
              <li><a href="#" className="hover:text-white transition">Accessibility Statement</a></li>
            </ul>
          </div>

        </div>

        <div className="w-full h-px bg-[#031F39] mb-8"></div>

        <div className="flex flex-col xl:flex-row items-center justify-between gap-6">
          
          <div className="flex-shrink-0">
            <img src="/BitlyLogo.svg" alt="Bitly Logo" className="h-10" />
          </div>

          <div className="flex flex-col items-center xl:items-start text-center xl:text-left">
            <p className="text-[13px] text-gray-200 font-medium mb-1">
              © 2025 TnyLnk | Handmade in New York, Denver, Berlin, and all over the world. Nah I'm kidding.
            </p>
            <a href="https://github.com/polkboban" target="_blank" rel="noopener noreferrer" className="text-[13px] text-gray-400 hover:text-white transition">
              github.com/polkboban
            </a>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-8">
            
            <div className="flex items-center gap-5">
              <a href="#" className="text-white hover:text-gray-300 transition" aria-label="Twitter">
                <Twitter size={20} strokeWidth={1.5} />
              </a>
              <a href="#" className="text-white hover:text-gray-300 transition" aria-label="Instagram">
                <Instagram size={20} strokeWidth={1.5} />
              </a>
              <a href="#" className="text-white hover:text-gray-300 transition" aria-label="Facebook">
                <Facebook size={20} strokeWidth={1.5} />
              </a>
              <a href="#" className="text-white hover:text-gray-300 transition" aria-label="LinkedIn">
                <Linkedin size={20} strokeWidth={1.5} />
              </a>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex flex-col items-center justify-center w-12 h-14 bg-[#1b3a4f] rounded border border-[#2b4c63] text-center">
                <div className="w-6 h-4 bg-blue-600 rounded-sm mb-1 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <span className="text-[7px] font-bold text-white leading-tight">GDPR<br/><span className="text-[5px] font-normal text-gray-300">COMPLIANT</span></span>
              </div>
              
              <div className="flex flex-col items-center justify-center w-12 h-14 bg-[#1b3a4f] rounded border border-[#2b4c63] text-center">
                <div className="w-6 h-4 bg-blue-500 rounded-sm mb-1 flex items-center justify-center">
                  <div className="w-2 h-3 bg-white rounded-sm"></div>
                </div>
                <span className="text-[7px] font-bold text-white leading-tight">CCPA<br/><span className="text-[5px] font-normal text-gray-300">COMPLIANT</span></span>
              </div>
              
              <div className="flex flex-col items-center justify-center w-12 h-14 bg-[#1b3a4f] rounded border border-[#2b4c63] text-center">
                <div className="w-6 h-6 rounded-full border border-blue-400 mb-1 flex items-center justify-center">
                  <span className="text-[6px] text-blue-300">AICPA</span>
                </div>
                <span className="text-[7px] font-bold text-white leading-none mb-[2px]">SOC 2</span>
                <span className="text-[5px] text-gray-300 leading-none">TYPE 2</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
}