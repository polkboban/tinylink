import { useState } from 'react';

function App() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // Handles the URL submission for shortening
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setShortUrl('');
    setCopied(false);
    setLoading(true);

    try {
      // Make a POST request to the backend API to shorten the URL
      // NOTE: Replace 'http://localhost:3000/api/shorten' with your actual backend endpoint.
      const res = await fetch('http://localhost:3000/api/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();

      // Check if the API call was successful
      if (data.success) {
        setShortUrl(data.data.shortUrl); // Set the shortened URL
      } else {
        setError(data.error || 'Failed to shorten URL'); // Display error message
      }
    } catch (err) {
      console.error('Network error:', err);
      setError('Network error. Please check your connection or the server.');
    } finally {
      setLoading(false); // End loading state
    }
  };

  // Handles copying the shortened URL to the clipboard
  const handleCopy = () => {
    // Use document.execCommand('copy') for better compatibility within iframes
    const el = document.createElement('textarea');
    el.value = shortUrl;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

    setCopied(true); // Indicate that the URL has been copied
    // Reset the 'copied' state after a short delay
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #e0f7fa, #e8f5e9)', // Softer, calming gradient
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem', // Increased padding for better spacing on all devices
      fontFamily: '"Inter", sans-serif', // Using Inter font
      boxSizing: 'border-box', // Ensure padding doesn't add to total width
    }}>
      <div style={{
        backgroundColor: '#fff',
        padding: '2.5rem', // Increased padding for content
        borderRadius: '1.5rem', // Rounded corners
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)', // Enhanced shadow
        width: '100%',
        maxWidth: '32rem', // Slightly wider max-width for desktop
        border: '1px solid #e2e8f0',
        boxSizing: 'border-box',
      }}>
        {/* Application Title */}
        <h1 style={{
          fontSize: '2.5rem', // Larger text for impact
          fontWeight: '800', // Font-extrabold
          textAlign: 'center',
          color: '#2d3748', // Darker gray for better contrast
          marginBottom: '2.5rem', // Increased margin
          letterSpacing: '-0.03em', // Tighter tracking
        }}>
          🔗 TinyLink
        </h1>

        {/* URL Shortening Form */}
        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.23rem', // Slightly reduced gap for a compact look
        }}>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste your long URL here"
            required
            style={{
              width: '100%',
              padding: '1rem', // Increased padding for input
              fontSize: '1rem', // Adjusted font size
              border: '1px solid #cbd5e0',
              borderRadius: '0.625rem', // Slightly more rounded
              outline: 'none',
              transition: 'all 0.2s ease-in-out',
              boxShadow: 'none',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#4299e1'; // Blue-400 equivalent
              e.target.style.boxShadow = '0 0 0 3px rgba(66, 153, 225, 0.5)'; // Focus ring
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#cbd5e0';
              e.target.style.boxShadow = 'none';
            }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '1rem 1.5rem', // Increased padding
              borderRadius: '0.625rem',
              color: '#fff',
              fontWeight: '700', // Bolder font
              fontSize: '1.125rem', // Slightly larger text
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              background: loading ? '#90cdf4' : '#3182ce', // Lighter blue when loading, deeper blue otherwise
              transition: 'all 0.3s ease-in-out',
              opacity: loading ? 0.8 : 1,
              boxShadow: loading ? 'none' : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', // Subtle shadow
            }}
            onMouseOver={(e) => {
              if (!loading) {
                e.target.style.background = '#2b6cb0'; // Darker blue on hover
                e.target.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
              }
            }}
            onMouseOut={(e) => {
              if (!loading) {
                e.target.style.background = '#3182ce';
                e.target.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
              }
            }}
          >
            {loading ? 'Shortening...' : 'Shorten URL'}
          </button>
        </form>

        {/* Display Shortened URL */}
        {shortUrl && (
          <div style={{
            marginTop: '2.5rem',
            padding: '1.75rem', // Increased padding
            backgroundColor: '#e6fffa', // Light teal background
            borderRadius: '0.75rem',
            border: '1px solid #81e6d9', // Teal border
            textAlign: 'center',
            boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
          }}>
            <p style={{
              fontSize: '1.125rem',
              fontWeight: '600', // Font-semibold
              color: '#4a5568',
              marginBottom: '1rem', // Increased margin
            }}>
              Your TinyLink:
            </p>
            <div style={{
              display: 'flex',
              flexDirection: 'column', // Default to column for small screens
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem', // Gap between link and button
              flexWrap: 'wrap', // Allow items to wrap on smaller screens
            }}>
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: '1.25rem',
                  color: '#3182ce', // Blue-600 equivalent
                  fontWeight: '700',
                  wordBreak: 'break-all',
                  flexGrow: 1, // Allow link to take available space
                  minWidth: '0', // Allow text to shrink
                  transition: 'color 0.2s ease-in-out',
                  textDecoration: 'none',
                }}
                onMouseOver={(e) => e.target.style.color = '#2b6cb0'} // Darker blue on hover
                onMouseOut={(e) => e.target.style.color = '#3182ce'}
              >
                {shortUrl}
              </a>
              <button
                onClick={handleCopy}
                style={{
                  padding: '0.625rem 1.5rem', // Adjusted padding
                  borderRadius: '0.625rem',
                  color: '#fff',
                  fontWeight: '600',
                  fontSize: '1rem',
                  border: 'none',
                  cursor: 'pointer',
                  background: copied ? '#48bb78' : '#38a169', // Green-500 vs green-600
                  transition: 'all 0.3s ease-in-out',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', // Subtle shadow
                }}
                onMouseOver={(e) => {
                  if (!copied) {
                    e.target.style.background = '#2f855a'; // Darker green on hover
                    e.target.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
                  }
                }}
                onMouseOut={(e) => {
                  if (!copied) {
                    e.target.style.background = '#38a169';
                    e.target.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
                  }
                }}
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            {/* Added a responsive inline style for larger screens */}
            <style>
              {`
                @media (min-width: 640px) { /* Small breakpoint for typical mobile landscape/tablet */
                  .short-url-container-flex-row {
                    flex-direction: row !important;
                  }
                }
              `}
            </style>
             {/* Applying the class for the media query */}
            <div className="short-url-container-flex-row" style={{
              display: 'flex',
              flexDirection: 'column', // Default to column
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              flexWrap: 'wrap',
            }}>
              {/* ... (link and button elements moved here) ... */}
            </div>
          </div>
        )}

        {/* Error Message Display */}
        {error && (
          <div style={{
            marginTop: '2.5rem',
            padding: '1.25rem', // Adjusted padding
            backgroundColor: '#fff0f0', // Lighter red background
            border: '1px solid #fc8181', // Red border
            color: '#c53030', // Darker red text
            borderRadius: '0.625rem',
            textAlign: 'center',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          }}>
            <p style={{
              fontWeight: '700', // Bolder font
              fontSize: '1.125rem',
              marginBottom: '0.75rem',
            }}>
              Error:
            </p>
            <p style={{
              fontSize: '1rem',
            }}>
              {error}
            </p>
          </div>
        )}

        {/* Footer */}
        <div style={{
          marginTop: '3rem', // Increased margin
          fontSize: '0.875rem',
          color: '#718096', // Slightly darker gray
          textAlign: 'center',
        }}>
          Powered by <span style={{ fontWeight: '700', color: '#3182ce' }}>TinyLink</span> & <span style={{ fontWeight: '700', color: '#38a169' }}>Supabase</span>
        </div>
      </div>
    </div>
  );
}

export default App;
