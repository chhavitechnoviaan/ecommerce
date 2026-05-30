import {
  addReview,
  getReviews,
} from "../app/review.app";

exports.addReview = async (
  req,
  res
) => {
  try {
    const result =
      await reviewApp.addReview(
        req.body
      );

    return res.status(200).json({
      success: true,
      message:
        "Review submitted successfully",
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getProductReviews =
  async (req, res) => {
    try {
      const result =
        await reviewApp.getReviews(
          req.params.productId
        );

      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };