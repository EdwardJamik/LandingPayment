const axios = require('axios')

module.exports.createInvoice = async (req, res, next) => {
    try {
        const {type, many_id} = req.body

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

        console.log(createMonoInvoice?.data)
        if (createMonoInvoice?.data?.pageUrl) {
            res.json({ url: createMonoInvoice?.data?.pageUrl });
        } else{
            res.json('Error');

        }


    } catch (error) {
        console.error(error);
    }
};


// БАЗОВИЙ https://t.me/yanagrandamakeup_bot?start=w30504110
//
//     ПРЕМІУМ
// https://t.me/yanagrandamakeup_bot?start=w30504133