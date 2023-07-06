const { allQuery, insertQuery } = require("../function/QueryFunction");
var Job_Type = function (data) {
    this.type=data.type
}
Job_Type.getDatas=(cb)=>{ allQuery(`SELECT * FROM job_type`,cb)}
Job_Type.addData=(v,cb)=>{ insertQuery('INSERT INTO job_type (`type`) VALUES (?)', [v.type],cb)}
Job_Type.updateData=(id,v,cb)=>{ allQuery(`UPDATE job_type SET type ='${v.type}' WHERE id=${id}`,cb)}
Job_Type.deleteData=(id,cb)=>{ allQuery(`DELETE FROM job_type WHERE id=${id}`,cb) }

module.exports = Job_Type;