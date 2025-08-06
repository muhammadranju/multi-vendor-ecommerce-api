const Ticket = require("../../../../../models/Ticket.model/Ticket.model");
const ApiError = require("../../../../../utils/ApiError");
const ApiResponse = require("../../../../../utils/ApiResponse");
const asyncHandler = require("../../../../../utils/asyncHandler");
const { ApiVersion } = require("../../../../../constants");

const updateTicketController = asyncHandler(async (req, res) => {
  // Extract ticketId from the request object
  const { ticketId } = req.params;

  // Find the ticket by ticketId
  const ticket = await Ticket.findById(ticketId);

  if (!ticket) {
    throw new ApiError(404, "Ticket not found.");
  }

  // Update the ticket in the database
  ticket.ticketId = req.body.ticketId ?? ticket.ticketId;
  ticket.userId = req.body.userId ?? ticket.userId;
  ticket.productId = req.body.productId ?? ticket.productId;
  ticket.status = req.body.status ?? ticket.status;

  await ticket.save();

  const host = `${req.myHost}${ApiVersion}`;
  const links = [
    {
      rel: "self",
      href: `${host}/tickets/tickets/${ticketId}`,
      method: "GET",
      description: "Get tickets",
    },
    {
      rel: "update_ticket",
      href: `${host}/tickets/tickets/${ticketId}`,
      method: "PUT",
      description: "Update tickets",
    },
  ];

  // Return a success response with the updated ticket
  return res
    .status(200)
    .json(
      new ApiResponse(200, { ticket, links }, "Ticket updated successfully.")
    );
});

module.exports = updateTicketController;
