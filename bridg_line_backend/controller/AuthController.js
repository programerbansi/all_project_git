const Login = require("../models/login");
const jwt = require('jsonwebtoken');
var { hashSync } = require('bcryptjs');
const { validateLogin, validateAccount, validateTeam, validateUserTeam } = require("../validator/Validator");
const { getFunction, deleteFunction, getListFunction, getListIdFunction, sendEmail } = require("../function/QueryFunction");
const path = require('path');
const History = require("../models/history");

exports.login = async function (req, res) {
    const { error, value } = validateLogin(req.body);
    if (error) {
        await res.status(422).send({ 'status': false, 'code': 422, 'message': error.details, 'error': 'Error!' })
    }
    else {
        try {
            let { email, password } = new Login(req.body);
            const password_encrpt = hashSync(password, 10);
            Login.users(email, function (err, result) {
                if (err) return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' })
                if (!result.length) {
                    Login.userTeamEmail(email, function (err, result) {
                        if (err) return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' })
                        if (!result.length) {
                            return res.status(400).send({ 'status': false, 'code': 401, 'message': 'Email or Password is incorrect!', 'error': 'Error!' })
                        }
                        else {
                            if (password == result[0].visible_password) {
                                Login.updateUserPassword(email, password_encrpt, function (err, result1) {
                                    if (err) return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' })
                                    else {
                                        const token = jwt.sign({ id: result[0]['id'], name: result[0]['name'] }, process.env.JWT_SECRET,
                                            { expiresIn: "7d" }
                                        );
                                        const data = { 'main_id': result[0]['id'], 'id': result[0]['user_id'], 'email': result[0]['email'], 'role': result[0]['role'], 'is_email_verified': result[0]['is_email_verified'], "firstname": result[0]['firstname'], "lastname": result[0]['lastname'], status: result[0]['status'], 'created_at': result[0]['created_at'], 'updated_at': result[0]['updated_at'] }
                                        return res.status(200).send({ 'status': true, 'code': 200, 'message': "Login succesfully!", 'access_token': token, data: data })
                                    }
                                })
                            }
                            else {
                                return res.status(400).send({ 'status': false, 'code': 401, 'message': 'Email or Password is incorrect!', 'error': 'Error!' })
                            }
                        }
                    })

                }
                else {
                    if (password == result[0].visible_password) {
                        Login.updatePassword(email, password_encrpt, function (err, result1) {
                            if (err) return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' })
                            else {
                                const token = jwt.sign({ id: result[0]['id'], name: result[0]['name'] }, process.env.JWT_SECRET,
                                    { expiresIn: "7d" }
                                );
                                const data = { 'id': result[0]['id'], 'name': result[0]['name'], 'email': result[0]['email'], 'role': result[0]['role'], 'is_email_verified': result[0]['is_email_verified'], "firstname": result[0]['firstname'], "lastname": result[0]['lastname'], status: result[0]['status'], 'created_at': result[0]['created_at'], 'updated_at': result[0]['updated_at'] }
                                const userData = { 'id': result[0]['id'], "email": result[0]['email'], "is_email_verified": result[0]['is_email_verified'], "role": result[0]['role'], "firstname": result[0]['firstname'], "lastname": result[0]['lastname'], "phone": result[0]['phone'], "comp_name": result[0]['comp_name'], "comp_address": result[0]['comp_address'], "comp_logo": result[0]['comp_logo'], "comp_website": result[0]['comp_website'], status: result[0]['status'], "created_at": result[0]['created_at'] }
                                return res.status(200).send({ 'status': true, 'code': 200, 'message': "Login succesfully!", 'access_token': token, data: result[0].role == 'admin' ? data : userData })
                            }
                        })
                    }
                    else {
                        return res.status(400).send({ 'status': false, 'code': 401, 'message': 'Email or Password is incorrect!', 'error': 'Error!' })
                    }
                }

            })
        } catch (err) {
            res.status(500).send(err);
        }
    }
}
exports.logout = async function (req, res) {
    let token = req.headers[`authorization`];
    if (token) {
        token = token.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, { expiresIn: "1s" }, (err, result) => {
            if (err) {
                return res.status(401).send({ 'status': false, 'code': 401, 'message': "Please provide valid token!", 'error': 'Error!' })
            }
            else {
                Login.storeToken(token, function (err, result) {
                    if (err) return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' })
                    return res.status(200).send({ 'status': true, 'code': 200, 'message': "Logout succesfully." })
                })
            }
        })
    }
    else {
        res.status(403).send({ 'status': false, 'code': 403, 'message': "Please provide token in header!", 'error': 'Error!' })
    }
}

exports.createAccount = async function (req, res) {
    const { error, value } = validateAccount(req.body);
    if (req.files == null || error) {
        await res.status(422).send({ 'status': false, 'code': 422, 'message': (error ? error.details : "Image is required!"), 'error': 'Error!' })
    }
    else {
        const { email, password } = req.body;
        const password_encrpt = hashSync(password, 10);
        try {
            const { image } = req.files;
            const val = `${Date.now()}${path.extname(image.name)}`;
            Login.users(email, function (err, r1) {
                if (err) return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' })
                else {
                    if (r1.length > 0) {
                        return res.status(400).send({ 'status': false, 'code': 400, 'message': 'This email is already taken!', 'error': 'Error!' })
                    }
                    else {
                        var numberArray = req.body.status.map(Number);
                        Login.addUser(req.body, numberArray, password_encrpt, val, function (err, result) {
                            if (err) return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' })
                            else {
                                if (!image) return res.status(400).send({ 'status': false, 'code': 400, 'message': 'image not found!', 'error': 'Error!' })
                                else {
                                    image.mv('./public/comp_logo/' + val, function (err) {
                                        if (err) return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' })
                                    });
                                    return res.status(200).send({ 'status': true, 'code': 200, 'message': "Data inserted succesfully." })
                                }
                            }
                        })
                    }
                }
            })

        } catch (err) {
            res.status(500).send(err);
        }
    }
}
exports.getRoleUserList = async function (req, res) {
    getListFunction(Login.roleUser, req.query.page, `SELECT SUM(o.pay_amount) as amount,u.* FROM order_invoice as o RIGHT JOIN users as u on u.id = o.user_id where role = 'user' group by u.id ORDER BY u.id DESC LIMIT`, 'user', res)
}
exports.updateAccount = async function (req, res) {

    const { error, value } = validateAccount(req.body);
    if (req.files == null || error) {
        await res.status(422).send({ 'status': false, 'code': 422, 'message': (error ? error.details : "Image is required!"), 'error': 'Error!' })
    }
    else {
        try {
            const { email, password } = req.body;
            const password_encrpt = hashSync(password, 10);
            const { image } = req.files;  
            const { id, old_email } = req.params;
            const val = `${Date.now()}${path.extname(image.name)}`;
            if (email == old_email) {
                Login.updateData(id, req.body, password_encrpt, val, function (err, result) {
                    if (err) return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' })
                    else {
                        if (!image) return res.status(400).send({ 'status': false, 'code': 400, 'message': 'image not found!', 'error': 'Error!' })
                        else {
                            image.mv('./public/comp_logo/' + val, function (err) {
                                if (err) return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' })
                            });
                            return res.status(200).send({ 'status': true, 'code': 200, 'message': "Data updated succesfully." })
                        }
                    }
                })
            }
            else {
                Login.users(email, function (err, r1) {
                    if (err) return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' })
                    else {
                        if (r1.length > 0) {
                            return res.status(400).send({ 'status': false, 'code': 400, 'message': 'This email is already taken!', 'error': 'Error!' })
                        }
                        else {
                            Login.updateData(id, req.body, password_encrpt, val, function (err, result) {
                                if (err) return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' })
                                else {
                                    if (!image) return res.status(400).send({ 'status': false, 'code': 400, 'message': 'image not found!', 'error': 'Error!' })
                                    else {
                                        image.mv('./public/comp_logo/' + val, function (err) {
                                            if (err) return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' })
                                        });
                                        return res.status(200).send({ 'status': true, 'code': 200, 'message': "Data updated succesfully." })
                                    }
                                }
                            })
                        }
                    }
                })
            }
        } catch (err) {
            res.status(500).send(err);
        }
    }
}
exports.deleteAccount = async function (req, res) {
    deleteFunction(req.params, Login.deleteData, res)
}
exports.getUsers = async function (req, res) {
    getFunction(Login.roleUser, res)
}
exports.createTeamAccount = async function (req, res) {
    const { error, value } = validateTeam(req.body);
    if (error) {
        await res.status(422).send({ 'status': false, 'code': 422, 'message': (error), 'error': 'Error!' })
    }
    else {
        const { email, password } = req.body;
        const password_encrpt = hashSync(password, 10);
        try {
            Login.users(email, function (err, r1) {
                if (err) return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' })
                else {
                    if (r1.length > 0) {
                        return res.status(400).send({ 'status': false, 'code': 400, 'message': 'This email is already taken!', 'error': 'Error!' })
                    }
                    else {
                        Login.addTeam(req.body, password_encrpt, function (err, result) {

                            if (err) return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' })
                            else {
                                return res.status(200).send({ 'status': true, 'code': 200, 'message': "Data inserted succesfully." })
                            }
                        })
                    }
                }
            })
        } catch (err) {
            res.status(500).send(err);
        }
    }
}
exports.updateTeamAccount = async function (req, res) {

    const { error, value } = validateTeam(req.body);
    if (error) {
        await res.status(422).send({ 'status': false, 'code': 422, 'message': (error), 'error': 'Error!' })
    }
    else {
        try {
            const { email, password } = req.body;
            const password_encrpt = hashSync(password, 10);
            const { id, old_email } = req.params;
            if (email == old_email) {
                Login.updateTeam(id, req.body, password_encrpt, function (err, result) {
                    if (err) return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' })
                    else {
                        return res.status(200).send({ 'status': true, 'code': 200, 'message': "Data updated succesfully." })
                    }
                })
            }
            else {
                Login.users(email, function (err, r1) {
                    if (err) return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' })
                    else {
                        if (r1.length > 0) {
                            return res.status(400).send({ 'status': false, 'code': 400, 'message': 'This email is already taken!', 'error': 'Error!' })
                        }
                        else {
                            Login.updateTeam(id, req.body, password_encrpt, function (err, result) {
                                if (err) return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' })
                                else {
                                    return res.status(200).send({ 'status': true, 'code': 200, 'message': "Data updated succesfully." })
                                }
                            })
                        }
                    }
                })
            }
        } catch (err) {
            res.status(500).send(err);
        }
    }
}
exports.getTeamList = async function (req, res) {
    getListFunction(Login.roleAdmin, req.query.page, `SELECT * FROM users WHERE role= 'admin'  && id != 1 ORDER BY id DESC LIMIT`, 'admin', res)
}
exports.createUserTeamAccount = async function (req, res) {
    const { error, value } = validateUserTeam(req.body);
    if (error) {
        await res.status(422).send({ 'status': false, 'code': 422, 'message': (error), 'error': 'Error!' })
    }
    else {
        const { email, password } = req.body;
        const password_encrpt = hashSync(password, 10);
        try {
            Login.users(email, function (err, r1) {
                if (err) return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' })
                else {
                    if (r1.length > 0) {
                        return res.status(400).send({ 'status': false, 'code': 400, 'message': 'This email is already taken!', 'error': 'Error!' })
                    }
                    else {
                        Login.userTeamEmail(email, function (err, rr1) {
                            if (err) return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' })
                            else {
                                if (rr1.length > 0) {
                                    return res.status(400).send({ 'status': false, 'code': 400, 'message': 'This email is already taken!', 'error': 'Error!' })
                                }
                                else {
                                    Login.addUserTeam(req.body, password_encrpt, function (err, result) {
                                        if (err) return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' })
                                        else {
                                            let history = { user_id: req.body.user_id, form_name: 'user_team', form_field_id: result.insertId, action: 'add' }
                                            History.addData(history, function (err, result) {
                                                if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }

                                            })
                                            return res.status(200).send({ 'status': true, 'code': 200, 'message': "Data inserted succesfully." })
                                        }
                                    })
                                }
                            }
                        })
                    }
                }
            })
        } catch (err) {
            res.status(500).send(err);
        }
    }
}
exports.updateUserTeamAccount = async function (req, res) {

    const { error, value } = validateUserTeam(req.body);
    if (error) {
        await res.status(422).send({ 'status': false, 'code': 422, 'message': (error), 'error': 'Error!' })
    }
    else {
        try {
            const { email, password } = req.body;
            const password_encrpt = hashSync(password, 10);
            const { id, old_email } = req.params;
            if (email == old_email) {
                Login.updateUserTeam(id, req.body, password_encrpt, function (err, result) {
                    if (err) return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' })
                    else {
                        let history = { user_id: req.body.user_id, form_name: 'user_team', form_field_id: id, action: 'edit' }
                        History.addData(history, function (err, result) {
                            if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }

                        })
                        return res.status(200).send({ 'status': true, 'code': 200, 'message': "Data updated succesfully." })
                    }
                })
            }
            else {
                Login.users(email, function (err, r1) {
                    if (err) return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' })
                    else {
                        if (r1.length > 0) {
                            return res.status(400).send({ 'status': false, 'code': 400, 'message': 'This email is already taken!', 'error': 'Error!' })
                        }
                        else {
                            Login.userTeamEmail(email, function (err, r1) {
                                if (err) return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' })
                                else {
                                    if (r1.length > 0) {
                                        return res.status(400).send({ 'status': false, 'code': 400, 'message': 'This email is already taken!', 'error': 'Error!' })
                                    }
                                    else {
                                        Login.updateUserTeam(id, req.body, password_encrpt, function (err, result) {
                                            if (err) return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' })
                                            else {
                                                let history = { user_id: req.body.user_id, form_name: 'user_team', form_field_id: id, action: 'edit' }
                                                History.addData(history, function (err, result) {
                                                    if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                        
                                                })
                                                return res.status(200).send({ 'status': true, 'code': 200, 'message': "Data updated succesfully." })
                                            }
                                        })
                                    }
                                }
                            })
                        }
                    }
                })
            }
        } catch (err) {
            res.status(500).send(err);
        }
    }
}
exports.deleteUserTeam = async function (req, res) {
    deleteFunction(req.params, Login.deleteUserTeam, res)
}
exports.getUserTeamList = async function (req, res) {
    getListIdFunction(Login.getUserTeam, req.params.id, req.query.page, `SELECT * FROM team_user WHERE user_id=${req.params.id} ORDER BY id DESC LIMIT`, 'user_team', res)
}