import { useState } from "react";
import ShortenerForm from "./ShortenerForm";
import QRCodeCard from "./QRCodeCard";

export default function ShortenerAndQR() {
  const [mode, setMode] = useState("shorten"); 
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [analytics, setAnalytics] = useState(null); 

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setCopied(false);

    try {
      const res = await fetch("https://tny1ink.onrender.com/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(`Invalid JSON: ${text}`);
      }

      if (!res.ok || !data.success) {
        throw new Error(data?.error || "Something went wrong");
      }

      setShortUrl(data.data.shortUrl);

      // ✅ Save analytics data for popup
      setAnalytics({
        shortCode: data.data.shortCode,
        originalUrl: data.data.originalUrl,
        createdAt: data.data.createdAt,
        expiresAt: data.data.expiresAt,
        clickCount: data.data.clickCount,
      });

    } catch (err) {
      console.error("Shortening failed:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    } 
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
          <button
            onClick={() => setMode("shorten")}
            className={`px-6 py-2 rounded-[1.6rem] transition flex items-center gap-1 font-semibold ${
              mode === "shorten"
                ? "bg-white text-[#001837] shadow"
                : "border border-none text-white hover:bg-[#000b1a]"
            }`}
          >
            <img src="/link.svg" className="h-8 md:h-11 mr-1" />
            Short link
          </button>
          <button
            onClick={() => setMode("qr")}
            className={`px-6 py-2 rounded-[1.6rem] transition flex items-center gap-1 font-semibold ${
              mode === "qr"
                ? "bg-white text-[#001837] shadow"
                : "border border-none text-white hover:bg-[#000b1a]"
            }`}
          >
            <img src="/qr.svg" className="h-8 md:h-11" />
            QR Code
          </button>
        </div>

        {mode === "shorten" ? (
          <ShortenerForm
            url={url}
            setUrl={setUrl}
            onSubmit={onSubmit}
            loading={loading}
            shortUrl={shortUrl}
            error={error}
            copied={copied}
            handleCopy={handleCopy}
            analytics={analytics} 
          />
        ) : (
          <QRCodeCard url={url} setUrl={setUrl} />
        )}
      </div>
    </section>
  );
}
