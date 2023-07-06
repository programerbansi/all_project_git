const { getFunction, getIdFunction, deleteFunction, getListFunction, sendEmail } = require("../function/QueryFunction")
const Login = require("../models/login")
const Notification = require("../models/notification")
const { validateNotification, validateUpdateNotification, validateRemainderEmail } = require("../validator/Validator")

exports.getNotifysAdmin = async function (req, res) {
    getListFunction(Notification.getAdmin, req.query.page, `SELECT * FROM notification  where role='admin' ORDER BY id DESC LIMIT`, '', res)
}
exports.getNotifysUser = async function (req, res) {
    getIdFunction(Notification.getDatasUser, req.params.id, res)
}
exports.addNotify = async function (req, res) {
    const { error, value } = validateNotification(req.body);
    if (error) {
        return res.status(422).send({ 'status': false, 'code': 422, 'message': error.details, 'error': 'Error!' })
    }
    else {
        try {
            Notification.getAdminMsgType(req.body.email_type, function (err, email_data) {
                if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                else {
                    if (email_data.length > 0) {
                        return res.status(400).send({ 'status': false, 'code': 400, 'message': 'Please enter unique message type!', 'error': 'Error!' })
                    }
                    else {
                        Notification.addData(req.body, function (err, result) {
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
exports.updateNotify = async function (req, res) {
    const { error, value } = validateUpdateNotification(req.body);
    if (error) {
        return res.status(422).send({ 'status': false, 'code': 422, 'message': error.details, 'error': 'Error!' })
    }
    else {
        try {
            if (req.body.old_msg_type == req.body.email_type) {
                Notification.updateData(req.params.id, req.body, function (err, result) {
                    if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                    else {
                        return res.status(200).send({ 'status': true, 'code': 200, 'message': "Data updated succesfully.", data: result })
                    }
                })
            }
            else {
                Notification.getAdminMsgType(req.body.email_type, function (err, email_data) {
                    if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                    else {
                        if (email_data.length > 0) {
                            return res.status(400).send({ 'status': false, 'code': 400, 'message': 'Please enter unique message type!', 'error': 'Error!' })
                        }
                        else {
                            Notification.updateData(req.params.id, req.body, function (err, result) {
                                if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                                else {
                                    console.log(result)
                                    return res.status(200).send({ 'status': true, 'code': 200, 'message': "Data updated succesfully.", data: result })
                                }
                            })
                        }
                    }
                })
            }


        } catch (err) {
            return res.status(500).send(err);
        }
    }
}
exports.deleteNotify = async function (req, res) {
    deleteFunction(req.params, Notification.deleteData, res)
}

exports.remainderEmail = async function (req, res) {
    const { error, value } = validateRemainderEmail(req.body);
    if (error) {
        return res.status(422).send({ 'status': false, 'code': 422, 'message': error.details, 'error': 'Error!' })
    }
    else {
        try {
            Login.userId(req.body.user_id, function (err, result) {
                if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                else {

                    if (req.body.status == "Need more photos") {

                        Notification.getPhotoStatus(function (err, result1) {
                            if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                            else {
                                sendEmail(result[0].email, result1[0].subject, `${req.body.name} ${result1[0].html1}`)
                            }
                        })
                    }
                    else if (req.body.status == "Need more documents") {
                        Notification.getDocStatus(function (err, result1) {
                            if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                            else {
                                sendEmail(result[0].email, result1[0].subject, `${req.body.name} ${result1[0].html1}`)
                            }
                        })
                    }
                    else if (req.body.status == "Invoice ready/Make payment") {

                        Notification.getReadyStatus(function (err, result1) {
                            if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                            else {
                                sendEmail(result[0].email, result1[0].subject, `${req.body.name} ${result1[0].html1}`)
                            }
                        })
                    }
                    return res.status(200).send({ 'status': true, 'code': 200, 'message': "Email send succesfully.", data: result })
                
                }
            })
        } catch (err) {
            return res.status(500).send(err);
        }
    }
}

