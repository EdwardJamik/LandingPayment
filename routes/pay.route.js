const { createInvoice, getPaymentStatus} = require("../controllers/payment.controller");
const router = require("express").Router();

router.post("/create", createInvoice);
router.post("/getPayment", getPaymentStatus);

module.exports = router;