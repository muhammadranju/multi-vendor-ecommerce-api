const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TicketSchema = new Schema(
  {
    ticketId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    productId: {
      type: String,
      required: true,
    },
    status: {
      type: String, // Enum
      required: true, // Required
    },
  },
  { timestamps: true }
);

const Ticket = mongoose.model("Ticket", TicketSchema);

module.exports = Ticket;
