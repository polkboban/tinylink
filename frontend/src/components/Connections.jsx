import React from "react";

export default function BitlyConnectionsSection() {
  const tiles = [
    {
      id: 1,
      title: "URL Shortener",
      description:
        "A comprehensive solution to help make every point of connection between your content and your audience more powerful.",
      icon: "/link.svg",
      image: "/short-link-card.png",
    },
    {
      id: 2,
      title: "QR Codes",
      description:
        "Easily create, customize, and share QR Codes to connect your audience offline to your digital experiences.",
      icon: "/qr.svg",
      image: "/qr-code-card.png",
    },
    {
      id: 3,
      title: "Link-in-bio",
      description:
        "Turn followers into customers with a single link that connects audiences to all your content, everywhere.",
      icon: "/landing-pages-icon.svg",
      image: "/pages-card.png",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f6f0ea] flex flex-col items-center py-16 px-6">
      {/* Header */}
      <div className="max-w-4xl text-center mb-12">
        <p className="text-sm tracking-widest text-gray-500 mb-2">
          GREAT CONNECTIONS START WITH A CLICK OR SCAN
        </p>
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#06263a] leading-tight mb-4">
          The Bitly Connections Platform
        </h1>
        <p className="text-gray-600 mb-8">
          All the products you need to build brand connections, manage links and
          QR Codes, and connect with audiences everywhere, in a single unified
          platform.
        </p>
        <div className="flex justify-center gap-4">
          <button className="px-6 py-3 bg-[#0d66e6] text-white rounded-full shadow hover:shadow-lg transform hover:-translate-y-0.5 transition">
            Get started for free →
          </button>
          <button className="px-6 py-3 border-2 border-[#0d66e6] text-[#0d66e6] rounded-full hover:bg-white/60 transition">
            Get a quote →
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3">
        {tiles.map((tile) => (
          <div
            key={tile.id}
            className="flex flex-col w-[360px] h-[560px] bg-white border border-gray-400 rounded-2xl shadow-sm overflow-hidden transition-transform duration-300 ease-out hover:-translate-y-2 hover:shadow-xl"
          >
            {/* Image */}
            <div className="h-[60%] w-full overflow-hidden bg-[#eae3dc] flex items-center justify-center">
              <img
                src={tile.image}
                alt={tile.title}
                className="object-contain max-h-full transition-transform duration-500 ease-in-out group-hover:scale-105"
              />
            </div>

            {/* Content */}
            <div className="h-[40%] bg-white p-6 flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <img src={tile.icon} alt="icon" className="h-7 w-7" />
                <h3 className="text-lg font-semibold text-[#06263a]">
                  {tile.title}
                </h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                {tile.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
