import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import ShortenerForm from './components/ShortenerForm';

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
      const res = await fetch('http://localhost:3000/api/shorten', {
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
    <div className="min-h-screen bg-[#001837] text-white font-sans overflow-x-hidden">
      <Header />
      <main className='pt-24'>
        <ShortenerForm
          url={url}
          setUrl={setUrl}
          onSubmit={handleSubmit}
          loading={loading}
          shortUrl={shortUrl}
          error={error}
          copied={copied}
          handleCopy={handleCopy}
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;
