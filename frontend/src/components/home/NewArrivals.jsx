import { ArrowLeft, ArrowRight } from "lucide-react";
import Architectural from '../../assets/images/Architectural.png';
import Pearl from '../../assets/images/Pearl.png';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";
const arrivals = [
  {
    id: 1,
    name: "Architectural Series",
    subtitle: "Limited Release",
    image: Architectural,
    price: "₹12,999",
  },
  {
    id: 2,
    name: "The Pearl Statement",
    subtitle: "Signature Selection",
    image: Pearl,
    price: "₹18,499",
  },
];

export default function NewArrivals() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <section className="bg-[#f5f3f1] py-24 px-6 md:px-16">

      {/* Top Section */}
      <div className="flex items-start justify-between">

        {/* Heading */}
        <div>
          <p className="text-[14px] tracking-[4px] uppercase text-[#8a6a1d] font-medium">
            Just In
          </p>

          <h2
            className="mt-4 text-[38px] leading-none text-[#111]"
            style={{
              fontFamily: '"Cormorant Garamond", serif',
            }}
          >
            New Arrivals
          </h2>
        </div>

        {/* Arrows */}
        <div className="flex gap-4 mt-3">

          <button className="w-[38px] h-[38px] border rounded-sm border-[#9f9f9f] flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300">
            <ArrowLeft size={24} strokeWidth={1.5} />
          </button>

          <button className="w-[38px] h-[38px] border border-[#9f9f9f] flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300">
            <ArrowRight size={24} strokeWidth={1.5} />
          </button>

        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-16">

        {arrivals.map((item) => (

          <div key={item.id} className="group cursor-pointer">

            {/* IMAGE BOX */}
            <div className="relative overflow-hidden rounded-sm">

              {/* IMAGE */}
              <img
                src={item.image}
                alt={item.title}
                className="w-[950px] h-[340px] object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition duration-500" />

              {/* BUTTONS */}
              {/* <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[85%] opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 z-30">

                <button
                  onClick={() => navigate("/cartsummary")}
                  className="w-full bg-[#8b6b08] text-white py-3 text-[12px] tracking-[2px] uppercase font-medium hover:bg-black transition"
                >
                  Add To Cart
                </button>

                <button
                  onClick={() => navigate("/productcart")}
                  className="w-full mt-3 bg-black text-white py-3 text-[12px] tracking-[2px] uppercase font-medium border border-black hover:bg-white hover:text-black transition"
                >
                  Buy Now
                </button>

              </div> */}

              {/* BUTTONS */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[85%] opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 z-30">

                {/* Add To Cart */}
                <button
                  onClick={() => {
                    dispatch(
                      addToCart({
                        id: item.id,
                        name: item.name,
                        image: item.image,
                        price: item.price,
                        subtitle: item.subtitle,
                        quantity: 1,
                      })
                    );

                    navigate("/cartsummary");
                  }}
                  className="w-full bg-[#8b6b08] text-white py-3 text-[12px] tracking-[2px] uppercase font-medium hover:bg-black transition"
                >
                  Add To Cart
                </button>

                {/* Buy Now */}
                <button
                  onClick={() => {

                    const productData = {
                      id: item.id,
                      name: item.name,
                      image: item.image,
                      price: item.price,
                      oldPrice: "₹22,999",
                      badge: "25% OFF",
                      subtitle: item.subtitle,
                      quantity: 1,
                    };

                    dispatch(addToCart(productData));

                    navigate("/productcart", {
                      state: {
                        product: productData,
                      },
                    });
                  }}
                  className="w-full mt-3 bg-black text-white py-3 text-[12px] tracking-[2px] uppercase font-medium border border-black hover:bg-white hover:text-black transition"
                >
                  Buy Now
                </button>
              </div>

            </div>

            {/* Bottom Content */}
            <div className="flex items-start justify-between mt-7">

              <div>
                <h3
                  className="text-[22px] leading-tight font-serif text-[#111] transition-colors duration-300 group-hover:text-[#725B1E]"
                >
                  {item.title}
                </h3>

                <p className="mt-2 text-[15px] text-[#444]">
                  {item.subtitle}
                </p>
              </div>

              {/* Explore */}
              {/* <button
                className="mt-3 text-[12px] tracking-[2px] uppercase text-[#8a6a1d] border-b border-[#8a6a1d] pb-1 hover:opacity-70 transition"
              >
                Explore
              </button> */}
              <button
                onClick={() =>
                  navigate("/productcart", {
                    state: {
                      product: item,
                    },
                  })
                }
                className="
    mt-3
    text-[12px]
    tracking-[2px]
    uppercase
    text-[#8a6a1d]
    border-b
    border-[#8a6a1d]
    pb-1
    hover:opacity-70
    transition
  "
              >
                Explore
              </button>
            </div>

          </div>

        ))}
      </div>
    </section>
  );
}

