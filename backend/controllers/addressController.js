// import Address from "../models/address.js";


// // ADD ADDRESS
// export const createAddress = async (
//   req,
//   res
// ) => {
//   try {
//     const userId = req.user.id;

//     const newAddress =
//       await Address.create({
//         userId,
//         ...req.body,
//       });

//     res.status(201).json({
//       success: true,
//       address: newAddress,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };


// // GET USER ADDRESSES
// export const getUserAddresses = async (
//   req,
//   res
// ) => {
//   try {
//     const userId = req.user.id;

//     const addresses =
//       await Address.find({ userId }).sort({
//         createdAt: -1,
//       });

//     res.status(200).json({
//       success: true,
//       addresses,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };


// // DELETE ADDRESS
// export const deleteAddress = async (
//   req,
//   res
// ) => {
//   try {
//     await Address.findByIdAndDelete(
//       req.params.id
//     );

//     res.status(200).json({
//       success: true,
//       message: "Address deleted",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };


import Address from "../models/Address.js";

export const createAddress = async (
  req,
  res
) => {
  try {

    const {
      fullName,
      mobile,
      alternateMobile,
      email,
      country,
      state,
      city,
      zipCode,
      address,
      landmark,
      addressType,
      isDefault,
    } = req.body;

    const newAddress = new Address({
      user: req.user._id,

      fullName,
      mobile,
      alternateMobile,
      email,
      country,
      state,
      city,
      zipCode,
      address,
      landmark,
      addressType,
      isDefault,
    });

    await newAddress.save();

    res.status(201).json({
      success: true,
      message: "Address Saved",
      address: newAddress,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getUserAddresses = async (
  req,
  res
) => {
  try {

    const addresses =
      await Address.find({
        user: req.user._id,
      }).sort({ createdAt: -1 });

    res.json({
      success: true,
      addresses,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const deleteAddress = async (
  req,
  res
) => {
  try {

    await Address.findByIdAndDelete(
      req.params.id
    );

    res.json({
      success: true,
      message: "Address Deleted",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};