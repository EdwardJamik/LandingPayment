const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    invoiceId: {
        type: String
    },
    chat_id: {
        type: String
    },
    many_id: {
        type: String
    },
},{timestamps:true})

module.exports = mongoose.model("payments", paymentSchema);
