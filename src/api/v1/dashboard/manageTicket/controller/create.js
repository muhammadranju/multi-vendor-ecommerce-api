const Ticket = require("../../../../../models/Ticket.model/Ticket.model");
const ApiResponse = require("../../../../../utils/ApiResponse");
const asyncHandler = require("../../../../../utils/asyncHandler");
const validateFieldsCheck = require("../../../../../utils/validateFieldsCheck");

const createTicketController = asyncHandler(async (req, res) => {
  // Extract data from the frontend or request body
  const { ticketId, userId, productId, status } = req.body;

  // Validate the received data for correctness
  // This step could involve checking for required fields and data formats
  // It ensures that the received data is properly structured and conforms to expectations
  validateFieldsCheck(req.body, ["ticketId", "userId", "productId", "status"]);

  // Create a new Ticket object
  const ticket = new Ticket({
    ticketId,
    userId,
    productId,
    status,
  });

  // Save the Ticket object to the database
  await ticket.save();

  // Return a success response with the created Ticket
  const host = req.apiHost;
  const links = [
    {
      rel: "self",
      href: `${host}/tickets/tickets/${ticket._id}`,
      method: "GET",
      description: "Get tickets",
    },
    {
      rel: "update_ticket",
      href: `${host}/tickets/tickets/${ticket._id}`,
      method: "PUT",
      description: "Update tickets",
    },
  ];

  return res
    .status(200)
    .json(
      new ApiResponse(200, { ticket, links }, "Ticket created successfully.")
    );
});

module.exports = createTicketController;
