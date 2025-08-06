const Payments = require("../../../../../models/Payment.model/Payment.model");
const ApiError = require("../../../../../utils/ApiError");
const ApiResponse = require("../../../../../utils/ApiResponse");
const asyncHandler = require("../../../../../utils/asyncHandler");

const paymentsStarts = asyncHandler(async (req, res) => {
  // get all data from req,body or frontend (content, author, product, rating)

  // if all data is valid then create a new Object model for database
  const payments = await Payments.find();
  if (!payments.length) {
    throw new ApiError(404, "No payments found.");
  }

  const host = req.apiHost;
  const links = [
    {
      rel: "self",
      href: `${host}/users/payments/`,
      method: "GET",
      description: "Retrieve the created payments",
    },
    {
      rel: "update_payment",
      href: `${host}/users/payments/${payments._id}`,
      method: "PUT",
      description: "Update the created payments",
    },
  ];
  // return the data to frontend in json format with status 201 and success message
  return res
    .status(200)
    .json(
      new ApiResponse(200, { payments, links }, "Payment created successfully.")
    );
}); // paymentsStarts

module.exports = paymentsStarts;
