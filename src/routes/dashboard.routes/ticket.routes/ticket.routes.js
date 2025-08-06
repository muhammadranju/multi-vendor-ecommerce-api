const { ROLES } = require("../../../constants");
const { authMiddleware } = require("../../../middleware/auth.middleware");

const {
  controller: ticket,
} = require("../../../api/v1/dashboard/manageTicket");
const router = require("express").Router();

router
  .route("/tickets")
  .post(authMiddleware(ROLES.CUSTOMER), ticket.createTicketController);
router
  .route("/tickets")
  .get(authMiddleware(ROLES.CUSTOMER), ticket.findAllTicketsController);
router
  .route("/tickets/:ticketId")
  .patch(authMiddleware(ROLES.CUSTOMER), ticket.updateTicketController);
router
  .route("/tickets/:ticketId")
  .delete(authMiddleware(ROLES.CUSTOMER), ticket.deleteTicketController);

module.exports = router;
