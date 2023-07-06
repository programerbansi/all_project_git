const { getFunctionLength } = require("../function/QueryFunction")
const Invoice = require("../models/invoice")
const Job_Type = require("../models/jobType")
const Login = require("../models/login")
const Notification = require("../models/notification")
const Payment = require("../models/payment")

exports.getInvoiceCompletedAll = async function (req, res) {
    getFunctionLength(Invoice.invoiceCompletedAll, '', res)
}
exports.getInvoicePendingAll = async function (req, res) {
    getFunctionLength(Invoice.invoicePendingAll, '', res)
}
exports.getInvoiceNeedPhotosDocAll = async function (req, res) {
    getFunctionLength(Invoice.invoiceNeedPhotosDocAll, '', res)
}
exports.getInvoiceNeedDocumentsAll = async function (req, res) {
    getFunctionLength(Invoice.invoiceNeedDocumentsAll, '', res)
}
exports.getInvoiceReadyAll = async function (req, res) {
    getFunctionLength(Invoice.invoiceReadyAll, '', res)
}
exports.getOrdersAll = async function (req, res) {
    getFunctionLength(Payment.getOrders, '', res)
}
exports.getProfitAll = async function (req, res) {
    getFunctionLength(Payment.getAmount, 'profit', res)
}
exports.getJobTypeAll = async function (req, res) {
    getFunctionLength(Job_Type.getDatas, '', res)
}
exports.getStripAccount = async function (req, res) {
    getFunctionLength(Payment.getDatas, '', res)
}
exports.getInvoicAll = async function (req, res) {
    getFunctionLength(Invoice.invoice_List, '', res)
}
exports.getUsersAll=async function (req,res){
    getFunctionLength(Login.roleUser,'',res)     
}
exports.getInvoiceOtherAll=async function (req,res){
    getFunctionLength(Invoice.invoiceOtherAll,'',res)     
}
exports.getTeamAdmin=async function (req,res){
    getFunctionLength(Login.roleAdmin ,'',res)     
}
exports.getNotification=async function (req,res){
    getFunctionLength(Notification.getDatas ,'',res)     
}