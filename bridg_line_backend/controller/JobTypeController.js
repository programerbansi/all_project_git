const { getListFunction, deleteFunction, getFunction } = require("../function/QueryFunction")
const Job_Type = require("../models/jobType")
const { validateJobType } = require("../validator/Validator")

exports.getJobTypes = async function (req, res) {
    getFunction(Job_Type.getDatas, res)
}       
exports.getJobTypeList = async function (req, res) {
    getListFunction(Job_Type.getDatas, req.query.page, 'SELECT * FROM job_type ORDER BY id DESC LIMIT', '', res)
}
exports.addJobType = async function (req, res) {
    const { error, value } = validateJobType(req.body);
    if (error) {
        return res.status(422).send({ 'status': false, 'code': 422, 'message': error.details, 'error': 'Error!' })
    }
    else {             
        try {
            Job_Type.addData(req.body, function (err, result) {
                if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                else {
                    return res.status(200).send({ 'status': true, 'code': 200, 'message': "Data inserted succesfully.", data: result })
                }
            })

        } catch (err) {
            return res.status(500).send(err);
        }
    }
}
exports.updateJobType= async function (req, res) {
    const { error, value } = validateJobType(req.body);
    if (error) {
        return res.status(422).send({ 'status': false, 'code': 422, 'message': error.details, 'error': 'Error!' })
    }
    else {
        try {
            const { id } = req.params;
            Job_Type.updateData(id, req.body, function (err, result) {
                if (err) { return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' }) }
                else return res.status(200).send({ 'status': true, 'code': 200, 'message': "Data updated succesfully.", data: result })
            })

        } catch (err) {
            return res.status(500).send(err);
        }
    }
}
exports.deleteJobType = async function (req, res) {
    deleteFunction(req.params, Job_Type.deleteData, res)
}