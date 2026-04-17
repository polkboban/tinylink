import React, { useEffect, useRef, useState } from "react";
import { X, Download, ImageDown, Sparkles, Paintbrush, ScanLine, Type, Link as LinkIcon, SlidersHorizontal } from "lucide-react";
import QRCodeStyling from "qr-code-styling-new";
import * as htmlToImage from "html-to-image";

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

export default function DashboardQRCode() {
  const [url, setUrl] = useState("https://example.com");
  const debouncedUrl = useDebounce(url, 500);

  const qrRef = useRef(null);
  const fileInputRef = useRef(null);
  const qrCode = useRef(null);
  const exportRef = useRef(null);

  // Colors & Styles
  const [fgColor, setFgColor] = useState("#1a1a18");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [pattern, setPattern] = useState("rounded");
  const [cornerStyle, setCornerStyle] = useState("extra-rounded");
  const [logo, setLogo] = useState(null);
  const [customText, setCustomText] = useState("");
  const debouncedText = useDebounce(customText, 500);
  const [frame, setFrame] = useState("none");
  const [downloading, setDownloading] = useState(false);

  // NEW: Size Controls
  const [logoSize, setLogoSize] = useState(0.4); 
  const [frameThickness, setFrameThickness] = useState(5);
  const [textSize, setTextSize] = useState(12);

  const colorPresets = [
    "#1a1a18", "#f97316", "#2563eb", "#dc2626",
    "#059669", "#7c3aed", "#db2777", "#0891b2", "#ca8a04", "#64748b"
  ];
  const patternOptions = ["square", "dots", "rounded", "extra-rounded", "classy"];
  const cornerOptions = ["square", "dot", "extra-rounded"];
  const frameOptions = [
    { id: "none", name: "None" },
    { id: "solid", name: "Solid" },
    { id: "viewfinder", name: "Scanner" },
    { id: "bracket", name: "Brackets" },
    { id: "polaroid", name: "Polaroid" }
  ];

  useEffect(() => {
    if (!qrRef.current) return;

    const qrOptions = {
      width: 1080,
      height: 1080,
      type: "canvas",
      data: debouncedUrl || "https://example.com",
      image: logo || undefined,
      margin: 15,
      dotsOptions: { color: fgColor, type: pattern },
      backgroundOptions: { color: "transparent" },
      cornersSquareOptions: { type: cornerStyle },
      qrOptions: { errorCorrectionLevel: "H" },
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 5,
        imageSize: logoSize, 
      }
    };

    if (!qrCode.current) {
      qrCode.current = new QRCodeStyling(qrOptions);
      qrCode.current.append(qrRef.current);
    } else {
      qrCode.current.update(qrOptions);
    }

    const canvasElement = qrRef.current.querySelector('canvas');
    if (canvasElement) {
      canvasElement.style.width = '100%';
      canvasElement.style.height = '100%';
    }

    return () => {
      if (qrRef.current) qrRef.current.innerHTML = '';
    };
  }, [debouncedUrl, fgColor, logo, pattern, cornerStyle, logoSize]); // added logoSize to dependency array

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (logo) URL.revokeObjectURL(logo);
      setLogo(URL.createObjectURL(file));
    }
  };

  const handleRemoveLogo = () => {
    if (logo) URL.revokeObjectURL(logo);
    setLogo(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const downloadQR = async (format) => {
    if (downloading || !exportRef.current) return;
    setDownloading(true);
    try {
      const exportOptions = { pixelRatio: 3, backgroundColor: bgColor };
      let dataUrl;
      if (format === 'png') dataUrl = await htmlToImage.toPng(exportRef.current, exportOptions);
      else if (format === 'svg') dataUrl = await htmlToImage.toSvg(exportRef.current, exportOptions);
      const link = document.createElement('a');
      link.download = `qr-code.${format}`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Failed to download:", error);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_520px] gap-6 items-start text-[#1a1a18] font-sans">
      
      {/* LEFT COLUMN */}
      <div className="flex flex-col gap-[2px]">
        {/* URL */}
        <div className="bg-[#fafaf8] border border-[#e8e5de] rounded-[16px] py-6 px-7">
          <div className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.12em] uppercase text-[#a89f8c] mb-[18px]">
            <LinkIcon size={12} className="text-[#f97316]" /> Destination URL
          </div>
          <div className="relative">
            <div className="absolute left-[14px] top-1/2 -translate-y-1/2 text-[#b5ad9e] pointer-events-none">
              <LinkIcon size={16} />
            </div>
            <input
              type="url"
              placeholder="https://example.com"
              className="w-full bg-white border-[1.5px] border-[#e8e5de] rounded-xl py-[13px] pr-4 pl-[44px] font-mono text-[13px] text-[#1a1a18] outline-none transition-all focus:border-[#f97316] focus:ring-[3px] focus:ring-[#f97316]/10"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
        </div>

        {/* Pattern & corners */}
        <div className="bg-[#fafaf8] border border-[#e8e5de] rounded-[16px] py-6 px-7">
          <div className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.12em] uppercase text-[#a89f8c] mb-[18px]">
            <Sparkles size={12} className="text-[#f97316]" /> Pattern & Shape
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <div className="text-[11px] font-semibold text-[#7a7265] tracking-[0.05em] mb-2.5">Dot pattern</div>
              <div className="flex flex-wrap gap-1.5">
                {patternOptions.map((p) => (
                  <button
                    key={p}
                    className={`text-[11px] font-medium py-1.5 px-3 rounded-lg border-[1.5px] cursor-pointer transition-all capitalize ${
                      pattern === p
                        ? "bg-[#fff4ed] border-[#f97316] text-[#c2440a]"
                        : "border-[#e8e5de] bg-white text-[#5a5448] hover:border-[#c8c0b0] hover:bg-[#f5f3ee]"
                    }`}
                    onClick={() => setPattern(p)}
                  >
                    {p.replace("-", "\u2011")}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="text-[11px] font-semibold text-[#7a7265] tracking-[0.05em] mb-2.5">Corner style</div>
              <div className="flex flex-wrap gap-1.5">
                {cornerOptions.map((c) => (
                  <button
                    key={c}
                    className={`text-[11px] font-medium py-1.5 px-3 rounded-lg border-[1.5px] cursor-pointer transition-all capitalize ${
                      cornerStyle === c
                        ? "bg-[#fff4ed] border-[#f97316] text-[#c2440a]"
                        : "border-[#e8e5de] bg-white text-[#5a5448] hover:border-[#c8c0b0] hover:bg-[#f5f3ee]"
                    }`}
                    onClick={() => setCornerStyle(c)}
                  >
                    {c.replace("-", "\u2011")}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Colors */}
        <div className="bg-[#fafaf8] border border-[#e8e5de] rounded-[16px] py-6 px-7">
          <div className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.12em] uppercase text-[#a89f8c] mb-[18px]">
            <Paintbrush size={12} className="text-[#f97316]" /> Colors
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {colorPresets.map((color) => (
              <button
                key={color}
                className={`w-[26px] h-[26px] rounded-full cursor-pointer border-2 transition-all outline outline-2 ${
                  fgColor === color
                    ? "border-white outline-[#f97316] scale-110"
                    : "border-transparent outline-transparent hover:scale-110"
                }`}
                style={{ backgroundColor: color }}
                onClick={() => setFgColor(color)}
              />
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <div className="text-[11px] font-semibold text-[#7a7265] tracking-[0.05em] mb-2.5">Foreground</div>
              <div className="flex items-center gap-2 bg-white border-[1.5px] border-[#e8e5de] rounded-[10px] py-1.5 px-2.5 transition-colors focus-within:border-[#f97316]">
                <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="w-[26px] h-[26px] border-none p-0 rounded-md cursor-pointer bg-transparent" />
                <input type="text" value={fgColor} onChange={(e) => setFgColor(e.target.value)} maxLength={7} className="flex-1 border-none outline-none bg-transparent font-mono text-[12px] font-medium text-[#1a1a18] uppercase" />
              </div>
            </div>
            <div>
              <div className="text-[11px] font-semibold text-[#7a7265] tracking-[0.05em] mb-2.5">Background</div>
              <div className="flex items-center gap-2 bg-white border-[1.5px] border-[#e8e5de] rounded-[10px] py-1.5 px-2.5 transition-colors focus-within:border-[#f97316]">
                <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-[26px] h-[26px] border-none p-0 rounded-md cursor-pointer bg-transparent" />
                <input type="text" value={bgColor} onChange={(e) => setBgColor(e.target.value)} maxLength={7} className="flex-1 border-none outline-none bg-transparent font-mono text-[12px] font-medium text-[#1a1a18] uppercase" />
              </div>
            </div>
          </div>
        </div>

        {/* Branding & Text */}
        <div className="bg-[#fafaf8] border border-[#e8e5de] rounded-[16px] py-6 px-7">
          <div className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.12em] uppercase text-[#a89f8c] mb-[18px]">
            <Type size={12} className="text-[#f97316]" /> Branding & Text
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <div className="text-[11px] font-semibold text-[#7a7265] tracking-[0.05em] mb-2.5">Center logo</div>
              <div className="flex gap-2">
                <button className="flex-1 bg-white border-[1.5px] border-dashed border-[#d4cfc5] rounded-[10px] py-2.5 px-3.5 text-[12px] font-medium text-[#7a7265] cursor-pointer transition-all text-center hover:border-[#f97316] hover:text-[#f97316] hover:bg-[#fff9f5]" onClick={() => fileInputRef.current?.click()}>
                  {logo ? "Change image" : "+ Upload image"}
                </button>
                <input type="file" ref={fileInputRef} accept="image/*" onChange={handleLogoUpload} className="hidden" />
                {logo && (
                  <button className="p-[9px] bg-[#fff0ee] border-[1.5px] border-[#fcd4ca] rounded-[10px] text-[#c0392b] cursor-pointer transition-colors flex items-center justify-center hover:bg-[#ffe0db]" onClick={handleRemoveLogo} title="Remove logo">
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>
            <div>
              <div className="text-[11px] font-semibold text-[#7a7265] tracking-[0.05em] mb-2.5">Label text</div>
              <input
                type="text"
                placeholder="e.g. SCAN ME"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                className="w-full bg-white border-[1.5px] border-[#e8e5de] rounded-[10px] py-[9px] px-3 text-[12px] text-[#1a1a18] outline-none transition-colors focus:border-[#f97316]"
              />
            </div>
          </div>
        </div>

        {/* Frames */}
        <div className="bg-[#fafaf8] border border-[#e8e5de] rounded-[16px] py-6 px-7">
          <div className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.12em] uppercase text-[#a89f8c] mb-[18px]">
            <ScanLine size={12} className="text-[#f97316]" /> Frame style
          </div>
          <div className="flex gap-2 flex-wrap">
            {frameOptions.map((f) => (
              <button
                key={f.id}
                className={`text-[12px] font-medium py-2 px-4 rounded-lg border-[1.5px] cursor-pointer transition-all ${
                  frame === f.id
                    ? "bg-[#1a1a18] border-[#1a1a18] text-white"
                    : "border-[#e8e5de] bg-white text-[#5a5448] hover:border-[#c8c0b0]"
                }`}
                onClick={() => setFrame(f.id)}
              >
                {f.name}
              </button>
            ))}
          </div>
        </div>

        {/* NEW: Fine-Tuning Sliders */}
        <div className="bg-[#fafaf8] border border-[#e8e5de] rounded-[16px] py-6 px-7">
          <div className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.12em] uppercase text-[#a89f8c] mb-[18px]">
            <SlidersHorizontal size={12} className="text-[#f97316]" /> Fine-Tuning
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Logo Size Slider */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-[11px] font-semibold text-[#7a7265]">
                <span>Logo Size</span>
                <span>{Math.round(logoSize * 100)}%</span>
              </div>
              <input 
                type="range" min="0.1" max="0.5" step="0.05" 
                value={logoSize} onChange={(e) => setLogoSize(parseFloat(e.target.value))}
                className="w-full accent-[#f97316]" 
                disabled={!logo}
              />
            </div>

            {/* Frame Thickness Slider */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-[11px] font-semibold text-[#7a7265]">
                <span>Frame Thiccness</span>
                <span>{frameThickness}px</span>
              </div>
              <input 
                type="range" min="1" max="10" step="1" 
                value={frameThickness} onChange={(e) => setFrameThickness(parseInt(e.target.value))}
                className="w-full accent-[#f97316]" 
                disabled={frame === "none"}
              />
            </div>

            {/* Text Size Slider */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-[11px] font-semibold text-[#7a7265]">
                <span>Text Size</span>
                <span>{textSize}px</span>
              </div>
              <input 
                type="range" min="8" max="34" step="1" 
                value={textSize} onChange={(e) => setTextSize(parseInt(e.target.value))}
                className="w-full accent-[#f97316]" 
                disabled={!debouncedText}
              />
            </div>
          </div>
        </div>

      </div>

      {/* RIGHT COLUMN */}
      <div className="sticky top-6">
        <div className="bg-[#fafaf8] border border-[#e8e5de] rounded-[20px] p-6 flex flex-col items-center">
          <div className="text-[10px] font-semibold tracking-[0.12em] uppercase text-[#a89f8c] mb-5 flex items-center gap-1.5 w-full before:content-[''] before:inline-block before:w-1.5 before:h-1.5 before:rounded-full before:bg-[#f97316]">
            Live preview
          </div>

          <div
            ref={exportRef}
            className="relative w-[440px] h-[440px] rounded-2xl overflow-hidden flex items-center justify-center shrink-0 p-3 transition-colors duration-200"
            style={{ backgroundColor: bgColor }}
          >
            {frame !== "none" && (
              <div className="absolute inset-2 pointer-events-none">
                {frame === "solid" && (
                  <div className="w-full h-full rounded-[14px] opacity-90" style={{ border: `${frameThickness}px solid ${fgColor}` }} />
                )}
                {frame === "viewfinder" && (
                  <>
                    <div className="absolute top-0 left-0 w-20 h-20 rounded-tl-[12px]" style={{ borderTop: `${frameThickness}px solid ${fgColor}`, borderLeft: `${frameThickness}px solid ${fgColor}` }} />
                    <div className="absolute top-0 right-0 w-20 h-20 rounded-tr-[12px]" style={{ borderTop: `${frameThickness}px solid ${fgColor}`, borderRight: `${frameThickness}px solid ${fgColor}` }} />
                    <div className="absolute bottom-0 left-0 w-20 h-20 rounded-bl-[12px]" style={{ borderBottom: `${frameThickness}px solid ${fgColor}`, borderLeft: `${frameThickness}px solid ${fgColor}` }} />
                    <div className="absolute bottom-0 right-0 w-20 h-20 rounded-br-[12px]" style={{ borderBottom: `${frameThickness}px solid ${fgColor}`, borderRight: `${frameThickness}px solid ${fgColor}` }} />
                  </>
                )}
                {frame === "bracket" && (
                  <div className="w-full h-full rounded-[14px]" style={{ borderLeft: `${frameThickness}px solid ${fgColor}`, borderRight: `${frameThickness}px solid ${fgColor}` }} />
                )}
                {frame === "polaroid" && (
                  <div className="w-full h-full rounded-[14px] opacity-90" style={{ border: `${frameThickness}px solid ${fgColor}`, borderBottomWidth: Math.max(frameThickness, 38) }} />
                )}
              </div>
            )}

            <div className="w-full h-full relative z-10">
              <div ref={qrRef} className="w-full h-full" />
            </div>

            {debouncedText && (
              <div
                className="absolute w-full flex justify-center z-20"
                style={{ bottom: frame === "polaroid" ? 14 : 10 }}
              >
                <span
                  className="font-bold tracking-[0.15em] uppercase py-1 px-[14px] rounded-full"
                  style={{
                    fontSize: `${textSize}px`,
                    ...(frame === "polaroid"
                      ? { color: bgColor }
                      : { color: fgColor, backgroundColor: `${bgColor}ee` })
                  }}
                >
                  {debouncedText}
                </span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2.5 mt-5 w-full">
            <button
              className="text-[12px] font-semibold py-[11px] rounded-[10px] cursor-pointer transition-all flex items-center justify-center gap-1.5 border-[1.5px] disabled:opacity-50 disabled:cursor-not-allowed bg-[#f97316] text-white border-[#f97316] hover:not(:disabled):bg-[#ea6a0a] hover:not(:disabled):border-[#ea6a0a]"
              onClick={() => downloadQR("png")}
              disabled={downloading}
            >
              <Download size={14} /> PNG
            </button>
            <button
              className="text-[12px] font-semibold py-[11px] rounded-[10px] cursor-pointer transition-all flex items-center justify-center gap-1.5 border-[1.5px] disabled:opacity-50 disabled:cursor-not-allowed bg-white text-[#1a1a18] border-[#e8e5de] hover:not(:disabled):bg-[#f5f3ee] hover:not(:disabled):border-[#c8c0b0]"
              onClick={() => downloadQR("svg")}
              disabled={downloading}
            >
              <ImageDown size={14} /> SVG
            </button>
          </div>

          <div className="w-full mt-[14px] pt-[14px] border-t border-[#e8e5de] flex items-center justify-between">
            <span className="text-[10px] font-semibold tracking-[0.08em] uppercase text-[#a89f8c]">
              NOTE: For best results, use a plain background and avoid complex patterns when applying frames or custom text.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}