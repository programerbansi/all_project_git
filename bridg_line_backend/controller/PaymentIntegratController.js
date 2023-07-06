const { getListFunction, getListIdFunction, sendEmail } = require('../function/QueryFunction');
const Invoice = require('../models/invoice');
const Login = require('../models/login');
const Notification = require('../models/notification');
const Payment = require('../models/payment');
const { validateStripePayment } = require('../validator/Validator');
const crypto = require("crypto");
exports.createPayment = async function (req, res) {
    const { error, value } = validateStripePayment(req.body);
    if (error) {
        await res.status(422).send({ 'status': false, 'code': 422, 'message': error, 'error': 'Error!' })
    }
    else {
        const { card_number, exp_month, exp_year, cvc, email, name, amount, user_id, invoice_id, status ,invoice_name} = req.body;
        Payment.getStatus1(async function (err, r1) {
            if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
            else {
                if (r1.length > 0) {
                    const stripe = require('stripe')(`${r1[0].secret_key}`);
                    const decText = decrypt(card_number, process.env.CARD_PASSWORD)
                    let decText1 = decText.split(" ").join("");
                     stripe.tokens.create({
                        card: {
                            number: decText1,
                            exp_month: exp_month,
                            exp_year: exp_year,
                            cvc: cvc,   
                        },
                    },function(err, token) {
                        if(err) {return res.status(400).send({ 'status': false, 'code': 400, 'message': err.message, 'error': 'Error!' })}
                        else {
                            console.log(token,"********token*-*************")
                            stripe.customers.create({
                                email: email,
                                name: name,
                                source: token.id
                            },function(err, customer) {
                                if(err) {return res.status(400).send({ 'status': false, 'code': 400, 'message': err.message, 'error': 'Error!' })}
                                else {
                                    console.log(customer,"-------------customer----------")
                                    stripe.charges.create({
                                        amount: amount * 100,   
                                        currency: 'inr',
                                        customer: customer.id,
                
                                    },function(err, charge) {
                                        if(err) {return res.status(400).send({ 'status': false, 'code': 400, 'message': err.message, 'error': 'Error!' })}
                                        else {
                                            console.log(charge,"*-----------charge*-----------")
                                            stripe.customers.retrieve(
                                                charge.customer,function(err, customer_detail) {
                                                    if(err) {return res.status(400).send({ 'status': false, 'code': 400, 'message': err.message, 'error': 'Error!' })}
                                                    else {
                                                        let amount1 = charge.amount / 100
                                                        let data = { user_id: user_id, payment_id: charge.id, o_name: customer_detail.name, o_email: customer_detail.email, payment_type: charge.payment_method_details.type, payment_status: charge.paid == true ? "Paid" : "Incomplet", pay_amount: amount1 }
                                                        Payment.addOrder(data, function (err, r1) {
                                                            if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                                                            else {
                                                                console.log(r1,"--------r1")
                                                                Invoice.updateInvoiceStatus(invoice_id, req.body, function (err, r1) {
                                                                    if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                                                                    else {
                                                                        return res.status(200).send({ 'status': true, 'code': 200, 'message': "Payment succesfully." })
                                                                    }
                                                                })
                                                                Login.userId(user_id, function (err, result) {
                                                                    if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                                                                    else {
                                                                        if (result.length > 0) 
                                                                        {
                                                                            Notification.getCompletedStatus(function (err, result1) {
                                                                                if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                                                                                else {
                                                                                    sendEmail(result[0].email, result1[0].subject, `${invoice_name} ${result1[0].html1}`)
                                                                                }
                                                                            })
                                                                        }
                                                                    }
                                                                })
                                                            }
                                                        })
                                                    }}
                                            );

                                        }
                                    });
                                   
                                }
                            });
                        }
                    });
                                 }
                else{
                    return res.status(400).send({ 'status': false, 'code': 400, 'message': "Admin not added payment method.Please try again later.", 'error': 'Error!' })
                }
            }
        })
    }

}
exports.SuccessPayment = async function (req, res) {
    try {
        Payment.getDataId(async function (err, r1) {
            if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
            else {
                if (r1.length > 0) {
                    const stripe = require('stripe')(`${r1[0].secret_key}`);
                    const { id, user_id, session_id } = req.params;
                    const status = { status: 'Completed' }
                    const pay = await stripe.checkout.sessions.retrieve(session_id);
                    let amount = pay.amount_total / 100
                    let data = { user_id: user_id, payment_id: pay.payment_intent, o_name: pay.customer_details.name, o_email: pay.customer_details.email, payment_type: pay.payment_method_types[0], payment_status: pay.payment_status, pay_amount: amount }
                    Payment.addOrder(data, function (err, r1) {
                        if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                        else {
                            Invoice.updateInvoiceStatus(id, status, function (err, r1) {
                                if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                                else {
                                    res.redirect(`http://localhost:3000/success`);
                                }
                            })
                        }
                    })

                }
            }
        })

    } catch (err) {
        res.status(500).send(err);
    }
}

exports.getOrders = async function (req, res) {
    getListIdFunction(Payment.getOrders, req.params.id, req.query.page, `SELECT * FROM order_invoice where user_id=${req.params.id} ORDER BY id DESC LIMIT`, '', res)
}
exports.getpaymentHistory = async function (req, res) {
    getListIdFunction(Payment.getpaymentHistory, req.params.id, req.query.page, `SELECT * FROM order_invoice where user_id=${req.params.id} ORDER BY id DESC LIMIT`, '', res)
}
exports.getpaymentAmount = async function (req, res) {
    try {
        Payment.getpaymentAmount(req.params.id, function (err, result) {
            if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
            else {
                var val = result.reduce(function (previousValue, currentValue) {
                    return {
                        pay_amount: previousValue.pay_amount + currentValue.pay_amount,
                    }
                });
                res.status(200).send({ 'status': true, 'code': 200, 'message': "Data get succesfully.", data: { Pay_amount: `$${val?.pay_amount}` } })
            }
        })
    } catch (err) {
        res.status(500).send(err);
    }
}
const decrypt = (encryptedText, password) => {  
    try {
        const textParts = encryptedText.split(':');
        const iv = Buffer.from(textParts.shift(), 'hex');

        const encryptedData = Buffer.from(textParts.join(':'), 'hex');
        const key = crypto.createHash('sha256').update(password).digest('base64').substr(0, 32);
        const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);

        const decrypted = decipher.update(encryptedData);
        const decryptedText = Buffer.concat([decrypted, decipher.final()]); 
        return decryptedText.toString();
    } catch (error) {
        console.log(error)
    }
}  