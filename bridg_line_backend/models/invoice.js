const { allQuery, insertQuery } = require("../function/QueryFunction");
const date=new Date();
var Invoice = function (data) {
     this.email=data.email,
     this.firstname=data.firstname,
     this.lastname=data.lastname
}
Invoice.admin_invoice_List= (state,cb) => {allQuery(`SELECT * FROM invoice where status = '${state}' `,cb)}  
Invoice.invoiceAllWithComplete = (id,cb) => {allQuery(`SELECT * FROM invoice WHERE user_id = ${id} && status != 'Completed' `,cb)}   
Invoice.invoiceAll = (id,cb) => {allQuery(`SELECT * FROM invoice WHERE user_id = ${id}`,cb)}   
Invoice.invoiceEmail = (email,cb) => {allQuery(`SELECT * FROM invoice WHERE email = '${email}' `,cb)}   
Invoice.invoicePhoto = (id,cb) => {allQuery(`SELECT u.firstname ,u.lastname , i.* FROM users as u join invoice_photo as  i on u.id = i.user_id WHERE i.invoice_id=${id}`,cb)}   
Invoice.invoiceDoc= (id,cb) => {allQuery(`SELECT u.firstname ,u.lastname , d.* FROM users as u join invoice_document as d on u.id = d.user_id WHERE d.invoice_id=${id}`,cb)}   
Invoice.addInvoice=(v,cb)=>{insertQuery('INSERT INTO invoice ( `user_id`, `firstname`, `lastname`, `fullname`,`email`, `main_phone`, `mobile_phone`, `address_1`, `address_2`, `state`, `city`, `postal_code`, `job_type`, `status`,`estimate`,`created_at`, `updated_at`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [v.user_id,v.firstname,v.lastname,`${v.firstname} ${v.lastname}`,v.email == 'null' ? null :v.email,v.main_phone == 'null' ? null :v.main_phone,v.mobile_phone == 'null' ? null:v.mobile_phone,v.address_1,v.address_2 == 'null' ? null:v.address_2,v.state,v.city,v.postal_code,v.job_type,v.status == 'null' ? null :v.status,v.estimate,date,date],cb)}
Invoice.addPhoto=(v,cb)=>{ insertQuery('INSERT INTO invoice_photo ( `user_id`, `invoice_id`, `photo`, `name`, `type`, `size`,`firstname`,`lastname`,`created_at`, `updated_at`) VALUES (?,?,?,?,?,?,?,?,?,?)', [v.user_id,v.invoice_id,v.photo,v.name,v.type,v.size,v.firstname,v.lastname,date,date],cb)}
Invoice.addDemoSheet=(v,cb)=>{ insertQuery('INSERT INTO invoice_document ( `user_id`, `invoice_id`, `document`, `name`,`type`, `size`,`firstname`,`lastname`,`created_at`, `updated_at`) VALUES (?,?,?,?,?,?,?,?,?,?)', [v.user_id,v.invoice_id,v.document,v.name,v.type,v.size,v.firstname,v.lastname,date,date],cb)}
Invoice.deletePhoto=(id,cb)=>{allQuery(`DELETE FROM invoice_photo WHERE id=${id}`,cb)}
Invoice.deleteDemoSheet=(id,cb)=>{allQuery(`DELETE FROM invoice_document WHERE id=${id}`,cb)}
Invoice.deleteInvoice=(id,cb)=>{allQuery(`DELETE FROM invoice WHERE id=${id}`,cb)}             
Invoice.deletePhotoByUser=(id,cb)=>{allQuery(`DELETE FROM invoice_photo WHERE user_id=${id}`,cb)}
Invoice.deleteDemoSheetByUser=(id,cb)=>{allQuery(`DELETE FROM invoice_document WHERE user_id=${id}`,cb)}
Invoice.updateInvoice=(id,v,cb)=>{allQuery(`UPDATE invoice SET fullname='${v.firstname} ${v.lastname}',firstname ='${v.firstname}', lastname='${v.lastname}', email=${v.email == 'null' ? v.email : `"${v.email}"`}, main_phone=${v.main_phone == 'null' ? v.main_phone : `"${v.main_phone}"`}, mobile_phone=${v.mobile_phone == 'null' ? v.mobile_phone : `"${v.mobile_phone}"`}, address_1='${v.address_1}',address_2=${v.address_2 == 'null' ? v.address_2 : `"${v.address_2}"`},  state='${v.state}', city='${v.city}', postal_code=${v.postal_code}, job_type='${v.job_type}',estimate=${v.estimate} WHERE id=${id}`,cb)}
Invoice.invoice_List= (cb) => {allQuery(`SELECT * FROM invoice where status != 'Completed' `,cb)}  
Invoice.updateInvoiceStatus=(id,v,cb)=>{allQuery(`UPDATE invoice SET status ='${v.status}' WHERE id=${id}`,cb)}
Invoice.invoiceNeed= (id,cb) => {allQuery(`SELECT * FROM invoice WHERE status != 'Completed' && user_id=${id}`,cb)}
Invoice.searchGloble= (id,text,cb)=>{allQuery(`SELECT j.type, i.id, i.firstname,i.lastname,i.fullname,i.email,i.job_type,i.main_phone,i.mobile_phone,i.address_1,i.address_2,i.state,i.city,i.postal_code,i.status,
CASE WHEN i.status = 'Completed' THEN f.invoice_file END AS file from invoice as i join invoice_files as f join job_type as j on j.id = i.job_type WHERE i.user_id = ${id} && (i.fullname LIKE '${text}%' || i.firstname LIKE '${text}%' || i.lastname LIKE '${text}%' || i.email LIKE '${text}%' || i.job_type LIKE '${text}%' || i.main_phone LIKE '${text}%' || i.mobile_phone LIKE '${text}%' || i.address_1 LIKE '${text}%' || i.address_2 LIKE '${text}%' || i.state LIKE '${text}%' || i.city LIKE '${text}%' || i.postal_code LIKE '${text}%' || i.status LIKE '${text}%' || j.type LIKE '${text}%') group by i.id`,cb)}
Invoice.updateTaskManageDefault=(id,v,cb)=>{allQuery(`UPDATE invoice SET message=${v.message == 'null' ? v.message : `"${v.message}"`} , status ='${v.status}' WHERE id=${id}`,cb)}
Invoice.updateTaskManageFile=(id,v,val,cb)=>{allQuery(`UPDATE invoice SET message=${v.message == 'null' ? v.message : `"${v.message}"`} , status='${v.status}' , invoice_file='${val}' WHERE id=${id}`,cb)}
Invoice.updateTaskManageAmount=(id,v,val,cb)=>{allQuery(`UPDATE invoice SET message=${v.message == 'null' ? v.message : `"${v.message}"`} , status ='${v.status}' , invoice_file='${val}', amount=${v.amount} WHERE id=${id}`,cb)}
Invoice.invoiceId = (id,cb) => {allQuery(`SELECT j.type,i.* from invoice as i join job_type as j on j.id = i.job_type WHERE i.id = ${id}`,cb)}  
Invoice.invoiceCompleted = (id,cb) => {allQuery(`SELECT * FROM invoice WHERE user_id = ${id} && status = 'Completed' `,cb)}    
Invoice.invoiceCompletedAll = (cb) => {allQuery(`SELECT * FROM invoice WHERE status = 'Completed' `,cb)}  
Invoice.invoicePendingAll = (cb) => {allQuery(`SELECT u.comp_name as ucomp_name,u.firstname as ufname , u.lastname as ulname, i.* FROM invoice as i join users as u on i.user_id = u.id WHERE i.status = 'Pending' `,cb)}                        
Invoice.invoiceNeedPhotosDocAll = (cb) => {allQuery(`SELECT u.comp_name as ucomp_name,u.firstname as ufname , u.lastname as ulname, i.* FROM invoice as i join users as u on i.user_id = u.id WHERE i.status = 'Need more photos' || i.status = 'Need more documents' `,cb)}    
Invoice.invoiceNeedDocumentsAll = (cb) => {allQuery(`SELECT * FROM invoice WHERE status = 'Need more documents' `,cb)}     
Invoice.invoiceReadyAll = (cb) => {allQuery(`SELECT u.comp_name as ucomp_name,u.firstname as ufname , u.lastname as ulname, i.* FROM invoice as i join users as u on i.user_id = u.id WHERE i.status = 'Invoice ready/Make payment' `,cb)}  
Invoice.invoiceOtherAll = (cb) => {allQuery(`SELECT u.comp_name as ucomp_name,u.firstname as ufname , u.lastname as ulname, i.* FROM invoice as i join users as u on i.user_id = u.id WHERE i.status != 'Completed' && i.status != 'Invoice ready/Make payment' && i.status != 'Need more documents' && i.status != 'Need more photos' && i.status != 'Pending' `,cb)}  
Invoice.invoiceNotCompleted = (id,cb) => {allQuery(`SELECT u.comp_name as ucomp_name,u.firstname as ufname , u.lastname as ulname, i.* FROM invoice as i join users as u on i.user_id = u.id WHERE i.user_id = ${id} && i.status != 'Completed' `,cb)}    
Invoice.addInvoiceFile=(v,cb)=>{ insertQuery('INSERT INTO invoice_files ( `user_id`, `invoice_id`, `invoice_file`, `name`,`type`, `size`,`firstname`,`lastname`,`created_at`, `updated_at`) VALUES (?,?,?,?,?,?,?,?,?,?)', [v.user_id,v.invoice_id,v.invoice_file,v.name,v.type,v.size,v.firstname,v.lastname,date,date],cb)}
Invoice.getInvoiceFile= (id,cb) => {allQuery(`SELECT u.comp_name as ucomp_name, u.firstname ,u.lastname , d.* FROM users as u join invoice_files as d on u.id = d.user_id WHERE d.id=${id}`,cb)}   
Invoice.deleteInvoiceFile=(id,cb)=>{allQuery(`DELETE FROM invoice_files WHERE invoice_id=${id}`,cb)}
Invoice.getFile=(id,cb)=>{`SELECT * from invoice_files WHERE invoice_id = ${id}`,cb}
module.exports = Invoice;                         