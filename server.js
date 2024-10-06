const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const cors = require("cors");
const paymentController = require('./routes/pay.route')

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());

app.use(cors({
    origin: true,
    credentials: true,
}));

app.use('/api/pay/', paymentController);

module.exports.app = app;