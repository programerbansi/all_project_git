const db = require("../db/conn");
const resultsPerPage = 10;
var nodemailer = require('nodemailer');
const crypto = require("crypto");
exports.sendEmail = async function (to, subject, text) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'hirparapallavi36@gmail.com',
            pass: 'tlbvpujecelxdrbs'
        }
    });

    var mailOptions = {
        from: 'hirparapallavi36@gmail.com',
        to: to,
        subject: subject,
        html: text
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
exports.allQuery = async function (query, cb) {
    db.query(query, (err, result) => {
        if (err) { cb(null, err) }
        cb(null, result)
    })
}
exports.insertQuery = async function (query, data, cb) {
    db.query(query, data, (err, result) => {
        if (err) { cb(null, err) }
        cb(null, result)
    })
}
exports.forEachWithDelay = async function (array, callback, delay) {
    let i = 0;
    let interval = setInterval(() => {
        callback(array[i], i, array);
        if (++i === array.length) clearInterval(interval);
    }, delay);
}

const paginate = async function (result, cPage, query, action, res) {
    if (result?.length > 0) {
        const numOfResults = result.length;
        const numberOfPages = Math.ceil(numOfResults / resultsPerPage);
        let page = cPage ? Number(cPage) : 1;
        if (page > numberOfPages) {
            res.send('/?page=' + encodeURIComponent(numberOfPages));
        }
        else if (page < 1) {
            res.send('/?page=' + encodeURIComponent('1'));
        }
        else {
            const startingLimit = (page - 1) * resultsPerPage;
            db.query(`${query} ${startingLimit},${resultsPerPage}`, (err, result1) => {
                if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                if (action == "user") {
                    let r1 = result1.map((i) => {
                        return { "id": i.id, "email": i.email, "amount":i.amount ,"visible_password": i.visible_password, "is_email_verified": i.is_email_verified, "role": i.role, "firstname": i.firstname, "lastname": i.lastname, "phone": i.phone, "comp_name": i.comp_name, "comp_address": i.comp_address, "comp_logo": i.comp_logo, "comp_website": i.comp_website, "created_at": i.created_at }
                    })
                    setTimeout(() => {
                        return res.status(200).send({ 'status': true, 'code': 200, 'message': "Data get succesfully.", path: process.env.COMPANY_IMAGE, data: r1, currentPage: page, lastPage: numberOfPages, totalPage: numberOfPages, totalItemCount: result.length })
                    }, 300)
                }
                else if (action == 'admin') {
                    let r1 = result1.map((i) => {
                        return { "id": i.id, "email": i.email, "visible_password": i.visible_password, "is_email_verified": i.is_email_verified, "role": i.role, "firstname": i.firstname, "lastname": i.lastname, "status": JSON.parse(i.status), "created_at": i.created_at }
                    })
                    setTimeout(() => {
                        return res.status(200).send({ 'status': true, 'code': 200, 'message': "Data get succesfully.", data: r1, currentPage: page, lastPage: numberOfPages, totalPage: numberOfPages, totalItemCount: result.length })
                    }, 300)
                }
                else if (action == 'user_team') {
                    let r1 = result1.map((i) => {
                        return { "main_id": i.id, "id": i.user_id, "email": i.email, "visible_password": i.visible_password, "is_email_verified": i.is_email_verified, "role": i.role, "firstname": i.firstname, "lastname": i.lastname, "status": JSON.parse(i.status), "created_at": i.created_at }
                    })
                    setTimeout(() => {
                        return res.status(200).send({ 'status': true, 'code': 200, 'message': "Data get succesfully.", data: r1, currentPage: page, lastPage: numberOfPages, totalPage: numberOfPages, totalItemCount: result.length })
                    }, 300)
                }

                else return res.status(200).send({ 'status': true, 'code': 200, 'message': "Data get succesfully.", data: result1, currentPage: page, lastPage: numberOfPages, totalPage: numberOfPages, totalItemCount: result.length })
            })


        }
    }
    else {
        return res.status(200).send({ 'status': true, 'code': 200, 'message': "Data get succesfully.", data: [], currentPage: 0, lastPage: 0, totalPage: 0, totalItemCount: 0 })

    }

}

exports.getFunction = async function (model, res) {
    try {
        model(function (err, result) {
            if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
            else {
                res.status(200).send({ 'status': true, 'code': 200, 'message': "Data get succesfully.", data: result })
            }
        })
    } catch (err) {
        res.status(500).send(err);
    }
}
exports.getFunctionLength = async function (model, type, res) {
    try {
        model(function (err, result) {
            if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
            else {
               
                if (type == 'profit') {
                   if(result.length > 0)
                   {
                    var val = result.reduce(function (previousValue, currentValue) {
                        return {
                            pay_amount: previousValue.pay_amount ?previousValue.pay_amount : 0  + currentValue.pay_amount ? currentValue.pay_amount :0,
                        }
                    });
                    res.status(200).send({ 'status': true, 'code': 200, 'message': "Data get succesfully.", data: { length: `$${val?.pay_amount}` } })
                
                   }
                   else{

                       res.status(200).send({ 'status': true, 'code': 200, 'message': "Data get succesfully.", data: { length: `$00` } })
                   }
                }
                else {
                    res.status(200).send({ 'status': true, 'code': 200, 'message': "Data get succesfully.", data: { length: result.length } })
                }
            }
        })
    } catch (err) {
        res.status(500).send(err);             
    }
}
exports.getIdFunction = async function (model, id, res) {
    try {
        model(id, function (err, result) {
            if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
            else {
                res.status(200).send({ 'status': true, 'code': 200, 'message': "Data get succesfully.", data: result })
            }
        })
    } catch (err) {
        res.status(500).send(err);
    }
}
exports.getListFunction = async function (model, page, query, action, res) {
    try {
        model(function (err, result) {
            if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
            else {
                paginate(result, page, query, action, res)
            }
        })
    } catch (err) {
        res.status(500).send(err);
    }
}
exports.getListIdFunction = async function (model, id, page, query, action, res) {
    try {
        model(id, function (err, result) {
            if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
            else {
                paginate(result, page, query, action, res)
            }
        })
    } catch (err) {
        res.status(500).send(err);
    }
}
exports.getListIdResultFunction = async function (model, id, page, resultsPerPage, query, action, res) {
    try {
        model(id, function (err, result) {
            if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
            else {

                paginate1(result, page, resultsPerPage, query, action, res)
            }
        })
    } catch (err) {
        res.status(500).send(err);
    }
}
exports.deleteFunction = async function (param, model, res) {
    try {
        const { id } = param;
        model(id, function (err, result) {
            if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
            else return res.status(200).send({ 'status': true, 'code': 200, 'message': "Data deleted succesfully.", data: result })
        })

    } catch (err) {
        res.status(500).send(err);
    }
}
const paginate1 = async function (result, cPage, resultsPerPage, query, action, res) {
    if (result.length > 0) {
        const numOfResults = result.length;
        const numberOfPages = Math.ceil(numOfResults / resultsPerPage);
        let page = cPage ? Number(cPage) : 1;
        if (page > numberOfPages) {
            res.send('/?page=' + encodeURIComponent(numberOfPages));
        }
        else if (page < 1) {
            res.send('/?page=' + encodeURIComponent('1'));
        }
        else {
            const startingLimit = (page - 1) * resultsPerPage;
            db.query(`${query} ${startingLimit},${resultsPerPage}`, (err, result1) => {
                if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                if (action == "user") {
                    let r1 = result1.map((i) => {
                        return { "id": i.id, "email": i.email, "amount":i.amount,"visible_password": i.visible_password, "is_email_verified": i.is_email_verified, "role": i.role, "firstname": i.firstname, "lastname": i.lastname, "phone": i.phone, "comp_name": i.comp_name, "comp_address": i.comp_address, "comp_logo": i.comp_logo, "comp_website": i.comp_website, "created_at": i.created_at }
                    })
                    setTimeout(() => {
                        return res.status(200).send({ 'status': true, 'code': 200, 'message': "Data get succesfully.", path: process.env.COMPANY_IMAGE, data: r1, currentPage: page, lastPage: numberOfPages, totalPage: numberOfPages, totalItemCount: result.length })
                    }, 300)
                }
                else return res.status(200).send({ 'status': true, 'code': 200, 'message': "Data get succesfully.", data: result1, currentPage: page, lastPage: numberOfPages, totalPage: numberOfPages, totalItemCount: result.length })
            })


        }
    }
    else {
        return res.status(200).send({ 'status': true, 'code': 200, 'message': "Data get succesfully.", data: [], currentPage: 0, lastPage: 0, totalPage: 0, totalItemCount: 0 })

    }

}
const forEachWithFilter = async function (array, callback, delay) {
    let i = 0;
    let interval = setInterval(() => {
        callback(array[i], i, array);
        if (++i === array.length) clearInterval(interval);
    }, delay);
}