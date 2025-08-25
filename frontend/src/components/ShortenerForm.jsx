import { ArrowRight } from 'lucide-react';

export default function ShortenerForm({
  url,
  setUrl,
  onSubmit,
  loading,
  shortUrl,
  error,
  copied,
  handleCopy,
}) {
  return (
        <form
          onSubmit={onSubmit}
          className="bg-white p-8 rounded-[2rem] shadow-xl text-left max-w-4xl mx-auto w-full text-[#001837]"
        >
          <h3 className="text-3xl font-extrabold mb-2 mt-2">Shorten a long link</h3>
          <p className="text-sm text-gray-600 mb-4">No credit card required. duh</p>

          <label htmlFor="url" className="block font-bold mb-2 mt-[3.8rem] text-lg">
            Paste your long link here
          </label>
          <input
            id="url"
            type="url"
            required
            placeholder="https://example.com/your/big/ass/url"
            className="border border-gray-300 mb-7 rounded-2xl px-4 py-3 w-full mb-4 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-[18rem] bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-[1.3rem] font-bold transition"
          >
            {loading ? 'Shortening...' : <>Get your link for free <ArrowRight className='inline' /></>}
          </button>

          {shortUrl && (
            <div className="mt-6">
              <p className="text-sm font-semibold mb-2">Your Link:</p>
              <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
                <a
                  href={shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm truncate max-w-[70%]"
                >
                  {shortUrl}
                </a>
                <button
                  onClick={handleCopy}
                  type="button"
                  className="text-xs bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
          )}

          {error && (
            <div className="text-red-600 text-sm mt-4">
              <strong>Error:</strong> {error}
            </div>
          )}
        </form>
  ); 
}
