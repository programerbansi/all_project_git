const { allQuery, insertQuery } = require("../function/QueryFunction");
var Notification = function (data) {
    this.subject=data.subject,
    this.html=data.html,
    this.user_id=data.user_id,
    this.role=data.role
}

Notification.getDatas=(cb)=>{ allQuery(`SELECT * FROM notification`,cb)}
Notification.addData=(v,cb)=>{ insertQuery('INSERT INTO notification (`user_id`, `subject`, `html1`,`role`,`msg_type`) VALUES (?,?,?,?,?)', [v.user_id,v.subject,v.html1,v.role,v.email_type],cb)}
Notification.updateData=(id,v,cb)=>{ allQuery(`UPDATE notification SET subject='${v.subject}', html1='${v.html1}',msg_type='${v.email_type}' WHERE id= ${id}`,cb)}
Notification.deleteData=(id,cb)=>{ allQuery(`DELETE FROM notification WHERE id=${id}`,cb) }
Notification.getDatasUser=(id,cb)=>{ allQuery(`SELECT * FROM notification where user_id = ${id} && role='user'`,cb)}
Notification.getAdmin=(cb)=>{ allQuery(`SELECT * FROM notification where role='admin'`,cb)}
Notification.getAdminMsgType=(msg_type,cb)=>{ allQuery(`SELECT * FROM notification where role='admin' && msg_type = '${msg_type}'`,cb)}
Notification.getReceiveStatus=(cb)=>{ allQuery(`SELECT * FROM notification where role='admin' && msg_type = 'Receive invoice by admin'`,cb)}
Notification.getAddInvoiceStatus=(cb)=>{ allQuery(`SELECT * FROM notification where role='admin' && msg_type = 'Add invoice by client'`,cb)}
Notification.getPhotoStatus=(cb)=>{ allQuery(`SELECT * FROM notification where role='admin' && msg_type = 'Need more photos'`,cb)}
Notification.getDocStatus=(cb)=>{ allQuery(`SELECT * FROM notification where role='admin' && msg_type = 'Need more documents'`,cb)}
Notification.getReadyStatus=(cb)=>{ allQuery(`SELECT * FROM notification where role='admin' && msg_type = 'Invoice ready/Make payment'`,cb)}
Notification.getCompletedStatus=(cb)=>{ allQuery(`SELECT * FROM notification where role='admin' && msg_type = 'Completed'`,cb)}


module.exports = Notification;                