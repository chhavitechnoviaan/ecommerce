import Coupon from "../models/Coupon.js";
import Product from "../models/Product.js";

// CREATE COUPON
// export const createCoupon = async (req, res) => {

//   try {

//     const coupon = await Coupon.create(req.body);

//     res.status(201).json({
//       success: true,
//       coupon,
//     });

//   } catch (error) {

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
export const createCoupon = async (
    req,
    res
) => {
    try {
        const coupon =
            await Coupon.create(req.body);
        res.status(201).json({
            success: true,
            coupon,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// GET ALL COUPONS
export const getCoupons = async (req, res) => {

    try {

        const coupons = await Coupon.find().sort({
            createdAt: -1,
        });

        res.status(200).json({
            success: true,
            coupons,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// APPLY COUPON
// export const applyCoupon = async (req, res) => {

//     try {

//         const {
//             couponCode,
//             subtotal,
//             userId,
//         } = req.body;

//         const coupon = await Coupon.findOne({
//             couponName: couponCode.toUpperCase(),
//         });

//         // NOT FOUND
//         if (!coupon) {

//             return res.status(404).json({
//                 success: false,
//                 message: "Invalid Coupon",
//             });
//         }

//         // INACTIVE
//         if (!coupon.isActive) {

//             return res.status(400).json({
//                 success: false,
//                 message: "Coupon Inactive",
//             });
//         }

//         // EXPIRED
//         if (new Date() > new Date(coupon.expiryDate)) {

//             return res.status(400).json({
//                 success: false,
//                 message: "Coupon Expired",
//             });
//         }

//         // MINIMUM ORDER
//         if (subtotal < coupon.minimumOrder) {

//             return res.status(400).json({
//                 success: false,
//                 message: `Minimum order should be ₹${coupon.minimumOrder}`,
//             });
//         }

//         // USAGE LIMIT
//         if (coupon.usedCount >= coupon.usageLimit) {

//             return res.status(400).json({
//                 success: false,
//                 message: "Coupon Usage Limit Reached",
//             });
//         }

//         // ONE TIME USE
//         if (coupon.usedBy.includes(userId)) {

//             return res.status(400).json({
//                 success: false,
//                 message: "Coupon Already Used",
//             });
//         }

//         let discount = 0;

//         // PERCENTAGE
//         if (coupon.discountType === "PERCENTAGE") {

//             discount =
//                 (subtotal * coupon.discountValue) / 100;

//         } else {

//             discount = coupon.discountValue;
//         }

//         res.status(200).json({
//             success: true,
//             discount,
//             coupon,
//         });

//     } catch (error) {

//         res.status(500).json({
//             success: false,
//             message: error.message,
//         });
//     }
// };
export const applyCoupon = async (
  req,
  res
) => {
  try {

    const {
      couponCode,
      subtotal,
      userId,
      products,
      isFirstOrder,
    } = req.body;

    const coupon =
      await Coupon.findOne({
        couponName:
          couponCode.toUpperCase(),
      });

    if (!coupon) {

      return res.status(404).json({
        success: false,
        message: "Invalid Coupon",
      });
    }

    if (!coupon.isActive) {

      return res.status(400).json({
        success: false,
        message: "Coupon Inactive",
      });
    }

    if (
      coupon.expiryDate &&
      new Date() >
        new Date(coupon.expiryDate)
    ) {

      return res.status(400).json({
        success: false,
        message: "Coupon Expired",
      });
    }

    if (
      subtotal < coupon.minimumOrder
    ) {

      return res.status(400).json({
        success: false,
        message: `Minimum order should be ₹${coupon.minimumOrder}`,
      });
    }

    // FIRST ORDER CHECK

    if (
      coupon.usageLimitType ===
        "FIRST_ORDER_ONLY" &&
      !isFirstOrder
    ) {

      return res.status(400).json({
        success: false,
        message:
          "Coupon only for first order",
      });
    }

    // LIMITED CHECK

    if (
      coupon.usageLimitType ===
        "LIMITED"
    ) {

      if (
        coupon.usedCount >=
        coupon.usageLimit
      ) {

        return res.status(400).json({
          success: false,
          message:
            "Coupon usage limit reached",
        });
      }
    }

    // PRODUCT CHECK

    if (
      coupon.applicableType ===
      "SPECIFIC"
    ) {

      const cartProductIds =
        products.map(
          (item) => item.productId
        );

      const matched =
        coupon.applicableProducts.some(
          (id) =>
            cartProductIds.includes(
              id.toString()
            )
        );

      if (!matched) {

        return res.status(400).json({
          success: false,
          message:
            "Coupon not applicable on selected products",
        });
      }
    }

    let discount = 0;

    if (
      coupon.discountType ===
      "PERCENTAGE"
    ) {

      discount =
        (subtotal *
          coupon.discountValue) /
        100;

    } else {

      discount =
        coupon.discountValue;
    }

    res.status(200).json({
      success: true,
      discount,
      coupon,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE COUPON
export const deleteCoupon = async (
    req,
    res
) => {
    try {

        await Coupon.findByIdAndDelete(
            req.params.id
        );

        res.status(200).json({
            success: true,
            message:
                "Coupon deleted successfully",
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// GET APPLICABLE COUPONS
export const getApplicableCoupons = async (
  req,
  res
) => {
  try {

    const {
      subtotal,
      products,
      isFirstOrder,
    } = req.body;

    const coupons = await Coupon.find({
      isActive: true,
    });

    const applicableCoupons = [];

    for (const coupon of coupons) {

      // EXPIRED
      if (
        coupon.expiryDate &&
        new Date() >
          new Date(coupon.expiryDate)
      ) {
        continue;
      }

      // MIN ORDER
      if (
        subtotal < coupon.minimumOrder
      ) {
        continue;
      }

      // FIRST ORDER
      if (
        coupon.usageLimitType ===
          "FIRST_ORDER_ONLY" &&
        !isFirstOrder
      ) {
        continue;
      }

      // PRODUCT MATCH
      if (
        coupon.applicableType ===
        "SPECIFIC"
      ) {

        const cartProductIds =
          products.map(
            (item) =>
              item.productId.toString()
          );

        const matched =
          coupon.applicableProducts.some(
            (id) =>
              cartProductIds.includes(
                id.toString()
              )
          );

        if (!matched) {
          continue;
        }
      }

      // CALCULATE DISCOUNT
      let discount = 0;

      if (
        coupon.discountType ===
        "PERCENTAGE"
      ) {

        discount =
          (subtotal *
            coupon.discountValue) /
          100;

      } else {

        discount =
          coupon.discountValue;
      }

      applicableCoupons.push({
        ...coupon._doc,
        calculatedDiscount:
          discount,
      });
    }

    res.status(200).json({
      success: true,
      coupons: applicableCoupons,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};