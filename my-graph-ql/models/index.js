const sequelize =require('../config/db')
const {Sequelize,DataTypes}=require('sequelize')
const db={}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.sequelize.sync({force:false}).then(()=>{
    console.log('yes re-sync')
}).catch((error)=>{
    return console.error(error);
})

db.users = require('./Users')(sequelize,DataTypes);
module.exports =db;