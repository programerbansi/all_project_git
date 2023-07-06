const Sequelize = require('sequelize')
const sequelize=new Sequelize('all-india','root','',{
    host:'127.0.0.1',
    dialect:'mysql',
    port: 3306,
    logging: console.log(),
})

sequelize.authenticate().then(()=>{
    console.log('connected...')
}).catch((e)=>{
  console.log(e);
})

module.exports = sequelize;