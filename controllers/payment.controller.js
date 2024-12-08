const axios = require('axios')
const PaymentListModel = require('../models/paymentList.model');

module.exports.createInvoice = async (req, res, next) => {
    try {
        const {type, price, title, many_id} = req.query;

        const createMonoInvoice = await axios.post(`https://api.monobank.ua/api/merchant/invoice/create`,
            {
                "amount": parseInt(price),
                // "amount": type ? 1 : 1,
                // "ccy": 978,
                "ccy": 980,
                "merchantPaymInfo": {
                    // "reference": "84d0070ee4e44667b31371d8f8813947",
                    "destination": title,
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
            await PaymentListModel.insertMany({ invoiceId: createMonoInvoice?.data?.invoiceId, many_id: many_id})
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
        const {status,invoiceId} = req.query;

        if(status === 'success'){
            const findManyUserId = await PaymentListModel.findOne({invoiceId:invoiceId})
            await axios.post(`https://api.manychat.com/fb/subscriber/setCustomField`,
                {
                    "subscriber_id": `${findManyUserId?.many_id}`,
                    "field_id": 11858117,
                    "field_value": "success",
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer 1866595:015f2ff67486adebc681fbef32ae4902`
                    }
                })
        } else if(status === 'failed' || status === 'fail'){
            const findManyUserId = await PaymentListModel.findOne({invoiceId:invoiceId})
            await axios.post(`https://api.manychat.com/fb/subscriber/setCustomField`,
                {
                    "subscriber_id": `${findManyUserId?.many_id}`,
                    "field_id": 11858117,
                    "field_value": "failed"
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer 1866595:015f2ff67486adebc681fbef32ae4902`
                    }
                })
        }
        // console.log('get payment')
        // console.log(req.body)


    } catch (error) {
        console.error(error);
    }
};
