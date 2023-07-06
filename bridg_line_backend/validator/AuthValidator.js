const jwt = require('jsonwebtoken');
const Login = require("../models/login");
exports.verifyToken = async function(req,res,next){
    let token = req.headers[`authorization`];
    if(token)
    {
        token = token.split(' ')[1];
        jwt.verify(token,process.env.JWT_SECRET,(err,result)=>{
            if(err) return res.status(401).send({ 'status': false, 'code': 401, 'message': "Please provide valid token!", 'error': 'Error!' })
            else {
                Login.getToken(token, function (err, l1) {
                    if (err) return res.status(400).send({ 'status': false, 'code': 400, 'message': err, 'error': 'Error!' })
                    else{
                         if(l1.length > 0)
                         {
                            return res.status(401).send({ 'status': false, 'code': 401, 'message': "Token is no longer valid!", 'error': 'Error!' })
                         }
                         else
                         {   
                            next();
                         }
                    }
                })
            }
        })
    }
    else
    {
        res.status(403).send({ 'status': false, 'code': 403, 'message': "Please provide token in header!", 'error': 'Error!' })
    }
}

