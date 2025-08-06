import React, { useEffect, useRef, useState } from "react";
import { X, Download, ImageDown, Sparkles, Paintbrush, ScanLine, Type } from "lucide-react";
import QRCodeStyling from "qr-code-styling-new";




function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
}


function QRCustomizer({ url }) {
    const qrRef = useRef(null);
    const fileInputRef = useRef(null);

    const qrCode = useRef(null);

    const [fgColor, setFgColor] = useState("#ee4f1c");
    const [bgColor, setBgColor] = useState("#181825");
    const [pattern, setPattern] = useState("rounded");
    const [cornerStyle, setCornerStyle] = useState("extra-rounded");
    const [logo, setLogo] = useState(null);
    const [customText, setCustomText] = useState("SCAN ME");
    const debouncedText = useDebounce(customText, 500);
    const [frame, setFrame] = useState("none");
    const [downloading, setDownloading] = useState(false);

    const colorPresets = [
      "#FF8C00", // Dark Orange
      "#E63946", // Red
      "#457B9D", // Steel Blue
      "#588157", // Forest Green
      "#FF69B4", // Hot Pink
      "#00CED1", // Dark Turquoise
      "#9B5DE5", // Medium Purple
      "#FEE440", // Gold
      "#20B2AA", // Light Sea Green
      "#F15BB5", // Magenta
      "#6A5ACD", // Slate Blue
      "#00F5D4", // Bright Turquoise
    ];
    const patternOptions = ["square", "dots", "rounded", "extra-rounded", "classy", "extra-classy"];
    const cornerOptions = ["square", "dot", "extra-rounded"];
    const frameOptions = [
        { id: "none", name: "None" },
        { id: "scan1", name: "Frame 1" },
        { id: "scan2", name: "Frame 2" },
        { id: "scan3", name: "Frame 3" }
    ];

    useEffect(() => {
        if (qrRef.current) {
            qrCode.current = new QRCodeStyling({
                width: 280,
                height: 280,
                type: "canvas",
                data: url,
                image: logo || undefined,
                dotsOptions: { color: fgColor, type: pattern },
                backgroundOptions: { color: bgColor },
                cornersSquareOptions: { type: cornerStyle },
                cornersDotOptions: { type: undefined },
                qrOptions: { errorCorrectionLevel: "H" }
            });
            qrCode.current.append(qrRef.current);
        }
    }, []);

    useEffect(() => {
        if (!qrCode.current) return;

        qrCode.current.update({
            data: url,
            image: logo || undefined,
            dotsOptions: { color: fgColor, type: pattern },
            backgroundOptions: { color: bgColor },
            cornersSquareOptions: { type: cornerStyle }
        });
    }, [url, fgColor, bgColor, logo, pattern, cornerStyle]);

    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setLogo(URL.createObjectURL(file));
        }
    };

    const handleRemoveLogo = () => {
        setLogo(null);
        if(fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const downloadQR = async (format) => {
        if (!qrCode.current || downloading) return;
        setDownloading(true);
        try {
            await qrCode.current.download({
                name: "myqrcode",
                extension: format
            });
        } catch (error) {
            console.error("it failed bruh", error);
        } finally {
            setDownloading(false);
        }
    };
    
    const SectionTitle = ({ icon, children }) => (
        <h3 className="text-lg font-semibold text-orange-500 mb-4 flex items-center gap-2">
            {icon}
            {children}
        </h3>
    );

    return (
        <div className="bg-gray-800/50 backdrop-blur-4xl border border-orange-500/20 text-white p-6 sm:p-8 rounded-3xl shadow-2xl shadow-orange-900/50 max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* --- LEFT SIDE - CUSTOMIZATION CONTROLS --- */}
            <div className="lg:col-span-2 space-y-9">
                {/* --- Design Section --- */}
                <div>
                    <SectionTitle icon={<Sparkles size={20} />}>Design</SectionTitle>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Pattern Selector */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Pattern</label>
                            <div className="grid grid-cols-3 gap-2">
                                {patternOptions.map((p) => (
                                    <button key={p} onClick={() => setPattern(p)} className={`capitalize text-sm py-2 px-3 rounded-lg transition-all duration-200 ${pattern === p ? 'bg-orange-600 shadow-lg' : 'bg-gray-700/50 hover:bg-gray-700'}`}>
                                        {p.replace('-', ' ')}
                                    </button>
                                ))}
                            </div>
                        </div>
                        {/* Corner Style Selector */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Corners</label>
                            <div className="grid grid-cols-3 gap-2">
                                {cornerOptions.map((c) => (
                                    <button key={c} onClick={() => setCornerStyle(c)} className={`capitalize text-sm py-2 px-3 rounded-lg transition-all duration-200 ${cornerStyle === c ? 'bg-orange-600 shadow-lg' : 'bg-gray-700/50 hover:bg-gray-700'}`}>
                                        {c.replace('-', ' ')}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- Color Section --- */}
                <div>
                    <SectionTitle icon={<Paintbrush size={20} />}>Colors</SectionTitle>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-300 mb-2">Presets</label>
                        <div className="flex flex-wrap gap-3">
                            {colorPresets.map((color) => (
                                <button key={color} className={`w-8 h-8 rounded-full border-2 transition-transform duration-200 hover:scale-110 ${fgColor === color ? 'border-white shadow-lg' : 'border-transparent'}`} style={{ backgroundColor: color }} onClick={() => setFgColor(color)} />
                            ))}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Foreground Color Picker */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Code Color</label>
                            <div className="flex items-center gap-2 bg-gray-700/50 p-2 rounded-lg">
                                <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="w-8 h-8 border-none cursor-pointer bg-transparent" style={{'WebkitAppearance': 'none', 'MozAppearance': 'none', 'appearance': 'none'}}/>
                                <input type="text" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="w-full bg-transparent text-white focus:outline-none" />
                            </div>
                        </div>
                        {/* Background Color Picker */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Background Color</label>
                            <div className="flex items-center gap-2 bg-gray-700/50 p-2 rounded-lg">
                                <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-8 h-8 border-none cursor-pointer bg-transparent" style={{'WebkitAppearance': 'none', 'MozAppearance': 'none', 'appearance': 'none'}}/>
                                <input type="text" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-full bg-transparent text-white focus:outline-none" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- Logo & Text Section --- */}
                <div>
                    <SectionTitle icon={<Type size={20} />}>Logo & Text</SectionTitle>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Logo Upload */}
                        <div>
                             <label className="block text-sm font-medium text-gray-300 mb-2">Logo Image</label>
                             <div className="flex items-center gap-2">
                                <button onClick={() => fileInputRef.current?.click()} className="flex-grow bg-gray-700/50 hover:bg-gray-700 text-white text-sm py-2 px-4 rounded-lg transition-colors duration-200">
                                    Upload Logo
                                </button>
                                <input type="file" ref={fileInputRef} accept="image/*" onChange={handleLogoUpload} className="hidden" />
                                {logo && (
                                    <button onClick={handleRemoveLogo} className="p-2 bg-red-500/80 hover:bg-red-500 rounded-lg transition-colors duration-200">
                                        <X size={16} />
                                    </button>
                                )}
                             </div>
                        </div>
                        {/* Custom Text Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Center Text</label>
                            <input type="text" placeholder="Text below QR" value={customText} onChange={(e) => setCustomText(e.target.value)} className="w-full bg-gray-700/50 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
                        </div>
                     </div>
                </div>
            </div>

            {/* --- RIGHT SIDE - PREVIEW & DOWNLOAD --- */}
            <div className="flex flex-col items-center justify-center bg-gray-900 p-6 rounded-2xl border border-purple-500/20">
                <div className="relative w-[280px] h-[280px] flex items-center justify-center mb-4">
                    {/* QR Code Canvas */}
                    <div ref={qrRef} className="absolute inset-0" />

                    {/* Frame Overlay */}
                    {frame !== "none" && (
                        <div className="absolute inset-0 pointer-events-none">
                            {frame === 'scan1' && <div className="w-full h-full border-8 border-black rounded-2xl" />}
                            {frame === 'scan2' && <div className="w-full h-full p-2"><div className="w-full h-full border-4 border-dashed border-cyan-400/80 rounded-2xl" /></div>}
                            {frame === 'scan3' && (
                                <>
                                    <div className="absolute top-0 left-0 w-1/4 h-1/4 border-t-8 border-l-8 border-teal-400/80 rounded-tl-3xl" />
                                    <div className="absolute top-0 right-0 w-1/4 h-1/4 border-t-8 border-r-8 border-teal-400/80 rounded-tr-3xl" />
                                    <div className="absolute bottom-0 left-0 w-1/4 h-1/4 border-b-8 border-l-8 border-teal-400/80 rounded-bl-3xl" />
                                    <div className="absolute bottom-0 right-0 w-1/4 h-1/4 border-b-8 border-r-8 border-teal-400/80 rounded-br-3xl" />
                                </>
                            )}
                        </div>
                    )}
                </div>

                {/* Custom Text Display */}
                {debouncedText && (
                    <span className="font-mono tracking-widest uppercase text-center text-purple-300 mb-4">{debouncedText}</span>
                )}
                
                {/* Frame Selector */}
                <div className="w-full mb-6">
                    <SectionTitle icon={<ScanLine size={20} />}>Frame</SectionTitle>
                    <div className="grid grid-cols-4 gap-2">
                        {frameOptions.map((f) => (
                            <button key={f.id} onClick={() => setFrame(f.id)} className={`text-xs sm:text-sm py-2 px-2 rounded-lg transition-all duration-200 ${frame === f.id ? 'bg-[#ee4f1c] shadow-lg' : 'bg-gray-700/50 hover:bg-gray-700'}`}>
                                {f.name}
                            </button>
                        ))}
                    </div>
                </div>


                {/* Download Buttons */}
                <div className="grid grid-cols-2 gap-3 w-full">
                    <button onClick={() => downloadQR("png")} disabled={downloading} className="flex items-center justify-center gap-2 py-3 px-4 bg-green-500/90 hover:bg-green-500 text-white font-bold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105">
                        <Download size={18} /> PNG
                    </button>
                    <button onClick={() => downloadQR("svg")} disabled={downloading} className="flex items-center justify-center gap-2 py-3 px-4 bg-sky-500/90 hover:bg-sky-500 text-white font-bold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105">
                        <ImageDown size={18} /> SVG
                    </button>
                </div>
            </div>
         </div>
    );
}

export default QRCustomizer;
