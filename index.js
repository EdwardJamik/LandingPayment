const mongoose = require("mongoose");
const {app} = require("./server.js");
const axios = require("axios");

require("dotenv").config();
const PORT = process.env.PORT || 5000;


const mongoURL = process.env.DB_URL

console.log("Connecting to DB...")

mongoose.connect(mongoURL)
    .then(async () => {
        console.log("DB connection Success");
        app.listen(PORT, () => console.log(`Server running on PORT : ${PORT}`));
    }).catch(err => console.log(err));
