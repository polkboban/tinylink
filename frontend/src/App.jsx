import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import ShortenerAndQR from './components/ShortenerAndQR';
import BitlyConnectionsSection from './components/Connections';
import CustomizePage from './pages/CustomizePage'; 

function App() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [analytics, setAnalytics] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setShortUrl('');
    setCopied(false);
    setLoading(true);

    try {
      const res = await fetch('https://tny1ink.onrender.com/api/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      if (data.success) {
        setShortUrl(data.data.shortUrl);
        setAnalytics({
          shortCode: data.data.shortCode,
          originalUrl: data.data.originalUrl,
          createdAt: data.data.createdAt,
          expiresAt: data.data.expiresAt,
          clickCount: data.data.clickCount,
        });
      } else {
        setError(data.error || 'server error');
      }
    } catch (err) {
      console.error('network error:', err);
      setError('network error. please check your connection or the server.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="font-sans text-white">
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <section className="bg-[#001837] pt-20">
                <ShortenerAndQR
                  url={url}
                  setUrl={setUrl}
                  onSubmit={handleSubmit}
                  loading={loading}
                  shortUrl={shortUrl}
                  error={error}
                  copied={copied}
                  handleCopy={handleCopy}
                  analytics={analytics} // pass analytics data to ShortenerAndQR
                />
              </section>

              <div className="w-full bg-[#faf9f7] text-[#001837]">
                <BitlyConnectionsSection />
              </div>

              <Footer />
            </>
          }
        />

        <Route
          path="/customize"
          element={
            <>
              <section className="bg-gray-50 pt-14 min-h-screen text-[#001837]">
                <CustomizePage />
              </section>
              
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
