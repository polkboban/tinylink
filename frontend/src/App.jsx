import { useState } from 'react';
import './App.css';

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
    } catch {
      setError('Network error');
    }
    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div style={{
      maxWidth: 400,
      margin: '3rem auto',
      padding: '2rem',
      borderRadius: 12,
      boxShadow: '0 2px 16px #0002',
      fontFamily: 'system-ui, sans-serif',
      background: '#fff'
    }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>🔗 TinyLink</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="url"
          value={url}
          onChange={e => setUrl(e.target.value)}
          placeholder="Paste your long URL here"
          required
          style={{
            width: '100%',
            padding: '0.75rem',
            fontSize: '1rem',
            borderRadius: 8,
            border: '1px solid #ccc',
            marginBottom: '1rem'
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '0.75rem',
            fontSize: '1rem',
            borderRadius: 8,
            border: 'none',
            background: '#007bff',
            color: '#fff',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Shortening...' : 'Shorten URL'}
        </button>
      </form>
      {shortUrl && (
        <div style={{
          marginTop: '2rem',
          padding: '1rem',
          background: '#f6f8fa',
          borderRadius: 8,
          textAlign: 'center'
        }}>
          <div>
            <strong>Shortened URL:</strong>
          </div>
          <a href={shortUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: '1.1rem', wordBreak: 'break-all' }}>
            {shortUrl}
          </a>
          <button
            onClick={handleCopy}
            style={{
              marginLeft: 8,
              padding: '0.3rem 0.7rem',
              fontSize: '0.95rem',
              borderRadius: 6,
              border: 'none',
              background: '#28a745',
              color: '#fff',
              cursor: 'pointer'
            }}
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      )}
      {error && (
        <div style={{
          marginTop: '1.5rem',
          color: '#d32f2f',
          background: '#fff0f0',
          padding: '0.75rem',
          borderRadius: 8,
          textAlign: 'center'
        }}>
          {error}
        </div>
      )}
      <div style={{ marginTop: '2rem', fontSize: '0.95rem', color: '#888', textAlign: 'center' }}>
        Powered by TinyLink & Supabase
      </div>
    </div>
  );
}

export default App;
