const express=require('express');
const { graphqlHTTP } = require('express-graphql');
const app = express();
const PORT =4047;
const schema = require('./Schema/index');
const cors = require( `cors` );
require('./models')
var db=require('./models');
app.use(express.json());
app.use( cors() );
var root={
    ip:"127.0.0.1",
    dbconfig:db,
    accessKey:"ssssssss",
}
// root value and context no user data pass karva mate thy like, db use karva module/index mathi lai e eni jagay e server ma ek var import kari ne query and mutation ma mokli shki  
const context= async (req)=>{
    console.log(req.headers.host)
}
app.use('/graphql',graphqlHTTP( async req=>({
         schema,
         rootValue:root,
         graphiql :true,
         context:()=>context(req),
})))

app.listen(PORT,()=>{
    console.log(`App is listing at http://localhost:${PORT}`)
})