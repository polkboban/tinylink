import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import ShortenerAndQR from './components/ShortenerAndQR';
import BitlyConnectionsSection from './components/Connections';

function App() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

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
      } else {
        setError(data.error || 'Failed to shorten URL');
      }
    } catch (err) {
      console.error('Network error:', err);
      setError('Network error. Please check your connection or the server.');
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

    {/* Hero section */}
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
      />
    </section>
    <Footer />

    {/* Full-width light background section */}
    <div className="w-full bg-[#faf9f7] text-[#001837]">
      <BitlyConnectionsSection />
    </div>

    
  </div>
);

}

export default App;
