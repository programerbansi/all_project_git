const { date } = require("joi");
const { allQuery, insertQuery } = require("../function/QueryFunction");
var Payment = function (data) {
    this.publish_key=data.publish_key
}
Payment.getDatas=(cb)=>{ allQuery(`SELECT * FROM payment_method`,cb)}
Payment.addData=(v,cb)=>{ insertQuery('INSERT INTO payment_method (`name`,`publish_key`,`secret_key`,`status`) VALUES (?,?,?,?)', [v.name,v.publish_key,v.secret_key,0],cb)}
Payment.addDataStatus=(v,cb)=>{ insertQuery('INSERT INTO payment_method (`name`,`publish_key`,`secret_key`,`status`) VALUES (?,?,?,?)', [v.name,v.publish_key,v.secret_key,1],cb)}
Payment.updateData=(id,v,cb)=>{ allQuery(`UPDATE payment_method SET name ='${v.name}' ,publish_key ='${v.publish_key}',secret_key ='${v.secret_key}' WHERE id=${id}`,cb)}
Payment.deleteData=(id,cb)=>{ allQuery(`DELETE FROM payment_method WHERE id=${id}`,cb) }
Payment.getDataId=(cb)=>{ allQuery(`SELECT * FROM payment_method WHERE id= 1`,cb)}
Payment.addOrder=(v,cb)=>{insertQuery('INSERT INTO `order_invoice` (`payment_id`, `o_name`, `o_email`, `payment_type`, `payment_status`, `pay_amount`,`user_id`) VALUES (?,?,?,?,?,?,?)', [v.payment_id,v.o_name,v.o_email,v.payment_type,v.payment_status,v.pay_amount,v.user_id],cb)}
Payment.getOrders=(id,cb)=>{allQuery(`SELECT * FROM order_invoice where user_id=${id}`,cb)}
Payment.getAmount=(cb)=>{allQuery(`SELECT pay_amount FROM order_invoice`,cb)}
Payment.getpaymentHistory=(id,cb)=>{allQuery(`SELECT * FROM order_invoice where user_id=${id}`,cb)}
Payment.getpaymentAmount=(id,cb)=>{allQuery(`SELECT pay_amount FROM order_invoice where user_id=${id}`,cb)}
Payment.updateStatusData=(id,v,cb)=>{ allQuery(`UPDATE payment_method SET status=${v} WHERE id=${id}`,cb)}
Payment.getStatus1=(cb)=>{ allQuery(`SELECT * FROM payment_method where status = 1`,cb)}
module.exports = Payment;         