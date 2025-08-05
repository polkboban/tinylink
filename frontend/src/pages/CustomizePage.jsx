import { useNavigate } from "react-router-dom";
import QRCustomizer from "../components/QRCustomizer";

export default function CustomizePage({ url }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-4 mb-[4rem]">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 font-semibold mb-3 mx-6 px-0 py-0 rounded hover:bg-blue-50 transition"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold mb-6 mx-6">Customize Your QR Code</h1>

      <QRCustomizer url={url || "https://example.com"} />
    </div>
  );
}
