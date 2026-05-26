import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import heroBg1 from "../../assets/banners/hero-bg.png";
import heroBg2 from "../../assets/images/black1.png";
import heroBg3 from "../../assets/images/broach2.png";

const HeroSection = () => {
  // All background images
  const backgrounds = [heroBg1, heroBg2, heroBg3];

  const [currentBg, setCurrentBg] = useState(0);

  // Change background every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgrounds.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[120vh] overflow-hidden">
      {/* Background Images */}
      {backgrounds.map((bg, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            index === currentBg ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${bg})`,
          }}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-white/10 z-10"></div>

      {/* Content */}
      <div className="relative z-20 h-full flex items-center justify-center">
        <div className="text-center mt-20">
          <div className="max-w-10xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">

            {/* Small Heading */}
            <span className="uppercase text-[#8d6a28] tracking-[10px] text-[12px] font-semibold">
              ELITE CRAFTSMANSHIP
            </span>

            {/* Main Heading */}
            <h1
              className="text-[24px] md:text-[80px] leading-[1.1] tracking-[-2px] text-[#111111]"
              style={{
                fontFamily: '"Cormorant Garamond", serif',
              }}
            >
              <span>
                Timeless Masterpieces
              </span>

              <br />

              <span
                className="italic font-light text-[#444748]"
                style={{
                  fontFamily: '"Cormorant Garamond", serif',
                }}
              >
                for the Discerning
              </span>
            </h1>

            {/* Description */}
            <p className="text-[20px] md:text-[20px] leading-[1.2] text-[#555] max-w-2xl mx-auto font-light">
              Discover our curated selection of heritage-inspired
              brooches, where every piece tells a story of elegance
              and architectural precision.
            </p>

            {/* Button */}
            <div className="text-center mt-10 relative z-10">
              <Link to="/explore" className="inline-block pt-1">
                <button className="px-16 py-[22px] bg-[#262626] text-white uppercase tracking-[3px] text-[14px] hover:bg-[#8d6a28] transition-all duration-500 shadow-2xl rounded-md">
                  EXPLORE COLLECTION
                </button>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;