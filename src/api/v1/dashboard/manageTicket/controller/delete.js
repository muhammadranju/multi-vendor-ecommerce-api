const Ticket = require("../../../../../models/Ticket.model/Ticket.model");
const ApiError = require("../../../../../utils/ApiError");
const ApiResponse = require("../../../../../utils/ApiResponse");
const asyncHandler = require("../../../../../utils/asyncHandler");

const deleteTicketController = asyncHandler(async (req, res) => {
  // Extract ticketId from the request object
  const { ticketId } = req.params;

  // Find the ticket by ticketId
  const ticket = await Ticket.findById(ticketId);

  if (!ticket) {
    throw new ApiError(404, "Ticket not found.");
  }

  // Delete the ticket from the database
  ticket.isDeleted = true;
  await ticket.save();

  const host = req.apiHost;
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

  // Return a success response with the deleted ticket
  return res
    .status(200)
    .json(
      new ApiResponse(
        204,
        { ticket: null, links },
        "Ticket deleted successfully."
      )
    );
});

module.exports = deleteTicketController;
