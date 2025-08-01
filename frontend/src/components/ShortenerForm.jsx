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
    <div className="flex flex-col items-center justify-center mt-20 px-4">
      <div className="text-center text-white mb-10 max-w-3xl">
        <h2 className="text-4xl font-extrabold leading-snug">
          Build stronger digital connections
        </h2>
        <p className="mt-4 text-lg font-medium">
          Use our URL shortener, QR Codes, and landing pages to engage your audience and connect them to the right information.
        </p>
      </div>

      <form
        onSubmit={onSubmit}
        className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-xl text-black"
      >
        <h3 className="text-xl font-bold mb-3">Shorten a long link</h3>
        <p className="text-sm text-gray-600 mb-4">No credit card required.</p>

        <input
          type="url"
          required
          placeholder="https://example.com/my-long-url"
          className="border border-gray-300 rounded px-4 py-2 w-full mb-4 text-sm"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded w-full font-semibold"
        >
          {loading ? 'Shortening...' : 'Get your link for free →'}
        </button>

        {shortUrl && (
          <div className="mt-6 text-center">
            <p className="text-sm font-semibold mb-2">Your TinyLink:</p>
            <div className="flex items-center justify-between bg-gray-100 p-2 rounded">
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 text-sm truncate"
              >
                {shortUrl}
              </a>
              <button
                onClick={handleCopy}
                className="text-xs text-white bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded ml-2"
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
  );
}
