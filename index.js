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


async function createF() {
    const type = 0
    const createMonoInvoice = await axios.post(`https://api.monobank.ua/api/merchant/invoice/create`,
        {
            "amount": type ? 30000 : 9900,
            "ccy": 978,
            "merchantPaymInfo": {
                // "reference": "84d0070ee4e44667b31371d8f8813947",
                "destination": `${type ? 'ПРЕМІУМ' : 'Базовий тариф'}`,
            },
            "redirectUrl": "https://example.com/your/website/result/page",
            "webHookUrl": "https://example.com/mono/acquiring/webhook/maybesomegibberishuniquestringbutnotnecessarily",
            "validity": 600,
            "paymentType": "debit",
            "saveCardData": {
                "saveCard": true,
                "walletId": "69f780d841a0434aa535b08821f4822c"
            },
            "agentFeePercent": 0,
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'X-Token': `${process.env.MONO_TOKEN_API}`
            }
        })

    if (createMonoInvoice?.pageUrl) {
        console.log(createMonoInvoice)
    }
}

// createF()
