import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function QRCodeCard({ url, setUrl }) {
  const [showQR, setShowQR] = useState(false);

  const [size, setSize] = useState(180);
  const [fgColor, setFgColor] = useState("#001837");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [level, setLevel] = useState("H");

  const navigate = useNavigate();

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

      <div className="grid grid-cols-2 gap-4 text-sm mb-6">
        <div>
          <label className="block font-medium mb-1">Size (px)</label>
          <input
            type="number"
            min="100"
            max="1000"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="border border-gray-300 rounded px-3 py-1 w-full"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Error Correction Level</label>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1 w-full"
          >
            <option value="L">L (Low)</option>
            <option value="M">M (Medium)</option>
            <option value="Q">Q (Quartile)</option>
            <option value="H">H (High)</option>
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">Foreground Color</label>
          <input
            type="color"
            value={fgColor}
            onChange={(e) => setFgColor(e.target.value)}
            className="w-full h-10 p-1 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Background Color</label>
          <input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
            className="w-full h-10 p-1 border border-gray-300 rounded"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-[18rem] bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-[1.3rem] font-bold transition"
      >
        Get your QR Code for free <ArrowRight className="inline" />
      </button>

      <button
        type="button"
        onClick={() => navigate("/customize")}
        className="ml-4 mt-2 w-[18rem] border border-blue-600 text-blue-600 py-3 rounded-[1.3rem] font-bold hover:bg-blue-50 transition"
      >
        Customize your QR Code
      </button>

      {showQR && (
        <div className="mt-6 flex flex-col items-left gap-2">
          <QRCodeCanvas
            id="qr-code"
            value={url}
            size={size}
            bgColor={bgColor}
            fgColor={fgColor}
            level={level}
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
