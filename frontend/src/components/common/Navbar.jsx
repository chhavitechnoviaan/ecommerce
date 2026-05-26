// import React, { useState } from "react";

// import { Link, useNavigate } from "react-router-dom";

// import {
//   Search,
//   ShoppingBag,
//   ChevronDown,
// } from "lucide-react";

// import { useSelector } from "react-redux";

// import Account from "../../pages/user/Account";

// const Navbar = () => {

//   const navigate = useNavigate();

//   const [showBadges, setShowBadges] =
//     useState(false);

//   const [showBrooches, setShowBrooches] =
//     useState(false);

//   const cartItems = useSelector(
//     (state) => state.cart.cartItems
//   );

//   // BADGES CATEGORIES
//   const categoriesBadges = [
//     "New Arrival",
//     "Pop Culture & Fandom",
//     "Gaming & Anime",
//     "Music & Band",
//     "Motivational & Quotes",
//     "Travel & Adventure",
//     "Aesthetic & Minimal",
//     "Custom & Personalize",
//   ];

//   // BROOCHES CATEGORIES
//   const categoriesBroaches = [
//     "New Arrival",
//     "Floral & Botanical",
//     "Vintage & Antique",
//     "Animal & Nature",
//     "Geometric & Abstract",
//     "Festive & Seasonal",
//     "Pearl & Crystal",
//     "Luxury Statement",
//   ];

//   return (
//     <header className="fixed top-0 left-0 w-full z-50 bg-[#f8f6f3] border-b border-[#e7e1d9]">

//       <div className="max-w-[1750px] mx-auto px-14 py-6 flex items-center justify-between">

//         {/* LEFT */}
//         <div className="flex items-center gap-20">

//           {/* LOGO */}
//           <Link
//             to="/"
//             className="text-3xl font-normal"
//             style={{
//               fontFamily:
//                 '"Bodoni Moda", serif',
//             }}
//           >
//             BROOCHES.CO
//           </Link>

//           {/* MENU */}
//           <nav className="hidden md:flex items-center gap-8">

//             {/* HOME */}
//             <Link
//               to="/"
//               className="text-[#8b6a2c] text-[15px] uppercase tracking-[2px] font-medium"
//             >
//               Home
//             </Link>

//             {/* BADGES */}
//             <div
//               className="relative"
//               onMouseEnter={() =>
//                 setShowBadges(true)
//               }
//               onMouseLeave={() =>
//                 setShowBadges(false)
//               }
//             >

//               <div className="flex items-center gap-2 cursor-pointer">

//                 <span className="text-[15px] tracking-[2px] text-[#333] uppercase">
//                   Badges
//                 </span>

//                 <ChevronDown size={15} />

//               </div>

//               {showBadges && (

//                 <div className="absolute top-full left-0 pt-2 z-50">

//                   <div className="w-[260px] bg-white shadow-2xl border border-[#ece7df] py-4 rounded-md">

//                     {categoriesBadges.map(
//                       (item, index) => (

//                         <Link
//                           key={index}
//                           to={`/explore/${item
//                             .toLowerCase()
//                             .replace(/\s+/g, "-")}`}
//                           className="block px-6 py-3 text-[14px] tracking-[1px] text-[#444] hover:bg-[#f7f3ee] hover:text-[#8b6a2c] transition-all duration-300"
//                         >
//                           {item}
//                         </Link>
//                       )
//                     )}

//                   </div>

//                 </div>
//               )}
//             </div>

//             {/* BROOCHES */}
//             <div
//               className="relative"
//               onMouseEnter={() =>
//                 setShowBrooches(true)
//               }
//               onMouseLeave={() =>
//                 setShowBrooches(false)
//               }
//             >

//               <div className="flex items-center gap-2 cursor-pointer">

//                 <span className="text-[15px] tracking-[2px] text-[#333] uppercase">
//                   Brooches
//                 </span>

//                 <ChevronDown size={15} />

//               </div>

//               {showBrooches && (

//                 <div className="absolute top-full left-0 pt-2 z-50">

//                   <div className="w-[260px] bg-white shadow-2xl border border-[#ece7df] py-4 rounded-md">

//                     {categoriesBroaches.map(
//                       (item, index) => (

//                         <Link
//                           key={index}
//                           to={`/explore/${item
//                             .toLowerCase()
//                             .replace(/\s+/g, "-")}`}
//                           className="block px-6 py-3 text-[14px] tracking-[1px] text-[#444] hover:bg-[#f7f3ee] hover:text-[#8b6a2c] transition-all duration-300"
//                         >
//                           {item}
//                         </Link>
//                       )
//                     )}

//                   </div>

//                 </div>
//               )}
//             </div>

//             {/* CONTACT */}
//             <Link
//               to="/contact"
//               className="text-[15px] tracking-[2px] text-[#333] uppercase"
//             >
//               Contact Us
//             </Link>

//           </nav>
//         </div>

//         {/* RIGHT */}
//         <div className="flex items-center gap-8">

//           {/* SEARCH */}
//           <button>
//             <Search
//               size={23}
//               strokeWidth={1.5}
//             />
//           </button>

//           {/* ACCOUNT */}
//           <Account />

//           {/* CART */}
//           <button
//             className="relative"
//             onClick={() =>
//               navigate("/cartsummary")
//             }
//           >

//             <ShoppingBag
//               size={23}
//               strokeWidth={1.5}
//             />

//             <span
//               className="
//                 absolute
//                 -top-2
//                 -right-2
//                 bg-[#8b6a2c]
//                 text-white
//                 text-[10px]
//                 rounded-full
//                 w-5
//                 h-5
//                 flex
//                 items-center
//                 justify-center
//               "
//             >
//               {cartItems.length}
//             </span>

//           </button>

//         </div>
//       </div>
//     </header>
//   );
// };

// export default Navbar;


import React, {
  useState,
  useEffect,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  Search,
  ShoppingBag,
  ChevronDown,
} from "lucide-react";

import {
  useSelector,
  useDispatch,
} from "react-redux";

import axios from "axios";

import Account from "../../pages/user/Account";

import {
  setCart,
} from "../../redux/slices/cartSlice";

const Navbar = () => {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [showBadges, setShowBadges] =
    useState(false);

  const [showBrooches, setShowBrooches] =
    useState(false);

  const cartItems = useSelector(
    (state) => state.cart.cartItems
  );

  // FETCH CART FROM API
  useEffect(() => {

    const fetchCart = async () => {

      try {

        // const user = JSON.parse(
        //   localStorage.getItem("user")
        // );
        const storedUser =
          localStorage.getItem("user");

        const user = storedUser
          ? JSON.parse(storedUser)
          : null;
        if (!user) return;

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/cart/${user.id}`
        );

        if (response.data.success) {

          dispatch(
            setCart(
              response.data.cartItems
            )
          );
        }

      } catch (error) {

        console.log(error);

      }
    };

    fetchCart();

  }, [dispatch]);

  // BADGES CATEGORIES
  const categoriesBadges = [
    "New Arrival",
    "Pop Culture & Fandom",
    "Gaming & Anime",
    "Music & Band",
    "Motivational & Quotes",
    "Travel & Adventure",
    "Aesthetic & Minimal",
    "Custom & Personalize",
  ];

  // BROOCHES CATEGORIES
  const categoriesBroaches = [
    "New Arrival",
    "Floral & Botanical",
    "Vintage & Antique",
    "Animal & Nature",
    "Geometric & Abstract",
    "Festive & Seasonal",
    "Pearl & Crystal",
    "Luxury Statement",
  ];

  // TOTAL QUANTITY
  const totalCartItems =
    cartItems.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );

  return (

    <header className="fixed top-0 left-0 w-full z-50 bg-[#f8f6f3] border-b border-[#e7e1d9]">

      <div className="max-w-[1750px] mx-auto px-14 py-6 flex items-center justify-between">

        {/* LEFT */}
        <div className="flex items-center gap-20">

          {/* LOGO */}
          <Link
            to="/"
            className="text-3xl font-normal"
            style={{
              fontFamily:
                '"Bodoni Moda", serif',
            }}
          >
            BROOCHES.CO
          </Link>

          {/* MENU */}
          <nav className="hidden md:flex items-center gap-8">

            {/* HOME */}
            <Link
              to="/"
              className="text-[#8b6a2c] text-[15px] uppercase tracking-[2px] font-medium"
            >
              Home
            </Link>

            {/* BADGES */}
            <div
              className="relative"
              onMouseEnter={() =>
                setShowBadges(true)
              }
              onMouseLeave={() =>
                setShowBadges(false)
              }
            >

              <div className="flex items-center gap-2 cursor-pointer">

                <span className="text-[15px] tracking-[2px] text-[#333] uppercase">
                  Badges
                </span>

                <ChevronDown size={15} />

              </div>

              {showBadges && (

                <div className="absolute top-full left-0 pt-2 z-50">

                  <div className="w-[260px] bg-white shadow-2xl border border-[#ece7df] py-4 rounded-md">

                    {categoriesBadges.map(
                      (item, index) => (

                        <Link
                          key={index}
                          to={`/explore/${item
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                          className="block px-6 py-3 text-[14px] tracking-[1px] text-[#444] hover:bg-[#f7f3ee] hover:text-[#8b6a2c] transition-all duration-300"
                        >
                          {item}
                        </Link>

                      )
                    )}

                  </div>

                </div>

              )}

            </div>

            {/* BROOCHES */}
            <div
              className="relative"
              onMouseEnter={() =>
                setShowBrooches(true)
              }
              onMouseLeave={() =>
                setShowBrooches(false)
              }
            >

              <div className="flex items-center gap-2 cursor-pointer">

                <span className="text-[15px] tracking-[2px] text-[#333] uppercase">
                  Brooches
                </span>

                <ChevronDown size={15} />

              </div>

              {showBrooches && (

                <div className="absolute top-full left-0 pt-2 z-50">

                  <div className="w-[260px] bg-white shadow-2xl border border-[#ece7df] py-4 rounded-md">

                    {categoriesBroaches.map(
                      (item, index) => (

                        <Link
                          key={index}
                          to={`/explore/${item
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                          className="block px-6 py-3 text-[14px] tracking-[1px] text-[#444] hover:bg-[#f7f3ee] hover:text-[#8b6a2c] transition-all duration-300"
                        >
                          {item}
                        </Link>

                      )
                    )}

                  </div>

                </div>

              )}

            </div>

            {/* CONTACT */}
            <Link
              to="/contact"
              className="text-[15px] tracking-[2px] text-[#333] uppercase"
            >
              Contact Us
            </Link>

          </nav>

        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-8">

          {/* SEARCH */}
          <button>
            <Search
              size={23}
              strokeWidth={1.5}
            />
          </button>

          {/* ACCOUNT */}
          <Account />

          {/* CART */}
          <button
            className="relative"
            onClick={() =>
              navigate("/cartsummary")
            }
          >

            <ShoppingBag
              size={23}
              strokeWidth={1.5}
            />

            {/* CART COUNT */}
            {totalCartItems > 0 && (

              <span
                className="
                  absolute
                  -top-2
                  -right-2
                  bg-[#8b6a2c]
                  text-white
                  text-[10px]
                  rounded-full
                  min-w-[20px]
                  h-5
                  px-1
                  flex
                  items-center
                  justify-center
                  font-medium
                "
              >
                {totalCartItems}
              </span>

            )}

          </button>

        </div>

      </div>

    </header>

  );
};

export default Navbar;