import { useState, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import QRCodeStyling from "qr-code-styling";
import { useNavigate } from "react-router-dom";

const QR_CARD_IMAGE = "/qr-card-main.png";

export default function QRCodeCard() {
  const [url, setUrl] = useState("");
  const [showQR, setShowQR] = useState(false);
  const [fgColor, setFgColor] = useState("#001837");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [size, setSize] = useState(180);
  const [level, setLevel] = useState("H");

  const qrRef = useRef(null);
  const qrCode = useRef(new QRCodeStyling({
    width: size,
    height: size,
    data: url,
    dotsOptions: { color: fgColor, type: "square" },
    backgroundOptions: { color: bgColor },
    qrOptions: { errorCorrectionLevel: level }
  }));

  const navigate = useNavigate();

  useEffect(() => {
    if (showQR && qrRef.current) {
      qrCode.current.update({
        data: url,
        width: size,
        height: size,
        dotsOptions: { color: fgColor },
        backgroundOptions: { color: bgColor },
        qrOptions: { errorCorrectionLevel: level },
      });

      qrRef.current.innerHTML = "";
      qrCode.current.append(qrRef.current);
    }
  }, [showQR, url, fgColor, bgColor, size, level]);

  const handleGenerate = (e) => {
    e.preventDefault();
    if (url.trim()) {
      setShowQR(true);
    }
  };

  const handleDownloadQR = () => {
    qrCode.current.download({ name: "qr-code", extension: "png" });
  };

  return (
    
      <div className="bg-white p-6 md:p-7 rounded-[2rem] shadow-xl max-w-5xl w-full flex flex-col md:flex-row gap-10 text-[#001837] relative">
        <div className="md:w-1/2 flex justify-center items-start flex-col">
          <h3 className="text-3xl font-extrabold mb-2">Create a QR Code</h3>
          <p className="text-sm text-gray-500 mb-4">No credit card required. duh</p>

          <label htmlFor="qr-url" className="block font-bold mb-2 mt-9 text-lg">
            Enter your QR Code destination
          </label>
          <input
            id="qr-url"
            type="url"
            required
            placeholder="https://example.com/my/long/url"
            className="border border-gray-300 rounded-2xl px-4 py-3 w-full mb-7 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={url}
            onChange={(e) => {
              setShowQR(false);
              setUrl(e.target.value);
            }}
          />

          <form onSubmit={handleGenerate}>
            <button
              type="submit"
              className="w-full md:w-[18rem] bg-blue-600 hover:bg-[#20293a] text-white py-3 rounded-[1.3rem] font-bold transition flex items-center justify-center gap-2"
            >
              Get your QR Code for free <ArrowRight />
            </button>
          </form>
        </div>

        <div className="md:w-1/2 flex items-center justify-center relative min-h-[300px]">
          {showQR ? (
            <div className="flex flex-col items-center gap-4 p-2">
              <div ref={qrRef} className="p-2 border rounded-[1.2rem] shadow-lg border-gray-200"></div>
              <button
                type="button"
                onClick={() => navigate("/customize", { state: { url } })}
                className="w-full md:w-[17rem] bg-blue-600 text-white py-3 rounded-[1.3rem] font-bold hover:bg-blue-700 transition"
              >
                Customize your QR Code
              </button>
              <button className="group rounded-lg mt-[-0.5rem] px-5 py-1 font-semibold transition-colors duration-300">
                <span className="bg-left-bottom bg-gradient-to-r from-blue-500 to-blue-500 bg-[length:0%_2px] bg-no-repeat transition-all duration-500 ease-out group-hover:bg-[length:100%_2px]">
                  Download QR Code
                </span>
              </button>
            </div>
          ) : (
            <img 
              src={QR_CARD_IMAGE} 
              alt="QR Code Placeholder" 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-full h-auto"
            />
          )}
        </div>
      </div>
    
  );
}
