import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#f7f7f5] text-[#1f2d3d] px-8 md:px-16 lg:px-24 py-20">

      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* Brand */}
        <div>

          <h2
            className="text-[38px] leading-none tracking-tight mb-10"
            style={{ fontFamily: '"Cormorant Garamond", serif' }}
          >
            BROOCHES.CO
          </h2>

          <p className="text-[15px] leading-[20px] max-w-[380px] text-[#23364a] font-extralight">
            Curating architectural precision and heritage craftsmanship in the
            world’s most exquisite brooch collection.
          </p>

          <div className="mt-12 font-extralight">

            <h4 className="uppercase tracking-[4px] text-[14px] text-[#9a6b16] font-medium mb-3">
              Contact Us
            </h4>

            <p className="text-[18px] mb-2">
              concierge@brooches.co
            </p>

            <p className="text-[18px]">
              +1 (800) BROOCHES
            </p>

          </div>
        </div>

        {/* Quick Links */}
        <div>

          <h4 className="uppercase tracking-[4px] text-[14px] text-[#9a6b16] font-medium mb-4">
            Quick Links
          </h4>

          <ul className="space-y-2 text-[18px] font-extralight">

            <li>
              <Link
                to="/"
                className="hover:text-black transition"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/"
                className="hover:text-black transition"
              >
                Our Story
              </Link>
            </li>

          </ul>
        </div>

        {/* Categories */}
        <div>

          <h4 className="uppercase tracking-[4px] text-[14px] text-[#9a6b16] font-medium mb-4">
            Categories
          </h4>

          <ul className="space-y-2 text-[18px] font-extralight">

            <li>
              <Link
                to="/explore/royal-collection"
                className="hover:text-black transition"
              >
                Royal Collection
              </Link>
            </li>

            <li>
              <Link
                to="/explore/vintage-archive"
                className="hover:text-black transition"
              >
                Vintage Archive
              </Link>
            </li>

            <li>
              <Link
                to="/explore/wedding-luxe"
                className="hover:text-black transition"
              >
                Wedding Luxe
              </Link>
            </li>

            <li>
              <Link
                to="/explore/minimalist-pins"
                className="hover:text-black transition"
              >
                Minimalist Pins
              </Link>
            </li>

            <li>
              <Link
                to="/explore/limited-edition"
                className="hover:text-black transition"
              >
                Limited Edition
              </Link>
            </li>

          </ul>
        </div>

        {/* Support */}
        <div>

          <h4 className="uppercase tracking-[4px] text-[14px] text-[#9a6b16] font-medium mb-4">
            Support
          </h4>

          <ul className="space-y-2 text-[18px] font-extralight">

            <li className="hover:text-black cursor-pointer transition">
              Shipping & Returns
            </li>

            <li className="hover:text-black cursor-pointer transition">
              Care Guide
            </li>

            <li className="hover:text-black cursor-pointer transition">
              Bespoke Inquiry
            </li>

            <li className="hover:text-black cursor-pointer transition">
              Privacy Policy
            </li>

          </ul>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-gray-300 mt-10 pt-5 flex flex-col md:flex-row items-center justify-between">

        <p className="uppercase tracking-[4px] text-[12px] text-gray-400">
          © 2026 BROOCHES.CO. Crafted with elegance.
        </p>

      </div>
    </footer>
  );
}