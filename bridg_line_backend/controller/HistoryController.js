const { getListIdFunction, deleteFunction } = require("../function/QueryFunction")
const History = require("../models/history")

exports.addHistory = async function (history) {
    History.addData(history, function (err, result) {
        if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
    
     })
}

exports.getHistoryList = async function (req, res) {
    getListIdFunction(History.getHistory5, req.params.id, req.query.page, `SELECT i.firstname as i_fname ,i.lastname as i_lname,h.*,u.firstname as u_fname,u.lastname as u_lname,c.card_number_text FROM history as h join invoice as i join team_user as u join card_details as c on ((h.form_name ='invoice' || h.form_name ='photo' || h.form_name ='document' || h.form_name ='activity' ) && i.id = h.form_field_id && i.user_id = ${req.params.id}) || (h.form_name ='user_team' && u.id = h.form_field_id && u.user_id=${req.params.id}) || ((h.form_name = 'card' || h.form_name = 'edit card status') && c.id = h.form_field_id && c.user_id = ${req.params.id}) WHERE h.user_id=${req.params.id} GROUP BY h.id ORDER BY h.id DESC LIMIT `, 'history', res)
}

exports.getHistory = async function (req, res) {
    try {
        History.getHistory5(req.params.id,function (err, result) {
            if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
            else {
                
                // let data=result.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i);
                // let data1=data.sort(function(a, b) {
                //     return (b.id - a.id);
                // })
                res.status(200).send({ 'status': true, 'code': 200, 'message': "Data get succesfully.", data: result.slice(0,5) })
            }
        })
    } catch (err) {
        res.status(500).send(err);
    }
}
exports.deleteHistory = async function (req, res) {
    deleteFunction(req.params, History.deleteData, res)
}
exports.deleteHistoryAll = async function (req, res) {
    deleteFunction(req.params, History.deleteAll, res)
}