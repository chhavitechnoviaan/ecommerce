import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";

import category1 from "../../assets/images/category1.png";
import category2 from "../../assets/images/category2.png";
import category3 from "../../assets/images/category3.png";
import category4 from "../../assets/images/category4.png";
import category5 from "../../assets/images/category5.png";
import category6 from "../../assets/images/category6.png";
import category7 from "../../assets/images/category7.png";
import category8 from "../../assets/images/category8.png";

import { useDispatch } from "react-redux";
import {
  addToCart,
  setCart,
} from "../../redux/slices/cartSlice";
const products = [
  {
    id: 1,
    name: "Royal Pearl Brooch",
    price: "₹2,499",
    oldPrice: "₹3,332",
    rating: "4.9",
    image: category1,
    badge: "25% OFF",
  },
  {
    id: 2,
    name: "Emerald Vine Brooch",
    price: "₹4,999",
    rating: "4.8",
    image: category2,
  },
  {
    id: 3,
    name: "Celestial Star Pin",
    price: "₹3,750",
    rating: "5.0",
    image: category3,
  },
  {
    id: 4,
    name: "Heritage Crest",
    price: "₹1,890",
    rating: "4.7",
    image: category4,
  },
  {
    id: 5,
    name: "Artisan Flora Pin",
    price: "₹2,100",
    image: category5,
  },
  {
    id: 6,
    name: "Linear Silver Bar",
    price: "₹1,250",
    image: category6,
  },
  {
    id: 7,
    name: "Modern Deco Crest",
    price: "₹5,400",
    image: category7,
  },
  {
    id: 8,
    name: "Snowflake Cluster",
    price: "₹8,990",
    image: category8,
  },
  {
    id: 9,
    name: "Royal Pearl Brooch",
    price: "₹2,499",
    oldPrice: "₹3,332",
    rating: "4.9",
    image: category1,
    badge: "25% OFF",
  },
  {
    id: 10,
    name: "Emerald Vine Brooch",
    price: "₹4,999",
    rating: "4.8",
    image: category2,
  },
  {
    id: 11,
    name: "Celestial Star Pin",
    price: "₹3,750",
    rating: "5.0",
    image: category3,
  },
  {
    id: 12,
    name: "Heritage Crest",
    price: "₹1,890",
    rating: "4.7",
    image: category4,
  },
  {
    id: 13,
    name: "Artisan Flora Pin",
    price: "₹2,100",
    image: category5,
  },
  {
    id: 14,
    name: "Linear Silver Bar",
    price: "₹1,250",
    image: category6,
  },
  {
    id: 15,
    name: "Modern Deco Crest",
    price: "₹5,400",
    image: category7,
  },
  {
    id: 16,
    name: "Snowflake Cluster",
    price: "₹8,990",
    image: category8,
  },
];


export default function ExploreNow() {
  const dispatch = useDispatch();

  const handleAddToCart = async (
    product
  ) => {

    try {

      // const user = JSON.parse(
      //   localStorage.getItem("user")
      // );
      const storedUser =
  localStorage.getItem("user");

const user = storedUser
  ? JSON.parse(storedUser)
  : null;

      // IF USER LOGGED IN
      if (user) {

        const response = await axios.post(
          "${import.meta.env.VITE_API_URL}/api/cart/add",
          {
            userId: user.id,

            product: {
              productId: product.id,
              name: product.name,
              image: product.image,
              price: product.price,
              quantity: 1,
            },
          }
        );

        dispatch(
          setCart(
            response.data.cartItems
          )
        );

      } else {

        // GUEST USER
        dispatch(
          addToCart({
            productId: product.id,
            name: product.name,
            image: product.image,
            price: product.price,
            quantity: 1,
          })
        );

      }

    } catch (error) {

      console.log(
        error.response?.data ||
        error.message
      );

    }
  };
  const [openSort, setOpenSort] = useState(false);
  const [visibleProducts, setVisibleProducts] = useState(8);
  const [quantities, setQuantities] = useState({});

  const navigate = useNavigate();
  const { category } = useParams();

  const handleLoadMore = () => {
    setVisibleProducts((prev) => prev + 4);
  };
  const updateQuantity = (id, type) => {
    setQuantities((prev) => {
      const currentQty = prev[id] || 1;

      return {
        ...prev,
        [id]:
          type === "increase"
            ? currentQty + 1
            : currentQty > 1
              ? currentQty - 1
              : 1,
      };
    });
  };
  return (
    <div className="bg-[#f6f4f4] min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <section className="w-full flex items-center justify-center px-6 py-32">
        <div className="text-center max-w-5xl">
          <div className="mb-10 flex items-center justify-center gap-2 text-[12px] tracking-[4px] uppercase font-medium">
            <span className="text-[#1f2f46]">Home</span>
            <span className="text-[#1f2f46]">/</span>

            <span className="text-[#1f2f46]">Collections</span>
            <span className="text-[#1f2f46]">/</span>

            <span className="text-[#a67c00]">
              {category || "Marketplace"}
            </span>
          </div>

          <h1
            className="text-[#111] text-[30px] md:text-[72px] leading-none font-medium"
            style={{
              fontFamily: '"Cormorant Garamond", serif',
            }}
          >
            Luxury Brooch Collections
          </h1>

          <p className="mt-8 mx-auto max-w-3xl text-[#2f3b46] text-[20px] leading-[1.5] font-light">
            Discover a curated assembly of masterfully crafted pieces.
            From heritage-inspired heirlooms to avant-garde contemporary
            designs, each brooch is a testament to the artisan's soul.
          </p>
        </div>
      </section>

      <div className="min-h-screen bg-[#f7f5f3] px-10 py-5">
        {/* SORT SECTION */}
        <div className="flex items-center justify-end px-12 py-6">
          <div className="relative flex items-center gap-6 border-l border-[#ddd6cc] pl-10">
            <span className="text-[12px] tracking-[3px] uppercase text-[#6e665e]">
              Sort By:
            </span>

            <button
              onClick={() => setOpenSort(!openSort)}
              className="group flex items-center gap-4 text-[15px] tracking-[3px] uppercase text-[#3e3a35]"
            >
              <span>Popularity</span>

              <ChevronDown
                size={18}
                className={`transition-transform duration-500 ${openSort ? "rotate-180" : ""
                  }`}
              />
            </button>

            {/* DROPDOWN */}
            <div
              className={`absolute right-0 top-[60px] w-[260px] bg-[#f7f5f2] border border-[#d8d1c7] shadow-[0_15px_40px_rgba(0,0,0,0.06)] overflow-hidden transition-all duration-500 origin-top ${openSort
                ? "opacity-100 visible translate-y-0"
                : "opacity-0 invisible -translate-y-3"
                }`}
            >
              <button className="w-full text-left px-6 py-4 uppercase tracking-[2px] text-[14px] bg-[#2f6fcc] text-white">
                Popularity
              </button>

              <button className="w-full text-left px-6 py-4 uppercase tracking-[2px] text-[14px] hover:bg-[#efe9de] transition">
                Newest
              </button>

              <button className="w-full text-left px-6 py-4 uppercase tracking-[2px] text-[14px] hover:bg-[#efe9de] transition">
                Price: Low To High
              </button>

              <button className="w-full text-left px-6 py-4 uppercase tracking-[2px] text-[14px] hover:bg-[#efe9de] transition">
                Price: High To Low
              </button>
            </div>
          </div>
        </div>

        {/* PRODUCT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {products.slice(0, visibleProducts).map((product) => (
            <div key={product.id} className="group cursor-pointer">
              {/* IMAGE BOX */}
              <div className="relative overflow-hidden bg-[#ece8e3]">
                {/* DISCOUNT BADGE */}
                {product.badge && (
                  <div className="absolute top-4 right-4 z-20 bg-[#d7b780] text-[9px] tracking-[1px] text-white px-3 py-1">
                    {product.badge}
                  </div>
                )}

                {/* IMAGE */}
                <div className="overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-[340px] object-cover transition-all duration-700 group-hover:scale-110"
                  />
                </div>

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#a67c34]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />

                {/* BUTTONS */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[85%] opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 z-30">

                  <button
                    onClick={() =>
                      handleAddToCart(product)
                    }

                    className="w-full bg-[#8b6b08] text-white py-3 text-[12px] tracking-[1px] uppercase font-medium hover:bg-black transition"
                  >
                    Add To Cart
                  </button>

                  {/* BUY NOW */}
                  <button
                    onClick={() =>
                      navigate("/productcart", {
                        state: {
                          product: {
                            ...product,
                            quantity: quantities[product.id] || 1,
                          },
                        },
                      })
                    }
                    className="w-full mt-2 bg-black text-white py-3 text-[12px] tracking-[1px] uppercase font-medium border border-black hover:bg-white hover:text-black transition"
                  >
                    Buy Now
                  </button>
                </div>
              </div>

              {/* PRODUCT INFO */}
              <div className="mt-4">
                <div className="flex items-start justify-between">
                  <h3
                    className="text-[33px] leading-none text-[#4d433b] font-light"
                    style={{
                      fontFamily: "Cormorant Garamond, serif",
                    }}
                  >
                    {product.name}
                  </h3>

                  {product.rating && (
                    <div className="flex items-center gap-1 mt-1 text-[11px] text-[#7a6d61]">
                      <span className="text-[#9c7c20]">★</span>
                      {product.rating}
                    </div>
                  )}
                </div>

                <div className="mt-3 flex items-center gap-3">
                  <span className="text-[16px] font-semibold text-[#1f1f1f]">
                    {product.price}
                  </span>

                  {product.oldPrice && (
                    <span className="text-[#9f9488] line-through text-[13px]">
                      {product.oldPrice}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* LOAD MORE BUTTON */}
        {visibleProducts < products.length && (
          <div className="flex justify-center mt-16">
            <button
              onClick={handleLoadMore}
              className="border border-[#a8893b] text-[#8f6f1f] uppercase tracking-[2px] text-[11px] px-10 py-4 hover:bg-[#8f6f1f] hover:text-white transition duration-300"
            >
              Load More
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}












