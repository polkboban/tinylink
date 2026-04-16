import React, { useEffect, useRef, useState } from "react";
import { X, Download, ImageDown, Sparkles, Paintbrush, ScanLine, Type, Link as LinkIcon } from "lucide-react";
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
  const [url, setUrl] = useState("https://tinylink.com");
  const debouncedUrl = useDebounce(url, 500);

  const qrRef = useRef(null);
  const fileInputRef = useRef(null);
  const qrCode = useRef(null);
  const exportRef = useRef(null);

  const [fgColor, setFgColor] = useState("#001837");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [pattern, setPattern] = useState("rounded");
  const [cornerStyle, setCornerStyle] = useState("extra-rounded");
  const [logo, setLogo] = useState(null);
  const [customText, setCustomText] = useState("");
  const debouncedText = useDebounce(customText, 500);
  const [frame, setFrame] = useState("none");
  const [downloading, setDownloading] = useState(false);

  const colorPresets = [
    "#001837", "#2563eb", "#E63946", "#457B9D", "#588157", 
    "#FF8C00", "#9B5DE5", "#20B2AA", "#F15BB5", "#000000"
  ];
  const patternOptions = ["square", "dots", "rounded", "extra-rounded", "classy"];
  const cornerOptions = ["square", "dot", "extra-rounded"];
  const frameOptions = [
    { id: "none", name: "None" },
    { id: "solid", name: "Solid Focus" },
    { id: "viewfinder", name: "Scanner" },
    { id: "badge", name: "Badge" }
  ];

  useEffect(() => {
    if (!qrRef.current) return;

    const qrOptions = {
      width: 1080,
      height: 1080,
      type: "canvas",
      data: debouncedUrl || "https://tinylink.com",
      image: logo || undefined,
      margin: 15,
      dotsOptions: { color: fgColor, type: pattern },
      backgroundOptions: { color: "transparent" }, 
      cornersSquareOptions: { type: cornerStyle },
      qrOptions: { errorCorrectionLevel: "H" }
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
  }, [debouncedUrl, fgColor, logo, pattern, cornerStyle]);

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
    if(fileInputRef.current) fileInputRef.current.value = "";
  };

  const downloadQR = async (format) => {
    if (downloading || !exportRef.current) return;
    setDownloading(true);
    
    try {
      const exportOptions = {
        pixelRatio: 3, 
        backgroundColor: bgColor,
      };

      let dataUrl;
      if (format === 'png') {
        dataUrl = await htmlToImage.toPng(exportRef.current, exportOptions);
      } else if (format === 'svg') {
        dataUrl = await htmlToImage.toSvg(exportRef.current, exportOptions);
      }

      const link = document.createElement('a');
      link.download = `tinylink-qr-custom.${format}`;
      link.href = dataUrl;
      link.click();

    } catch (error) {
      console.error("Failed to download composite QR code:", error);
    } finally {
      setDownloading(false);
    }
  };
  const SectionTitle = ({ icon, children }) => (
    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-5 mt-[-0.6rem] flex items-center gap-2">
      {icon} {children}
    </h3>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      <div className="lg:col-span-7 space-y-1 w-full max-w-3xl">
        
        <div className="bg-white p-6 md:p-8 rounded-[1.5rem] shadow-sm border border-gray-100">
          <label className="block font-bold mb-3 text-gray-800 text-lg">QR Code Destination</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <LinkIcon className="text-gray-400" size={22} />
            </div>
            <input
              type="url"
              placeholder="https://example.com"
              className="border border-gray-200 rounded-xl pl-12 pr-4 py-4 w-full text-base font-medium focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none bg-gray-50/50 transition-all"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-[1.5rem] shadow-sm border border-gray-100 space-y-5">
          <div>
            <SectionTitle icon={<Sparkles size={18} />}>Pattern & Shape</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">Pattern Style</label>
                <div className="flex flex-wrap gap-2">
                  {patternOptions.map((p) => (
                    <button key={p} onClick={() => setPattern(p)} className={`capitalize text-xs font-bold py-2.5 px-4 rounded-lg transition-all ${pattern === p ? 'bg-blue-100 text-blue-700 border-blue-200 border-2' : 'bg-white text-gray-600 border-2 border-gray-100 hover:border-gray-300 hover:bg-gray-50'}`}>
                      {p.replace('-', ' ')}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">Corner Style</label>
                <div className="flex flex-wrap gap-2">
                  {cornerOptions.map((c) => (
                    <button key={c} onClick={() => setCornerStyle(c)} className={`capitalize text-xs font-bold py-2.5 px-4 rounded-lg transition-all ${cornerStyle === c ? 'bg-blue-100 text-blue-700 border-blue-200 border-2' : 'bg-white text-gray-600 border-2 border-gray-100 hover:border-gray-300 hover:bg-gray-50'}`}>
                      {c.replace('-', ' ')}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-8">
            <SectionTitle icon={<Paintbrush size={18} />}>Colors</SectionTitle>
            <div className="mb-6 flex flex-wrap gap-3">
              {colorPresets.map((color) => (
                <button key={color} className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 shadow-sm ${fgColor === color ? 'border-gray-400 shadow-md scale-110' : 'border-white'}`} style={{ backgroundColor: color }} onClick={() => setFgColor(color)} />
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Foreground Color</label>
                <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 p-2 rounded-xl focus-within:ring-2 ring-blue-500/20 focus-within:border-blue-500 transition-all">
                  <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="w-8 h-8 rounded cursor-pointer border-0 p-0" />
                  <input type="text" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="w-full bg-transparent text-gray-800 font-mono text-sm focus:outline-none uppercase font-bold" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Background Color</label>
                <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 p-2 rounded-xl focus-within:ring-2 ring-blue-500/20 focus-within:border-blue-500 transition-all">
                  <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-8 h-8 rounded cursor-pointer border-0 p-0" />
                  <input type="text" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-full bg-transparent text-gray-800 font-mono text-sm focus:outline-none uppercase font-bold" />
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-8">
            <SectionTitle icon={<Type size={18} />}>Branding & Text</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">Center Logo</label>
                <div className="flex items-center gap-2">
                  <button onClick={() => fileInputRef.current?.click()} className="flex-grow bg-white hover:bg-gray-50 border-2 border-gray-200 text-gray-700 font-bold text-sm py-2.5 px-4 rounded-xl transition-colors shadow-sm">
                    {logo ? "Change Image" : "Upload Image"}
                  </button>
                  <input type="file" ref={fileInputRef} accept="image/*" onChange={handleLogoUpload} className="hidden" />
                  {logo && (
                    <button onClick={handleRemoveLogo} className="p-2.5 bg-red-50 text-red-600 border-2 border-red-100 hover:bg-red-100 rounded-xl transition-colors" title="Remove Logo">
                      <X size={18} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-8">
            <SectionTitle icon={<ScanLine size={18} />}>Frame Style</SectionTitle>
            <div className="flex flex-wrap gap-3">
              {frameOptions.map((f) => (
                <button key={f.id} onClick={() => setFrame(f.id)} className={`text-sm font-bold py-2.5 px-5 rounded-xl transition-all ${frame === f.id ? 'bg-[#001837] text-white shadow-md transform scale-[1.02]' : 'bg-white text-gray-600 border-2 border-gray-200 hover:border-gray-400 hover:bg-gray-50'}`}>
                  {f.name}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      <div className="lg:col-span-3 flex flex-col sticky top-8">
        
        <div className="bg-white p-8 rounded-[1.5rem] shadow-lg border border-gray-100 flex flex-col items-center relative overflow-hidden">
          
          <div className="absolute -right-16 -top-16 bg-blue-50 w-48 h-48 rounded-full opacity-50 blur-3xl"></div>
          
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-8 w-full text-center z-10">Live Preview</h3>
          
          <div className="flex-1 flex flex-col items-center justify-center w-full z-10">
           
            <div 
              ref={exportRef}
              className="relative flex flex-col items-center justify-center p-1 rounded-[2rem] w-72 h-72 shadow-sm transition-colors duration-300"
              style={{ backgroundColor: bgColor }}
            >
              
              {frame !== "none" && (
                <div className="absolute inset-2 pointer-events-none" style={{ borderColor: fgColor }}>
                  {frame === 'solid' && <div className="w-full h-full border-[6px] rounded-[1.5rem] opacity-90" style={{ borderColor: fgColor }} />}
                  {frame === 'viewfinder' && (
                    <>
                      <div className="absolute top-0 left-0 w-10 h-10 border-t-[8px] border-l-[8px] rounded-tl-2xl" style={{ borderColor: fgColor }} />
                      <div className="absolute top-0 right-0 w-10 h-10 border-t-[8px] border-r-[8px] rounded-tr-2xl" style={{ borderColor: fgColor }} />
                      <div className="absolute bottom-0 left-0 w-10 h-10 border-b-[8px] border-l-[8px] rounded-bl-2xl" style={{ borderColor: fgColor }} />
                      <div className="absolute bottom-0 right-0 w-10 h-10 border-b-[8px] border-r-[8px] rounded-br-2xl" style={{ borderColor: fgColor }} />
                    </>
                  )}
                  {frame === 'badge' && <div className="w-full h-full border-[6px] rounded-[1.5rem] opacity-90" style={{ borderColor: fgColor }} />}
                </div>
              )}

              <div className="w-full h-full p-4 z-10">
                <div ref={qrRef} className="w-full h-full" />
              </div>

              {debouncedText && (
                <div className={`absolute bottom-6 w-full flex justify-center ${frame === 'badge' ? '-mb-12 z-20' : ''}`}>
                  <span 
                    className={`font-black tracking-widest uppercase text-center text-sm px-4 py-1.5 rounded-full`}
                    style={
                      frame === 'badge' 
                      ? { backgroundColor: fgColor, color: bgColor, border: `6px solid ${bgColor}` }
                      : { color: fgColor, backgroundColor: bgColor }
                    }
                  >
                    {debouncedText}
                  </span>
                </div>
              )}
            </div>
          
          </div>
        </div>

        <div className="w-full grid grid-cols-2 gap-4 mt-6">
          <button onClick={() => downloadQR("png")} disabled={downloading} className="w-full flex items-center justify-center gap-2 py-4 px-4 bg-[#001837] hover:bg-gray-800 text-white font-bold rounded-[1.2rem] shadow-lg shadow-gray-200 transition-all transform hover:-translate-y-1">
            <Download size={18} /> PNG
          </button>
          <button onClick={() => downloadQR("svg")} disabled={downloading} className="w-full flex items-center justify-center gap-2 py-4 px-4 bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 font-bold rounded-[1.2rem] shadow-sm transition-all transform hover:-translate-y-1">
            <ImageDown size={18} /> SVG
          </button>
        </div>

      </div>

    </div>
  );
}