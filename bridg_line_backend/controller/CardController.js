const { getListFunction, deleteFunction, getFunction, getListIdFunction, getIdFunction, forEachWithDelay } = require("../function/QueryFunction")
const Card = require("../models/card");
const History = require("../models/history");
const { validateCard, validateCardStatus } = require("../validator/Validator")
const crypto = require("crypto");

exports.getCard = async function (req, res) {
    getFunction(Card.getDatas, res)
}
exports.getCardList = async function (req, res) {
    getListIdFunction(Card.getDatasUser, req.params.id, req.query.page, `SELECT * FROM card_details WHERE user_id=${req.params.id} ORDER BY id DESC LIMIT`, 'card', res)
}
exports.addCard = async function (req, res) {
    const { error, value } = validateCard(req.body);
    if (error) {
        return res.status(422).send({ 'status': false, 'code': 422, 'message': error.details, 'error': 'Error!' })
    }
    else {
        try {
            let { user_id, card_number, expiry, issuer, cvc } = req.body;
            const encText = encrypt(card_number, process.env.CARD_PASSWORD);
            let decText1 = card_number.split(" ").join("");
            let decText2 = decText1.substr(0, 5)
            let decText3 = decText1.substr(decText1.length - 4)
            let star = "*****"
            let final_card = decText2 + star + decText3
            Card.getDatasUser(user_id, function (err, r) {
                if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                else {
                    if (r.length > 0) {
                        Card.addCardData(user_id, encText, expiry, issuer, cvc, final_card, function (err, result) {
                            if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                            else {
                                let history = { user_id: user_id, form_name: 'card', form_field_id: result.insertId, action: 'add' }
                                History.addData(history, function (err, result) {
                                    if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }

                                })
                                return res.status(200).send({ 'status': true, 'code': 200, 'message': "Data inserted succesfully.", data: result })
                            }
                        })
                    }
                    else {
                        Card.addCardDataStatus(user_id, encText, expiry, issuer, cvc, final_card, function (err, result) {
                            if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                            else {
                                let history = { user_id: user_id, form_name: 'card', form_field_id: result.insertId, action: 'add' }
                                History.addData(history, function (err, result) {
                                    if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }

                                })
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
exports.updateCard = async function (req, res) {
    const { error, value } = validateCard(req.body);
    if (error) {
        return res.status(422).send({ 'status': false, 'code': 422, 'message': error.details, 'error': 'Error!' })
    }
    else {
        try {
            const { id } = req.params;
            let { card_number, expiry, issuer, cvc, user_id } = req.body;
            const encText = encrypt(card_number, process.env.CARD_PASSWORD)
            let decText1 = card_number.split(" ").join("");
            let decText2 = decText1.substr(0, 5)
            let decText3 = decText1.substr(decText1.length - 4)
            let star = "*****"
            let final_card = decText2 + star + decText3
            Card.updateCardData(id, encText, expiry, issuer, cvc,final_card, function (err, result) {
                if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                else {
                    let history = { user_id: user_id, form_name: 'card', form_field_id: id, action: 'edit' }
                    History.addData(history, function (err, result) {
                        if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }

                    })
                    return res.status(200).send({ 'status': true, 'code': 200, 'message': "Data updated succesfully.", data: result })
                }
            })

        } catch (err) {
            return res.status(500).send(err);
        }
    }
}
exports.updateStatus = async function (req, res) {
    const { error, value } = validateCardStatus(req.body);
    if (error) {
        return res.status(422).send({ 'status': false, 'code': 422, 'message': error.details, 'error': 'Error!' })
    }
    else {
        try {
            const { id } = req.params;
            let { status, user_id } = req.body;
            Card.getStatus(user_id, function (err, result) {
                if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                else {
                    if (result.length > 0) {
                        Card.updateStatus(result[0].id, 0, function (err, result) {
                            if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                            else {
                                Card.updateStatus(id, status, function (err, result) {
                                    if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                                    else {
                                        let history = { user_id: user_id, form_name: 'card', form_field_id: id, action: 'edit card status' }
                                        History.addData(history, function (err, result) {
                                            if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }

                                        })
                                        return res.status(200).send({ 'status': true, 'code': 200, 'message': "Data updated succesfully.", data: result })
                                    }
                                })
                            }
                        })
                    }
                    else {
                        Card.updateStatus(id, status, function (err, result) {
                            if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                            else {
                                let history = { user_id: user_id, form_name: 'card', form_field_id: id, action: 'edit card status' }
                                History.addData(history, function (err, result) {
                                    if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }

                                })
                                return res.status(200).send({ 'status': true, 'code': 200, 'message': "Data updated succesfully.", data: result })
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
exports.deleteCard = async function (req, res) {
    deleteFunction(req.params, Card.deleteCardData, res)
}

const encrypt = (plainText, password) => {
    try {
        const iv = crypto.randomBytes(16);
        const key = crypto.createHash('sha256').update(password).digest('base64').substr(0, 32);
        const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

        let encrypted = cipher.update(plainText);
        encrypted = Buffer.concat([encrypted, cipher.final()])
        return iv.toString('hex') + ':' + encrypted.toString('hex');

    } catch (error) {
        console.log(error);
    }
}
exports.getDatasUser = async function (req, res) {
    try {
        Card.getDatasUser(req.params.id, function (err, result) {
            if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
            else {
                return res.status(200).send({ 'status': true, 'code': 200, 'message': "Data get succesfully.", data: result })
            }
        })
    } catch (err) {
        res.status(500).send(err);
    }

}
