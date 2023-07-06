const { allQuery, insertQuery } = require("../function/QueryFunction");
const date=new Date();
var Activity = function (data) {
     this.user_id=data.user_id,
     this.invoice_id=data.invoice_id,
     this.message=data.message
}
Activity.addMessage=(v,cb)=>{ insertQuery('INSERT INTO activity ( `user_id`, `invoice_id`, `message`,`firstname`,`lastname`, `created_at`, `updated_at`) VALUES (?,?,?,?,?,?,?)', [v.user_id,v.invoice_id,v.message,v.firstname,v.lastname,date,date],cb)}
Activity.getMsgDatas = (id,cb) => {allQuery(`SELECT u.name , i.* FROM users as u join activity as  i on u.id = i.user_id WHERE i.invoice_id=${id}`,cb)}   
Activity.getMsgDocDatas = (id,cb) => {allQuery(`SELECT * FROM activity_doc WHERE message_id = ${id}`,cb)}  
Activity.addMessageDoc=(v,cb)=>{ insertQuery('INSERT INTO activity_doc ( `message_id`, `user_id`, `invoice_id`, `document`, `name`,`type`, `size`,`created_at`, `updated_at`) VALUES (?,?,?,?,?,?,?,?,?)', [v.message_id,v.user_id,v.invoice_id,v.document,v.name,v.type,v.size,date,date],cb)} 
Activity.deleteActivityDocByInvoiceId=(id,cb)=>{allQuery(`DELETE FROM activity_doc WHERE invoice_id=${id}`,cb)}
Activity.deleteActivityByInvoiceId=(id,cb)=>{allQuery(`DELETE FROM activity WHERE invoice_id=${id}`,cb)}
module.exports = Activity;           