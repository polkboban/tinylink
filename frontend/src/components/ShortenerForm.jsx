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
    <section className="relative px-7 py-16 bg-[#001837] overflow-hidden w-full">
      <img
        src="/stars.svg"
        alt="Background stars"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[100%] max-w-none pointer-events-none select-none"
      />
      <div className="max-w-4xl mx-auto text-center text-white">
        <h2 className="text-5xl font-extrabold leading-tight mb-4">
          Build stronger digital connections
        </h2>
        <p className="text-lg font-medium mb-10 max-w-2xl mx-auto">
          Use our URL shortener, QR Codes, and landing pages to engage your audience and connect them to the right information.
        </p>

        <div className="flex justify-center gap-4 mb-10">
          <button className="bg-white text-[#001837] font-semibold px-6 py-2 shadow hover:bg-gray-100 transition flex items-center gap-1/2 rounded-[1.6rem]">
            <img
              src="/link.svg"
              className={`h-8 md:h-11 mr-1`}
            />Short link
          </button>
          <button className="border border-none text-white px-6 py-2 rounded-[1.6rem] hover:bg-[#000b1a] transition flex items-center gap-1">
            <img
              src="/qr.svg"
              className={`h-8 md:h-11`}
            />
            QR Code
          </button>
        </div>

        <form
          onSubmit={onSubmit}
          className="bg-white p-8 rounded-[3rem] shadow-xl text-left max-w-4xl mx-auto w-full text-[#001837]"
        >
          <h3 className="text-2xl font-bold mb-2">Shorten a long link</h3>
          <p className="text-sm text-gray-600 mb-4">No credit card required. duh</p>

          <label htmlFor="url" className="block font-semibold mb-2 mt-9 text-[1.125rem]">
            Paste your long link here
          </label>
          <input
            id="url"
            type="url"
            required
            placeholder="https://example.com/my/long/url"
            className="border border-gray-300 mb-7 rounded-lg px-4 py-2 w-full mb-4 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
      </div>
    </section>
  );
}
