const { allQuery, insertQuery } = require("../function/QueryFunction");
const date=new Date();
var Login = function (data) {
     this.email=data.email,
     this.password=data.password,
     this.role=data.role
}
Login.usersAll = (cb) => {allQuery(`SELECT * FROM users`,cb)}   
Login.users = (email,cb) => {allQuery(`SELECT * FROM users WHERE email = '${email}'`,cb)}   
Login.updatePassword = (email,password,cb)=>{allQuery(`UPDATE users SET password='${password}' WHERE email ='${email}'`,cb)}
Login.addUser=(v,status,psw,val,cb)=>{insertQuery('INSERT INTO users (`firstname`, `lastname`,`email`,`visible_password`,`password`,`role`,`phone`,`comp_name`,`comp_address`,`comp_logo`,`comp_website`,`status`,`created_at`,`updated_at`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [v.firstname,v.lastname,v.email,v.password,psw,v.role,v.phone,v.comp_name,v.comp_address == 'null' ? null : v.comp_address,val,v.comp_website == 'null' ? null:v.comp_website,JSON.stringify(status),date,date],cb)}
Login.roleUser = (cb) => {allQuery(`SELECT SUM(o.pay_amount) as amount,u.* FROM order_invoice as o RIGHT JOIN users as u on u.id = o.user_id where role = 'user' group by u.id`,cb)} 
Login.updateData=(id,v,psw,val,cb)=>{ allQuery(`UPDATE users SET firstname ='${v.firstname}',lastname ='${v.lastname}',email='${v.email}',visible_password='${v.password}',password='${psw}',role='${v.role}',phone='${v.phone}' ,comp_name='${v.comp_name}',comp_address=${v.comp_address == 'null' ? v.comp_address :`'${v.comp_address}'`},comp_logo='${val}',comp_website=${v.comp_website == 'null' ? v.comp_website :`'${v.comp_website}'`} WHERE id=${id}`,cb)}
Login.deleteData=(id,cb)=>{allQuery(`DELETE FROM users WHERE id=${id}`,cb)}
Login.storeToken=(token,cb)=>{insertQuery('INSERT INTO black_list_token (`token`,`created_at`,`updated_at`) VALUES (?,?,?)', [token,date,date],cb)}
Login.getToken = (token,cb) => {allQuery(`SELECT * FROM black_list_token WHERE token = '${token}'`,cb)}  
Login.addTeam=(v,psw,cb)=>{ insertQuery('INSERT INTO users (`firstname`, `lastname`,`email`,`visible_password`,`password`,`role`,`status`) VALUES (?,?,?,?,?,?,?)', [v.firstname,v.lastname,v.email,v.password,psw,v.role,JSON.stringify(v.status)],cb)}
Login.updateTeam=(id,v,psw,cb)=>{ allQuery(`UPDATE users SET firstname ='${v.firstname}',lastname ='${v.lastname}',email='${v.email}',visible_password='${v.password}',password='${psw}',role='${v.role}',status='${JSON.stringify(v.status)}' WHERE id=${id}`,cb)}
Login.roleAdmin = (cb) => {allQuery(`SELECT * FROM users where role = 'admin' && id != 1`,cb)} 
Login.addUserTeam=(v,psw,cb)=>{ insertQuery('INSERT INTO team_user (`firstname`, `lastname`,`email`,`visible_password`,`password`,`role`,`user_id`,`status`) VALUES (?,?,?,?,?,?,?,?)', [v.firstname,v.lastname,v.email,v.password,psw,v.role,v.user_id,JSON.stringify(v.status)],cb)}
Login.updateUserTeam=(id,v,psw,cb)=>{ allQuery(`UPDATE team_user SET firstname ='${v.firstname}',lastname ='${v.lastname}',email='${v.email}',visible_password='${v.password}',password='${psw}',role='${v.role}',status='${JSON.stringify(v.status)}' WHERE id=${id}`,cb)}
Login.getUserTeam = (id,cb) => {allQuery(`SELECT * FROM team_user where user_id = ${id}`,cb)} 
Login.userTeamEmail = (email,cb) => {allQuery(`SELECT * FROM team_user WHERE email ='${email}'`,cb)}  
Login.deleteUserTeam=(id,cb)=>{allQuery(`DELETE FROM team_user WHERE id=${id}`,cb)}
Login.updateUserPassword = (email,password,cb)=>{allQuery(`UPDATE team_user SET password='${password}' WHERE email ='${email}'`,cb)}
Login.userId = (id,cb) => {allQuery(`SELECT email FROM users where id=${id}`,cb)}   
module.exports = Login;