const Orders = require("../../../../../models/Orders.model/Orders.model");
const ApiError = require("../../../../../utils/ApiError");
const ApiResponse = require("../../../../../utils/ApiResponse");
const asyncHandler = require("../../../../../utils/asyncHandler");

const orderStarts = asyncHandler(async (req, res) => {
  // get all data from req,body or frontend (content, author, product, rating)

  // if all data is valid then create a new Object model for database
  const orders = await Orders.find();
  if (!orders.length) {
    throw new ApiError(404, "No orders found.");
  }

  const host = req.apiHost;
  const links = [
    {
      rel: "self",
      href: `${host}/users/orders/`,
      method: "GET",
      description: "Retrieve the created orders",
    },
    {
      rel: "update_order",
      href: `${host}/users/orders/${orders._id}`,
      method: "PUT",
      description: "Update the created orders",
    },
  ];
  // return the data to frontend in json format with status 201 and success message
  return res
    .status(200)
    .json(
      new ApiResponse(200, { orders, links }, "Order created successfully.")
    );
});

module.exports = orderStarts;
