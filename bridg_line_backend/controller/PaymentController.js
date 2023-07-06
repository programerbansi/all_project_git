const { getListFunction, deleteFunction, getFunction } = require("../function/QueryFunction")
const Payment = require("../models/payment")
const { validatePayment, validatePaymentStatus } = require("../validator/Validator")

exports.getPayments = async function (req, res) {
    getFunction(Payment.getDatas, res)
}       
exports.getPaymentList = async function (req, res) {
    getListFunction(Payment.getDatas, req.query.page, 'SELECT * FROM payment_method ORDER BY id DESC LIMIT', '', res)
}
exports.addPayment = async function (req, res) {
    const { error, value } = validatePayment(req.body);
    if (error) {
        return res.status(422).send({ 'status': false, 'code': 422, 'message': error.details, 'error': 'Error!' })
    }
    else {             
        try {
            Payment.getStatus1(function(err,r){
                if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                else {
                    if(r.length > 0)
                    {
                        Payment.addData(req.body,function (err, result) {
                            if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                            else {
                                return res.status(200).send({ 'status': true, 'code': 200, 'message': "Data inserted succesfully.", data: result })
                            }
                        })
                    }
                    else
                    {
                        Payment.addDataStatus(req.body, function (err, result) {
                            if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                            else {
                                return res.status(200).send({ 'status': true, 'code': 200, 'message': "Data inserted succesfully.", data: result })
                            }
                        })
                    }
                }
            })

        } catch (err) {
            return res.status(500).send(err);
        }
    }
}
exports.updatePayment= async function (req, res) {
    const { error, value } = validatePayment(req.body);
    if (error) {
        return res.status(422).send({ 'status': false, 'code': 422, 'message': error.details, 'error': 'Error!' })
    }
    else {             
        try {
            Payment.updateData(req.params.id,req.body, function (err, result) {
                if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                else {
                    return res.status(200).send({ 'status': true, 'code': 200, 'message': "Data updated succesfully.", data: result })
                }
            })

        } catch (err) {
            return res.status(500).send(err);
        }
    }
}
exports.deletePayment = async function (req, res) {
    deleteFunction(req.params, Payment.deleteData, res)
}
exports.updateStatus = async function (req, res) {
    const { error, value } = validatePaymentStatus(req.body);
    if (error) {
        return res.status(422).send({ 'status': false, 'code': 422, 'message': error.details, 'error': 'Error!' })
    }
    else {
        try {
            const { id } = req.params;
            let { status} = req.body;
            Payment.getStatus1( function (err, result) {
                if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                else {
                    if(result.length > 0)
                    {
                        Payment.updateStatusData(result[0].id, 0,function (err, result) {
                            if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                            else {
                                Payment.updateStatusData(id, status,function (err, result) {
                                    if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                                    else return res.status(200).send({ 'status': true, 'code': 200, 'message': "Data updated succesfully.", data: result })
                                })
                            }
                        }) 
                    }
                    else
                    {
                        Payment.updateStatusData(id, status,function (err, result) {
                            if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                            else return res.status(200).send({ 'status': true, 'code': 200, 'message': "Data updated succesfully.", data: result })
                        })
                    }
                }
            })
            

        } catch (err) {
            return res.status(500).send(err);
        }
    }
}

