const { createInvoice} = require("../controllers/payment.controller");
const router = require("express").Router();

router.post("/create", createInvoice);

module.exports = router;