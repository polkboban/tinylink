import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Menu, X, ChevronDown, Link as LinkIcon, QrCode, BarChart2, FileText, 
  LayoutTemplate, Smartphone, CreditCard, Link2, Tags, Scan, ArrowRight,
  Sparkles, Cpu, CheckCircle2, Users, Package, Printer, Megaphone, Share2
} from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Simplified NavItem logic - stays white if at top, turns dark only on scroll
  const NavItem = ({ text, hasDropdown, isActive, onMouseEnter }) => (
    <button 
      onMouseEnter={onMouseEnter}
      className={`flex items-center ml-[1.2rem] py-6 gap-[0.2rem] text-[1.1rem] font-[500] leading-[24px] tracking-tight transition-colors ${
        isScrolled 
          ? (isActive ? 'text-[#0057FF]' : 'text-[#2A2E30] hover:text-[#0057FF]') 
          : 'text-white hover:text-gray-200'
      }`}
    >
      {text}
      {hasDropdown && (
        <ChevronDown 
          size={18} 
          strokeWidth={2.5} 
          className={`mt-[2px] transition-transform duration-300 ${isActive ? 'rotate-180' : 'opacity-75'}`} 
        />
      )}
    </button>
  );

  // --- REUSABLE DROPDOWN COMPONENTS ---
  
  // For Platform & AI features with icons
  const MegaMenuItem = ({ icon: Icon, title, description }) => (
    <Link to="#" className="flex items-start gap-4 group">
      <div className="mt-1 flex-shrink-0 bg-gray-100 p-2 rounded-lg group-hover:bg-blue-50 transition-colors">
        <Icon size={20} className="text-gray-700 group-hover:text-blue-600 transition-colors" />
      </div>
      <div>
        <h4 className="text-[15px] font-bold text-[#2A2E30] group-hover:text-blue-600 transition-colors">
          {title}
        </h4>
        <p className="text-[13px] text-gray-500 leading-tight mt-1 max-w-[250px]">
          {description}
        </p>
      </div>
    </Link>
  );

  // For descriptive lists (Resources)
  const DescriptiveLink = ({ title, description }) => (
    <Link to="#" className="group block mb-7">
      <h4 className="text-[15px] font-bold text-[#2A2E30] group-hover:text-blue-600 transition-colors">{title}</h4>
      <p className="text-[14px] text-gray-500 mt-1 max-w-[280px] leading-snug">{description}</p>
    </Link>
  );

  // For simple text lists (Help Center, Retail, etc)
  const SimpleLink = ({ text }) => (
    <Link to="#" className="text-[15px] font-bold text-[#2A2E30] hover:text-blue-600 transition-colors block mb-4">
      {text}
    </Link>
  );

  // For the Solutions Use Cases list
  const UseCaseLink = ({ icon: Icon, text }) => (
    <Link to="#" className="flex items-center gap-3 text-[15px] font-bold text-[#2A2E30] hover:text-blue-600 transition-colors mb-6 group">
      <Icon size={18} strokeWidth={1.5} className="text-gray-600 group-hover:text-blue-600" />
      {text}
    </Link>
  );

  // Section Header
  const SectionTitle = ({ text }) => (
    <h3 className="text-[12px] font-bold text-gray-500 mb-6 tracking-[0.1em] uppercase border-b border-gray-100 pb-3">
      {text}
    </h3>
  );

  // Right-side Promotional Card
  const PromoCard = () => (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm group cursor-pointer hover:shadow-md transition-shadow">
      <div className="h-40 bg-gradient-to-br from-[#1b1c3a] to-[#2b1f4d] p-4 flex items-center justify-center relative overflow-hidden">
        {/* Abstract UI representation for the card image */}
        <div className="bg-white rounded-lg p-3 w-[80%] h-full shadow-lg relative z-10 border border-purple-100">
          <div className="h-2 w-16 bg-blue-100 rounded mb-4"></div>
          <div className="h-4 w-3/4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-md mb-3"></div>
          <div className="space-y-2">
            <div className="h-1.5 w-full bg-gray-100 rounded"></div>
            <div className="h-1.5 w-5/6 bg-gray-100 rounded"></div>
          </div>
        </div>
        <div className="absolute top-4 right-4 w-12 h-12 bg-purple-500 rounded-full blur-xl opacity-40"></div>
        <div className="absolute bottom-4 left-4 w-16 h-16 bg-blue-500 rounded-full blur-xl opacity-40"></div>
      </div>
      <div className="p-6">
        <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-3">Bitly Products</p>
        <h4 className="text-[17px] font-bold text-[#2A2E30] leading-snug mb-4 group-hover:text-blue-600 transition-colors">
          Introducing Bitly Assist and Weekly Insights: Clearer Insights, Faster Decisions
        </h4>
        <div className="text-[14px] font-bold text-[#2A2E30] flex items-center gap-1 group-hover:text-blue-600 transition-colors">
          Read Now <ArrowRight size={16} />
        </div>
      </div>
    </div>
  );

  return (
    <header 
      onMouseLeave={() => setActiveDropdown(null)}
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
                className="h-[45px] w-auto transition-all duration-200" 
              />
            </Link>

            <nav className="hidden lg:flex items-center gap-[10px]">
              <div onMouseEnter={() => setActiveDropdown('platform')}>
                <NavItem text="Platform" hasDropdown={true} isActive={activeDropdown === 'platform'} />
              </div>
              <div onMouseEnter={() => setActiveDropdown('ai')}>
                <NavItem text="AI" hasDropdown={true} isActive={activeDropdown === 'ai'} />
              </div>
              <div onMouseEnter={() => setActiveDropdown('solutions')}>
                <NavItem text="Solutions" hasDropdown={true} isActive={activeDropdown === 'solutions'} />
              </div>
              <div onMouseEnter={() => setActiveDropdown(null)}>
                <NavItem text="Pricing" hasDropdown={false} />
              </div>
              <div onMouseEnter={() => setActiveDropdown('resources')}>
                <NavItem text="Resources" hasDropdown={true} isActive={activeDropdown === 'resources'} />
              </div>
            </nav>
          </div>

          <div className="hidden lg:flex items-center gap-[24px]">
            <Link 
              to="/login" 
              className={`text-[16px] font-[500] tracking-tight transition-colors ${
                isScrolled ? 'text-[#2A2E30] hover:text-[#0057FF]' : 'text-white hover:text-gray-200'
              }`}
            >
              Log in
            </Link>
            <div className="flex items-center gap-[12px]">
              <Link to="/pricing" className={`flex items-center justify-center rounded-[8px] border-[2px] px-[8px] py-[4px] text-[17px] font-[600] transition-all ${
                isScrolled ? 'border-[#0057FF] bg-transparent text-[#0057FF] hover:bg-[#F0F5FF]' : 'border-white bg-transparent text-white hover:bg-white/10'
              }`}>
                Get a Quote
              </Link>
              <Link to="/signup" className={`flex items-center justify-center rounded-[8px] border-[2px] px-[8px] py-[4px] text-[17px] font-[600] transition-all ${
                isScrolled ? 'border-[#0057FF] bg-[#0057FF] text-white hover:border-[#004BD6] hover:bg-[#004BD6]' : 'border-white bg-white text-[#001837] hover:bg-gray-100 hover:border-gray-100'
              }`}>
                Sign up Free
              </Link>
            </div>
          </div>

          <div className="flex items-center lg:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className={`p-2 transition-colors ${isScrolled ? 'text-[#2A2E30]' : 'text-white'}`}
            >
              {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>
      </div>

      {activeDropdown === 'platform' && (
        <div className="absolute top-[80px] left-0 w-full bg-white shadow-xl border-t border-gray-100 cursor-default">
          <div className="mx-auto w-full max-w-[1180px] flex">
            <div className="w-[65%] bg-white py-10 pr-12">
              <div className="mb-8">
                <SectionTitle text="Products" />
                <div className="grid grid-cols-2 gap-x-6 gap-y-8">
                  <MegaMenuItem icon={LinkIcon} title="URL Shortener" description="Customize, share and track links" />
                  <MegaMenuItem icon={QrCode} title="QR Code Generator" description="Dynamic solutions to fit every business need" />
                  <MegaMenuItem icon={BarChart2} title="Analytics" description="A central place to track and analyze performance" />
                  <MegaMenuItem icon={FileText} title="Pages" description="Mobile-friendly, no-code landing pages" />
                </div>
              </div>
              <div>
                <SectionTitle text="Features" />
                <div className="grid grid-cols-2 gap-x-6 gap-y-8">
                  <MegaMenuItem icon={LayoutTemplate} title="Link-in-bio" description="Curate and track links and content for social media profiles" />
                  <MegaMenuItem icon={Link2} title="Branded Links" description="Customize links with your brand's URL" />
                  <MegaMenuItem icon={Smartphone} title="Mobile Links" description="Short links for SMS messages" />
                  <MegaMenuItem icon={Tags} title="UTM Campaigns" description="Track links and QR Codes with UTM parameters" />
                  <MegaMenuItem icon={CreditCard} title="Digital Business Cards" description="Grow your network with virtual business cards" />
                  <MegaMenuItem icon={Scan} title="2D Barcodes" description="Add a GS1 Digital Link to QR Codes designed for packaging" />
                </div>
              </div>
            </div>
            <div className="w-[35%] bg-[#F9F9F8] py-10 pl-12 border-l border-gray-100">
              <div className="mb-10">
                <SectionTitle text="Integrations" />
                <div className="flex gap-4 mb-4">
                  <div className="group cursor-pointer">
                    <div className="w-[140px] h-[80px] bg-white border border-gray-200 rounded-lg flex items-center justify-center mb-3 group-hover:border-blue-500">
                      <span className="font-bold text-[#95bf47] tracking-tight"><span className="bg-[#95bf47] text-white p-1 rounded text-xs mr-1">S</span> shopify</span>
                    </div>
                    <p className="text-[13px] font-medium group-hover:text-blue-600">Bitly Shopify Integration</p>
                  </div>
                  <div className="group cursor-pointer">
                    <div className="w-[140px] h-[80px] bg-white border border-gray-200 rounded-lg flex items-center justify-center mb-3 group-hover:border-blue-500">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500 flex items-center justify-center">
                        <span className="text-white font-bold italic text-sm">Canva</span>
                      </div>
                    </div>
                    <p className="text-[13px] font-medium group-hover:text-blue-600">Bitly + Canva Integration</p>
                  </div>
                </div>
                <Link to="#" className="text-[14px] font-bold text-[#2A2E30] hover:text-blue-600 flex items-center gap-1">See all integrations <ArrowRight size={16} /></Link>
              </div>
              <div>
                <SectionTitle text="Discover More" />
                <div className="flex flex-col gap-4">
                  <Link to="#" className="text-[14px] font-bold text-[#2A2E30] hover:text-blue-600 flex items-center gap-1">API & Documentation <ArrowRight size={16} /></Link>
                  <Link to="#" className="text-[14px] font-bold text-[#2A2E30] hover:text-blue-600 flex items-center gap-1">Trust Center <ArrowRight size={16} /></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- AI DROPDOWN --- */}
      {activeDropdown === 'ai' && (
        <div className="absolute top-[80px] left-0 w-full bg-white shadow-xl border-t border-gray-100 cursor-default">
          <div className="mx-auto w-full max-w-[1180px] flex">
            <div className="w-[65%] bg-white py-10 pr-12">
              <div className="mb-12">
                <SectionTitle text="AI Features" />
                <div className="grid grid-cols-2 gap-x-6 gap-y-8">
                  <MegaMenuItem icon={Sparkles} title="Bitly Assist" description="AI-powered link and QR Code creation and analysis" />
                  <MegaMenuItem icon={Cpu} title="Bitly MCP" description="Connect to AI agents with the Model Context Protocol" />
                </div>
              </div>
              <div>
                <SectionTitle text="AI Resources" />
                <div className="grid grid-cols-2 gap-x-6">
                  <div>
                    <SimpleLink text="Help Center" />
                    <SimpleLink text="Trust Center" />
                  </div>
                  <div>
                    <SimpleLink text="Developers" />
                    <SimpleLink text="Integrations Marketplace" />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[35%] bg-[#F9F9F8] py-10 pl-12 border-l border-gray-100">
              <SectionTitle text="What's New" />
              <PromoCard />
            </div>
          </div>
        </div>
      )}

      {/* --- SOLUTIONS DROPDOWN --- */}
      {activeDropdown === 'solutions' && (
        <div className="absolute top-[80px] left-0 w-full bg-white shadow-xl border-t border-gray-100 cursor-default">
          <div className="mx-auto w-full max-w-[1180px] flex">
            <div className="w-[65%] bg-white py-10 pr-12">
              <div className="mb-8">
                <SectionTitle text="By Industry" />
                <div className="grid grid-cols-2 gap-x-6">
                  <div>
                    <SimpleLink text="Retail" />
                    <SimpleLink text="Hospitality" />
                    <SimpleLink text="Technology Software & Hardware" />
                    <SimpleLink text="Insurance" />
                    <SimpleLink text="Professional Services" />
                  </div>
                  <div>
                    <SimpleLink text="Consumer Packaged Goods" />
                    <SimpleLink text="Media & Entertainment" />
                    <SimpleLink text="Healthcare" />
                    <SimpleLink text="Financial Services" />
                    <SimpleLink text="Education" />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-x-6">
                <div>
                  <SectionTitle text="By Team" />
                  <SimpleLink text="Developers" />
                  <SimpleLink text="Marketing" />
                  <SimpleLink text="Customer Service" />
                </div>
                <div>
                  <SectionTitle text="By Business" />
                  <SimpleLink text="Small Business" />
                  <SimpleLink text="Midmarket" />
                  <SimpleLink text="Enterprise" />
                </div>
              </div>
            </div>
            <div className="w-[35%] bg-[#F9F9F8] py-10 pl-12 border-l border-gray-100">
              <SectionTitle text="Use Cases" />
              <div className="flex flex-col">
                <UseCaseLink icon={CheckCircle2} text="Order Confirmation" />
                <UseCaseLink icon={Users} text="Surveys and Feedback" />
                <UseCaseLink icon={Package} text="Product Packaging" />
                <UseCaseLink icon={Printer} text="Print Advertising" />
                <UseCaseLink icon={Megaphone} text="Digital Advertising" />
                <UseCaseLink icon={Share2} text="Content Sharing" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- RESOURCES DROPDOWN --- */}
      {activeDropdown === 'resources' && (
        <div className="absolute top-[80px] left-0 w-full bg-white shadow-xl border-t border-gray-100 cursor-default">
          <div className="mx-auto w-full max-w-[1180px] flex">
            <div className="w-[65%] bg-white py-10 pr-12">
              <div className="grid grid-cols-2 gap-x-6 mb-8">
                <div>
                  <SectionTitle text="Learn More" />
                  <DescriptiveLink title="Blog" description="Get the latest trends, tips, and best practices" />
                  <DescriptiveLink title="Guides & eBooks" description="Dig into in-depth resources and expert insights" />
                  <DescriptiveLink title="Videos & Webinars" description="Stay ahead with market insights and practical know-how" />
                </div>
                <div>
                  <SectionTitle text="Get Inspired" />
                  <DescriptiveLink title="Customer Stories" description="Explore success stories from Bitly customers" />
                  <DescriptiveLink title="QR Code Inspiration Gallery" description="Check out QR Code examples for every industry" />
                </div>
              </div>
              <div>
                <SectionTitle text="Find Answers" />
                <div className="grid grid-cols-2 gap-x-6">
                  <div>
                    <SimpleLink text="Help Center" />
                    <SimpleLink text="Trust Center" />
                  </div>
                  <div>
                    <SimpleLink text="Developers" />
                    <SimpleLink text="Integrations Marketplace" />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[35%] bg-[#F9F9F8] py-10 pl-12 border-l border-gray-100">
              <SectionTitle text="What's New" />
              <PromoCard />
            </div>
          </div>
        </div>
      )}

      {isMenuOpen && (
        <div className="absolute left-0 top-[80px] w-full flex-col gap-6 border-b border-gray-200 bg-white px-6 py-6 shadow-xl lg:hidden h-[calc(100vh-80px)] overflow-y-auto">
          <nav className="flex flex-col gap-6">
            <Link to="#" className="flex items-center justify-between text-[18px] font-[800] text-[#2A2E30]">
              Platform <ChevronDown size={22} strokeWidth={2.5} className="text-gray-400" />
            </Link>
            <Link to="#" className="flex items-center justify-between text-[18px] font-[800] text-[#2A2E30]">
              AI <ChevronDown size={22} strokeWidth={2.5} className="text-gray-400" />
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