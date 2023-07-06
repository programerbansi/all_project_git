const { allQuery, insertQuery } = require("../function/QueryFunction");
var History = function (data) {
    this.form_name=data.form_name
}

History.getDatas=(id,cb)=>{ allQuery(`SELECT * FROM history where user_id=${id}`,cb)}
History.deleteAll=(id,cb)=>{ allQuery(`DELETE FROM history WHERE user_id=${id}`,cb) }
History.addData=(v,cb)=>{ insertQuery('INSERT INTO history (`user_id`, `form_name`, `form_field_id`, `action`) VALUES (?,?,?,?)', [v.user_id,v.form_name,v.form_field_id,v.action],cb)}
// History.updateData=(id,v,cb)=>{ allQuery(`UPDATE history SET status ='${v.status}', show_status = ${v.show_status} WHERE id=${id}`,cb)}
History.deleteData=(id,cb)=>{ allQuery(`DELETE FROM history WHERE id=${id}`,cb) }
History.getHistory5=(id,cb)=>{ allQuery(`SELECT i.firstname as i_fname ,i.lastname as i_lname,h.*,u.firstname as u_fname,u.lastname as u_lname,c.card_number_text FROM history as h join invoice as i join team_user as u join card_details as c on ((h.form_name ='invoice' || h.form_name ='photo' || h.form_name ='document' || h.form_name ='activity' ) && i.id = h.form_field_id && i.user_id = ${id}) || (h.form_name ='user_team' && u.id = h.form_field_id && u.user_id=${id}) || ((h.form_name = 'card' || h.form_name = 'edit card status') && c.id = h.form_field_id && c.user_id = ${id}) WHERE h.user_id=${id} GROUP BY h.id ORDER BY h.id DESC `,cb)}
module.exports = History;  