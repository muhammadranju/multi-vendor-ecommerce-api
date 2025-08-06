const router = require("express").Router();

// ticket routes
const ticketRoutes = require("./ticket.routes/ticket.routes");
// starts routes
const startsRoutes = require("./starts.routes/starts.routes");

// dashboard routes [tickets, starts]
router.use([ticketRoutes, startsRoutes]);

module.exports = router;
