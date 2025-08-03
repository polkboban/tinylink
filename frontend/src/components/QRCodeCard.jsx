import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { ArrowRight } from "lucide-react";

export default function QRCodeCard({ url, setUrl }) {
  const [showQR, setShowQR] = useState(false);

  const handleDownloadQR = () => {
    const canvas = document.getElementById("qr-code");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    const link = document.createElement("a");
    link.href = pngUrl;
    link.download = "qr-code.png";
    link.click();
  };

  const handleGenerate = (e) => {
    e.preventDefault();
    if (url.trim()) setShowQR(true);
  };

  return (
    <form
      onSubmit={handleGenerate}
      className="bg-white p-8 rounded-[3rem] shadow-xl text-left max-w-4xl mx-auto w-full text-[#001837]"
    >
      <h3 className="text-2xl font-bold mb-2">Create a QR Code</h3>
      <p className="text-sm text-gray-600 mb-4">No credit card required.</p>

      <label htmlFor="qr-url" className="block font-semibold mb-2 mt-9 text-[1.125rem]">
        Enter your QR Code destination
      </label>
      <input
        id="qr-url"
        type="url"
        required
        placeholder="https://example.com/my/long-url"
        className="border border-gray-300 mb-7 rounded-lg px-4 py-2 w-full mb-4 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        value={url}
        onChange={(e) => {
          setShowQR(false);
          setUrl(e.target.value);
        }}
      />

      <button
        type="submit"
        className="w-[18rem] bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-[1.3rem] font-bold transition"
      >
        Get your QR Code for free <ArrowRight className="inline" />
      </button>

      {showQR && (
        <div className="mt-6 flex flex-col items-left gap-2">
          <QRCodeCanvas
            id="qr-code"
            value={url}
            size={180}
            bgColor="#ffffff"
            fgColor="#001837"
            level="H"
            includeMargin
          />
          <button
            onClick={handleDownloadQR}
            type="button"
            className="text-sm text-blue-600 hover:underline"
          >
            Download QR Code
          </button>
        </div>
      )}
    </form>
  );
}
