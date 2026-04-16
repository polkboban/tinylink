import { useState } from "react";
import { ArrowRight, BarChart2, X } from "lucide-react";

export default function DashShortener({
  url,
  setUrl,
  onSubmit, 
  loading,
  shortUrl,
  error,
  copied,
  handleCopy,
  analytics, 
}) {
  const [showAnalytics, setShowAnalytics] = useState(false);

  return (
    <>
      <form
        onSubmit={onSubmit} 
        className="bg-white p-8 rounded-[2rem] shadow-xl text-left max-w-4xl mx-auto w-full text-[#001837]"
      >
        <h3 className="text-3xl font-extrabold mb-2 mt-2">Shorten a new link</h3>
        <p className="text-sm text-gray-600 mb-4">
          Create custom, trackable links in seconds.
        </p>

        <label
          htmlFor="url"
          className="block font-bold mb-2 mt-[3.8rem] text-lg"
        >
          Paste your long link here
        </label>
        <input
          id="url"
          type="url"
          required
          placeholder="https://example.com/your/very/long/url"
          className="border border-gray-300 mb-7 rounded-2xl px-4 py-3 w-full text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-[18rem] bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-[1.3rem] font-bold transition"
        >
          {loading ? (
            "Shortening..."
          ) : (
            <>
              Shorten Link <ArrowRight className="inline" />
            </>
          )}
        </button>

        {shortUrl && (
          <div className="mt-6 space-y-3">
            <p className="text-sm font-semibold">Your Shortened Link:</p>
            <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 text-sm truncate max-w-[60%] font-bold hover:underline"
              >
                {shortUrl}
              </a>
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  type="button"
                  className="text-xs bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-md font-semibold transition"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAnalytics(true)}
                  className="text-xs bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-md font-semibold flex items-center gap-1 transition"
                >
                  <BarChart2 size={14} /> Analytics
                </button>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="text-red-600 text-sm mt-4 bg-red-50 p-3 rounded-lg border border-red-100">
            <strong>Error:</strong> {error}
          </div>
        )}
      </form>

      {/* Analytics Modal (Unchanged) */}
      {showAnalytics && analytics && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-[90%] max-w-md relative">
            <button
              onClick={() => setShowAnalytics(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-800 transition"
            >
              <X size={20} />
            </button>
            <h2 className="text-lg font-bold mb-4 text-gray-800">Your Link Analytics</h2>
            <div className="space-y-3 text-sm text-gray-700">
              <div>
                <span className="font-bold text-gray-900">Short URL:</span>{" "}
                <a
                  href={shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {shortUrl}
                </a>
              </div>
              <div className="truncate">
                <span className="font-bold text-gray-900">Original URL:</span>{" "}
                <span title={analytics.originalUrl}>{analytics.originalUrl}</span>
              </div>
              <div>
                <span className="font-bold text-gray-900">Created:</span>{" "}
                {new Date(analytics.createdAt).toLocaleString()}
              </div>
              {analytics.expiresAt && (
                <div>
                  <span className="font-bold text-gray-900">Expires:</span>{" "}
                  {new Date(analytics.expiresAt).toLocaleString()}
                </div>
              )}
              <div>
                <span className="font-bold text-gray-900">Total Clicks:</span>{" "}
                <span className="bg-blue-100 text-blue-800 py-0.5 px-2 rounded-full font-bold ml-1">
                  {analytics.clickCount}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}