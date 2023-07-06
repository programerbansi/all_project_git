const {GraphQLList} = require('graphql');
// var db=require('../../models');
// const Users=db.users;
const UserType=require("../TypeDefs/UserType")

module.exports.USER_LIST1={
    type:new GraphQLList(UserType),
    resolve(parent,args,context){
        // console.log(context());
        let{dbconfig}=parent;
        let data = dbconfig.users.findAll();
        return data
    }
}

module.exports.USER_LIST2={
    type:new GraphQLList(UserType),
    resolve(parent,args){
        let {dbconfig}=parent;
        let data = dbconfig.users.findAll({where:{id:2}});
        return data
    }
}