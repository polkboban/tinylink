import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Upload, X } from "lucide-react";

export default function QRCustomizer({ url }) {
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [logo, setLogo] = useState(null);
  const [customText, setCustomText] = useState("");
  const [frame, setFrame] = useState("none");

  const [pattern, setPattern] = useState("standard");
  const [cornerStyle, setCornerStyle] = useState("standard");

  const colorPresets = [
    "#000000", "#FF0000", "#FFA500", "#008000",
    "#0000FF", "#4B0082", "#EE82EE"
  ];

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) setLogo(URL.createObjectURL(file));
  };

  const handleRemoveLogo = () => setLogo(null);

  return (
    <div className="bg-white rounded-xl shadow-lg max-w-7xl mx-auto p-6 md:p-10 flex flex-col md:flex-row gap-10">
      {/* Left Column: Customization */}
      <div className="md:w-2/3 w-full space-y-6">
        {/* Styles */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Select styles</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium">Pattern</label>
              <select
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                className="border rounded px-3 py-1 w-full"
              >
                <option value="standard">Standard</option>
                <option value="dots">Dots</option>
                <option value="rounded">Rounded</option>
                <option value="cross">Cross</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">Corners</label>
              <select
                value={cornerStyle}
                onChange={(e) => setCornerStyle(e.target.value)}
                className="border rounded px-3 py-1 w-full"
              >
                <option value="standard">Standard</option>
                <option value="circle">Circle</option>
                <option value="square">Square</option>
                <option value="diamond">Diamond</option>
              </select>
            </div>
          </div>
        </div>

        {/* Colors */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Choose your colors</h2>
          <div className="flex gap-2 mb-2 flex-wrap">
            {colorPresets.map((color) => (
              <button
                key={color}
                style={{ backgroundColor: color }}
                onClick={() => setFgColor(color)}
                className="w-6 h-6 rounded-full border border-gray-300"
              />
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Code color</label>
              <input
                type="color"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
                className="w-full h-10 border rounded"
              />
              <input
                type="text"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
                className="mt-1 w-full border px-2 py-1 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Background color</label>
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-full h-10 border rounded"
              />
              <input
                type="text"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="mt-1 w-full border px-2 py-1 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Logo / Text */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Add a logo or center text</h2>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="text-sm"
              />
              {logo && (
                <button onClick={handleRemoveLogo} className="text-red-500 flex items-center gap-1">
                  <X size={16} />
                  Remove logo
                </button>
              )}
            </div>
            <input
              type="text"
              placeholder="Or enter custom center text"
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              className="border rounded px-3 py-2 text-sm"
            />
          </div>
        </div>

        {/* Frame */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Select a frame</h2>
          <div className="flex gap-4 flex-wrap">
            {["none", "scan1", "scan2", "scan3"].map((frameType) => (
              <button
                key={frameType}
                onClick={() => setFrame(frameType)}
                className={`border px-4 py-2 rounded ${
                  frame === frameType ? "border-blue-600" : "border-gray-300"
                }`}
              >
                {frameType === "none" ? "None" : frameType.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column: QR Preview */}
      <div className="md:w-1/3 w-full flex flex-col items-center justify-center">
        <div
          className={`p-4 border ${
            frame !== "none" ? "border-dashed border-2 border-gray-400" : ""
          }`}
        >
          <QRCodeCanvas
            value={url}
            size={250}
            fgColor={fgColor}
            bgColor={bgColor}
            level="H"
            includeMargin
            imageSettings={
              logo
                ? {
                    src: logo,
                    height: 50,
                    width: 50,
                    excavate: true,
                  }
                : undefined
            }
          />
        </div>
        {customText && (
          <span className="text-sm font-medium mt-2 text-center">{customText}</span>
        )}
      </div>
    </div>
  );
}
