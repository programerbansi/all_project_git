const mysql = require("mysql");
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "bridge_line"  
})
con.connect((err) => {       
    if (err) {   
        console.log("error in connection!",err)
    }
    else {
        console.log(`server is connected succesfully...`)
    }
})
module.exports = con