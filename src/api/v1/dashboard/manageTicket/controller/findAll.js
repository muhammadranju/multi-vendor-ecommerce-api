const Ticket = require("../../../../../models/Ticket.model/Ticket.model");
const ApiError = require("../../../../../utils/ApiError");
const ApiResponse = require("../../../../../utils/ApiResponse");
const asyncHandler = require("../../../../../utils/asyncHandler");

const findAllTicketsController = asyncHandler(async (req, res) => {
  // get all data from req,body or frontend (content, author, product, rating)
  const userId = req.user?.userId;

  // if all data is valid then create a new Object model for database
  const tickets = await Ticket.find({ userId });
  if (!tickets.length) {
    throw new ApiError(404, "No tickets found.");
  }

  const host = req.apiHost;
  const links = [
    {
      rel: "self",
      href: `${host}/tickets/tickets/`,
      method: "GET",
      description: "Retrieve the created tickets",
    },
    {
      rel: "update_ticket",
      href: `${host}/tickets/tickets/${tickets._id}`,
      method: "PUT",
      description: "Update the created tickets",
    },
  ];
  // return the data to frontend in json format with status 201 and success message
  return res
    .status(200)
    .json(
      new ApiResponse(200, { tickets, links }, "Ticket created successfully.")
    );
}); // findAllTicketsController

module.exports = findAllTicketsController;
