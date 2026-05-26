import React from "react";
import royalHeritage from "../../assets/images/royal-heritage.png";
import vintageArchive from "../../assets/images/vintage-archive.png";
import weddingLuxe from "../../assets/images/wedding-luxe.png";
import { Link } from "react-router-dom";
const categoryData = [
  {
    id: 1,
    title: "Royal Heritage",
    image: royalHeritage,
  },
  {
    id: 2,
    title: "Vintage Archive",
    image: vintageArchive,
  },
  {
    id: 3,
    title: "Wedding Luxe",
    image: weddingLuxe,
  },
];

const FeaturedProducts = () => {
  return (
    <section className="w-full bg-[#f5f1f1] px-10 md:px-10 py-20">
      {/* Header */}
      <div className="text-center mb-14">
        <p className="text-[12px] tracking-[3px] text-[#725B1E] uppercase font-sans mb-3">
          The Curation
        </p>

        <h2
          className="text-[42px] md:text-[52px] text-[#1e1e1e] font-normal"
          style={{
            fontFamily: '"Cormorant Garamond", serif',
          }}
        >
          Shop by Category
        </h2>
      </div>

      {/* Cards */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoryData.map((item) => (
          <div
            key={item.id}
            className="relative h-[80vh] md:h-[80vh] overflow-hidden rounded-[2px] group cursor-pointer"
          >
            {/* Background Image */}
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/5"></div>

            {/* Content */}
            <div className="absolute bottom-7 left-7 z-10 text-white">
              <h3
                className="text-[28px] md:text-[36px] font-normal mb-2"
                style={{
                  fontFamily: '"Cormorant Garamond", serif',
                }}
              >
                {item.title}
              </h3>

              <button className="text-[11px] tracking-[1px] uppercase font-sans">
                <Link to="/explore" className="inline-block pt-1">
                Discover

                <span className="block w-[65px] h-[1px] bg-white mt-1"></span>
                </Link>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
