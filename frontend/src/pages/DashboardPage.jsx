import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, 
  Link as LinkIcon, 
  QrCode, 
  Settings, 
  Plus, 
  LogOut, 
  BarChart2, 
  MousePointerClick,
  ChevronUp, 
  X 
} from 'lucide-react';
import { supabase } from '../supabase';
import ShortenerForm from '../components/ShortenerForm';

export default function DashboardPage() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');
  const [userId, setUserId] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false); 
  
  // Dashboard Data State
  const [links, setLinks] = useState([]);
  const [isLoadingLinks, setIsLoadingLinks] = useState(true);

  // Modal & Form State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newUrl, setNewUrl] = useState('');
  const [isShortening, setIsShortening] = useState(false);
  const [generatedShortUrl, setGeneratedShortUrl] = useState(null);
  const [formError, setFormError] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const getUserAndLinks = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email);
        setUserId(user.id);
        fetchUserLinks(user.id);
      } else {
        navigate('/login');
      }
    };
    getUserAndLinks();
  }, [navigate]);

  const fetchUserLinks = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/urls/user/${id}`);
      const result = await response.json();
      if (result.success) {
        setLinks(result.data);
      }
    } catch (error) {
      console.error("Failed to fetch links:", error);
    } finally {
      setIsLoadingLinks(false);
    }
  };

  const handleCreateLink = async (e) => {
    e.preventDefault();
    setIsShortening(true);
    setFormError(null);
    setCopied(false);

    try {
      const response = await fetch('http://localhost:5000/api/urls/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: newUrl, userId: userId }), 
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Failed to shorten URL');

      setGeneratedShortUrl(result.data.shortUrl);
      fetchUserLinks(userId); // Refresh the dashboard list

    } catch (err) {
      setFormError(err.message);
    } finally {
      setIsShortening(false);
    }
  };

  const handleCopy = () => {
    if (generatedShortUrl) {
      navigator.clipboard.writeText(generatedShortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  // --- STATS CALCULATIONS ---
  // These must sit inside the component but before the return statement
  const totalEngagements = links.reduce((sum, link) => sum + (link.click_count || 0), 0);
  const topLink = links.length > 0 
    ? links.reduce((prev, current) => ((prev.click_count || 0) > (current.click_count || 0) ? prev : current)) 
    : null;

  return (
    <div className="flex h-screen bg-[#f4f6fa] font-sans text-[#001837]">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col justify-between transition-all duration-300 z-20 relative">
        <div>
          <div className="h-16 flex items-center px-6 border-b border-gray-100">
            <img 
              src="/BitlyLogo.svg" 
              alt="TinyLink"
              className="mt-6 w-[6.2rem] cursor-pointer"
              onClick={() => navigate('/')}
            />
          </div>

          <div className="p-4 mt-6">
            <button 
              onClick={() => {
                setIsCreateModalOpen(true);
                setGeneratedShortUrl(null);
                setNewUrl('');
                setFormError(null);
              }}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-colors mb-8 shadow-md shadow-blue-200"
            >
              <Plus size={20} />
              Create new
            </button>

            <nav className="space-y-2">
              <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-blue-700 bg-blue-50 rounded-lg transition-colors">
                <Home size={18} /> Dashboard
              </a>
              <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
                <LinkIcon size={18} /> Links
              </a>
              <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
                <QrCode size={18} /> QR Codes
              </a>
              <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
                <Settings size={18} /> Settings
              </a>
            </nav>
          </div>
        </div>

        <div className="p-4 border-t border-gray-100 relative">
          {isProfileOpen && (
            <>
              <div className="fixed inset-0 z-30" onClick={() => setIsProfileOpen(false)}></div>
              <div className="absolute bottom-[calc(100%+8px)] left-4 w-[calc(100%-2rem)] bg-white border border-gray-100 rounded-xl shadow-xl py-2 z-40">
                <div className="px-4 py-3 border-b border-gray-100 mb-1">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Account</p>
                  <p className="text-sm font-medium text-gray-800 truncate">{userEmail}</p>
                </div>
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={18} /> Sign out
                </button>
              </div>
            </>
          )}

          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className={`w-full flex items-center justify-between px-2 py-2 rounded-lg transition-colors border ${
              isProfileOpen ? 'bg-gray-50 border-gray-200' : 'bg-white border-transparent hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-full text-white flex items-center justify-center font-bold flex-shrink-0 shadow-sm text-sm">
                {userEmail ? userEmail.charAt(0).toUpperCase() : 'U'}
              </div>
              <span className="text-sm font-medium text-gray-700 truncate">
                {userEmail ? userEmail.split('@')[0] : 'User'}
              </span>
            </div>
            <ChevronUp size={16} className={`text-gray-400 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 z-10">
          <h1 className="text-xl font-extrabold text-gray-800">Dashboard</h1>
        </header>

        <main className="flex-1 overflow-y-auto p-8 relative">
          <div className="max-w-5xl mx-auto space-y-8">
            
            {/* STATS CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-[1.5rem] shadow-sm border border-gray-100 relative overflow-hidden group">
                <div className="absolute -right-6 -top-6 bg-blue-50 w-24 h-24 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Total Engagements</h3>
                  <BarChart2 className="text-blue-500" size={20} />
                </div>
                <p className="text-5xl font-black text-gray-900">{totalEngagements}</p>
              </div>

              <div className="bg-white p-6 rounded-[1.5rem] shadow-sm border border-gray-100 relative overflow-hidden group">
                <div className="absolute -right-6 -top-6 bg-purple-50 w-24 h-24 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Top Performing Link</h3>
                  <MousePointerClick className="text-purple-500" size={20} />
                </div>
                <div className="flex flex-col justify-center h-[72px]">
                  {topLink && topLink.click_count > 0 ? (
                    <>
                      <p className="text-lg font-bold text-gray-800 truncate" title={topLink.original_url}>
                        {topLink.original_url}
                      </p>
                      <p className="text-sm text-purple-600 mt-1 font-bold">{topLink.click_count} clicks</p>
                    </>
                  ) : (
                    <>
                      <p className="text-lg font-bold text-gray-400">No data available</p>
                      <p className="text-xs text-gray-400 mt-1 font-medium">Shorten a link to see stats</p>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            {/* RECENT LINKS */}
            <div className="bg-white rounded-[1.5rem] shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <h2 className="text-lg font-extrabold text-gray-800">Recent Links</h2>
              </div>
              
              {isLoadingLinks ? (
                <div className="p-16 text-center text-gray-400 font-medium">Loading your links...</div>
              ) : links.length === 0 ? (
                <div className="p-16 text-center flex flex-col items-center justify-center">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6 border border-gray-100">
                    <LinkIcon className="text-gray-300" size={32} />
                  </div>
                  <h3 className="text-2xl font-extrabold text-gray-800 mb-2">You don't have any links yet</h3>
                  <p className="text-gray-500 mb-8 max-w-sm font-medium">
                    Shorten your first link to start tracking clicks, customizing QR codes, and analyzing performance.
                  </p>
                  <button 
                    onClick={() => setIsCreateModalOpen(true)}
                    className="bg-[#001837] hover:bg-gray-800 text-white font-bold py-3 px-8 rounded-xl transition-colors shadow-lg"
                  >
                    Shorten a link
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {links.map((link) => (
                    <div key={link.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                      <div className="overflow-hidden pr-4 max-w-[70%]">
                        <a 
                          href={`http://localhost:5000/${link.short_code}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="font-bold text-blue-600 text-lg truncate block mb-1 hover:underline"
                        >
                          http://localhost:5000/{link.short_code}
                        </a>
                        <p className="text-sm text-gray-500 truncate">{link.original_url}</p>
                        <p className="text-xs text-gray-400 mt-2">{new Date(link.created_at).toLocaleDateString()}</p>
                      </div>
                      <div className="flex items-center gap-4 flex-shrink-0">
                        <div className="text-right">
                          <p className="font-bold text-gray-800 text-xl">{link.click_count || 0}</p>
                          <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Clicks</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </main>
      </div>

      {/* MODAL OVERLAY */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl">
            <button 
              onClick={() => setIsCreateModalOpen(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors bg-black/20 p-2 rounded-full"
            >
              <X size={24} />
            </button>
            
            <ShortenerForm 
              url={newUrl}
              setUrl={setNewUrl}
              onSubmit={handleCreateLink}
              loading={isShortening}
              shortUrl={generatedShortUrl}
              error={formError}
              copied={copied}
              handleCopy={handleCopy}
            />
          </div>
        </div>
      )}

    </div>
  );
}