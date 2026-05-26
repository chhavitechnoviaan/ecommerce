import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import { createNotification, } from "../services/notificationService.js";
import Coupon from "../models/Coupon.js";
// GENERATE RANDOM ORDER ID
const generateOrderId = () => {

  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  let result = "";

  for (let i = 0; i < 6; i++) {

    result += chars.charAt(
      Math.floor(Math.random() * chars.length)
    );
  }

  return result;
};
const generateTrackingNumber = () => {
  return (
    "TRK-" +
    Math.random().toString(36).substring(2, 10).toUpperCase()
  );
};
// PLACE ORDER
export const placeOrder = async (req, res) => {

  try {

    console.log("Order Data:", req.body);

    // const {
    //   user,
    //   items,
    //   shippingAddress,
    //   subtotal,
    //   shipping,
    //   discount,
    //   totalAmount,
    //   paymentMethod,
    // } = req.body;
    const {
      user,
      items,
      shippingAddress,
      subtotal,
      shipping,
      discount,
      totalAmount,
      paymentMethod,
      couponCode,
      discountAmount,
    } = req.body;
    // CHECK USER
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }
    // CREATE ORDER
    const order = await Order.create({
      orderId: generateOrderId(),
      trackingNumber: generateTrackingNumber(),
      user,
      items,
      shippingAddress: {
        fullName: shippingAddress.fullName,
        mobile: shippingAddress.mobile,
        email: shippingAddress.email,
        country: shippingAddress.country,
        state: shippingAddress.state,
        city: shippingAddress.city,
        zipCode: shippingAddress.zipCode,
        address: shippingAddress.address,
        landmark: shippingAddress.landmark,
      },
      subtotal,
      shipping,
      discount,
      totalAmount,
      paymentMethod,
      couponCode,
      discountAmount,
      paymentStatus:
        paymentMethod === "COD"
          ? "Pending"
          : "Paid",
    });
    if (couponCode) {

      const coupon = await Coupon.findOne({
        couponName: couponCode,
      });

      if (coupon) {

        coupon.usedCount += 1;

        coupon.usedBy.push(user);

        await coupon.save();
      }
    }
    await createNotification({
      title: "New Order Received",

      message: `${shippingAddress.fullName} placed a new order worth ₹${totalAmount}`,

      category: "Orders",

      priority: "normal",

      relatedId: order._id,

      type: "NEW_ORDER",
    });

    // FIND USER CART
    const cart = await Cart.findOne({
      user,
    });

    console.log("CART FOUND:", cart);

    // 0UPDATE CART ITEMS
    if (cart) {

      cart.items.forEach((cartItem) => {

        const orderedItem = items.find(
          (item) =>
            item.productId.toString() ===
            cartItem.productId.toString()
        );

        // ONLY ORDERED ITEMS TRUE
        if (orderedItem) {

          cartItem.orderPlaced = true;

          cartItem.orderedAt = new Date();
        }
      });

      // IMPORTANT
      cart.markModified("items");

      await cart.save();

      console.log("UPDATED CART:", cart);
    }

    res.status(200).json({
      success: true,
      message: "Order placed successfully",
      order,
    });

  } catch (error) {

    console.log(error);
    console.log(error.message);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// UPDATE ORDER STATUS
export const updateOrderStatus = async (req, res) => {

  try {

    const { orderId, status } = req.body;

    const order = await Order.findByIdAndUpdate(
      orderId,
      {
        orderStatus: status,
      },
      { new: true }
    );
    await createNotification({
      title: "Order Status Updated",

      message: `Order ${order.orderId} changed to ${status}`,

      category: "Deliveries",

      priority: "normal",

      relatedId: order._id,

      type: "ORDER_STATUS",
    });
    res.status(200).json({
      success: true,
      order,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
    });
  }
};
// GET USER ORDERS
export const getUserOrders = async (req, res) => {

  try {

    const orders = await Order.find({
      user: req.params.userId,
    })
      .populate("user", "name email phone")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
    });
  }
};

export const getAllOrders = async (req, res) => {

  try {

    const orders = await Order.find()
      .populate("user", "name email phone")
      .sort({ createdAt: -1 });

    const updatedOrders = await Promise.all(

      orders.map(async (order) => {

        // USER KE SAARE ORDERS
        const userOrders = await Order.find({
          user: order.user?._id,
        });

        // LIFETIME VALUE
        const lifetimeValue =
          userOrders.reduce(
            (acc, item) =>
              acc + item.totalAmount,
            0
          );

        // ORDER FREQUENCY
        const frequency =
          userOrders.length;

        return {

          ...order._doc,

          // DYNAMIC VALUES
          lifetime: lifetimeValue,

          frequency,

          // FALLBACKS
          trackingNumber:
            order.trackingNumber ||
            "Not Assigned",

          invoiceNumber:
            order.invoiceNumber ||
            "INV-" +
            order.orderId,

          // CUSTOMER DETAILS
          shippingAddress: {

            ...order.shippingAddress,

            phone:
              order.user?.phone || "",

            email:
              order.user?.email || "",
          },
        };
      })
    );

    res.status(200).json({
      success: true,
      orders: updatedOrders,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
    });
  }
};
export const getOrderStats = async (req, res) => {
  try {

    const totalOrders = await Order.countDocuments();

    const processingOrders =
      await Order.countDocuments({
        orderStatus: "Processing",
      });

    const deliveredOrders =
      await Order.countDocuments({
        orderStatus: "Delivered",
      });

    const revenueData = await Order.aggregate([
      {
        $group: {
          _id: null,
          total: {
            $sum: "$totalAmount",
          },
        },
      },
    ]);

    const totalRevenue =
      revenueData[0]?.total || 0;

    res.json({
      totalOrders,
      processingOrders,
      deliveredOrders,
      totalRevenue,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


export const getUserOrdersforadmin =
  async (req, res) => {

    try {

      const { userId } =
        req.body;

      if (!userId) {
        return res
          .status(400)
          .json({
            success: false,
            message:
              "User ID required",
          });
      }

      const orders =
        await Order.find({
          user: userId,
        }).sort({
          createdAt: -1,
        });

      res.status(200).json({
        success: true,
        orders,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

// GET TRANSACTIONS
export const getTransactions =
  async (req, res) => {

    try {

      const orders =
        await Order.find()
          .populate(
            "user",
            "name email phone"
          )
          .sort({
            createdAt: -1,
          });

      // SUCCESS
      const successfulPayments =
        orders.filter(
          (item) =>
            item.paymentStatus ===
            "Paid"
        );

      // PENDING
      const pendingPayments =
        orders.filter(
          (item) =>
            item.paymentStatus ===
            "Pending"
        );

      // FAILED
      const failedPayments =
        orders.filter(
          (item) =>
            item.paymentStatus ===
            "Failed"
        );

      // TOTAL REVENUE
      const totalRevenue =
        successfulPayments.reduce(
          (acc, item) =>
            acc + item.totalAmount,
          0
        );

      // FORMAT DATA
      const transactions =
        orders.map((order) => ({
          _id: order._id,

          transactionId:
            order.orderId,

          customer:
            order.user?.name ||
            order.shippingAddress
              ?.fullName,

          email:
            order.user?.email ||
            order.shippingAddress
              ?.email,

          amount:
            order.totalAmount,

          paymentMethod:
            order.paymentMethod,

          paymentStatus:
            order.paymentStatus,

          orderStatus:
            order.orderStatus,

          trackingNumber:
            order.trackingNumber,

          createdAt:
            order.createdAt,
        }));

      res.status(200).json({
        success: true,

        analytics: {
          totalRevenue,

          successfulPayments:
            successfulPayments.length,

          pendingPayments:
            pendingPayments.length,

          failedPayments:
            failedPayments.length,
        },

        transactions,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };