const axios = require('axios')

const paymentList = require('/models/paymentList.model')

module.exports.createInvoice = async (req, res, next) => {
    try {
        const {type, many_id} = req.body

        const createMonoInvoice = await axios.post(`https://api.monobank.ua/api/merchant/invoice/create`,
            {
                // "amount": type ? 30000 : 9900,
                "amount": type ? 10 : 10,
                // "ccy": 978,
                "ccy": 980,
                "merchantPaymInfo": {
                    // "reference": "84d0070ee4e44667b31371d8f8813947",
                    "destination": `${type ? 'ПРЕМІУМ' : 'Базовий тариф'}`,
                },
                "redirectUrl": "https://t.me/yanagrandamakeup_bot?start=w30656858",
                "webHookUrl": "https://yanagranda.pp.ua/api/v1/getPayment",
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

        if (createMonoInvoice?.data?.pageUrl) {
            console.log(createMonoInvoice?.data)
            paymentList.insertMany({ invoiceId: createMonoInvoice?.data?.invoiceId, many_id: many_id})
            res.json({ url: createMonoInvoice?.data?.pageUrl });
        } else{
            res.json('Error');
        }


    } catch (error) {
        console.error(error);
    }
};

module.exports.getPaymentStatus = async (req, res, next) => {
    try {
        const {type, many_id} = req.body


        console.log('get payment')
        console.log(req.body)


    } catch (error) {
        console.error(error);
    }
};
