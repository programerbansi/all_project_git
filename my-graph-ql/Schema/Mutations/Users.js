const {GraphQLList,GraphQLString,GraphQLInt} = require('graphql');

// var db=require('../../models');
// const Users=db.users;
const UserType=require("../TypeDefs/UserType")
const StatusType=require("../TypeDefs/StatusType")
module.exports.USER_ADD={
    type:StatusType,
    args:{
        name:{type:GraphQLString},
        email:{type:GraphQLString},
        gender:{type:GraphQLString},
    },
    resolve(parent,args){
        let {dbconfig}=parent;
        dbconfig.users.create({
            name:args.name,
            email:args.email,
            gender:args.gender,
        })
        return {success:true,message:"add successfuly!!",error:""};
        // let data = Users.findAll();
        // return data 
    }
}

module.exports.USER_UPDATE={
    type:StatusType,
    args:{
        id:{type:GraphQLInt},
        name:{type:GraphQLString},
        email:{type:GraphQLString},
        gender:{type:GraphQLString},
    },
    resolve(parent,args){
        let {dbconfig}=parent;
        dbconfig.users.update({
            name:args.name,
            email:args.email,
            gender:args.gender,
        },{
            where:{id:args.id}
        })
        return {success:true,message:"update successfuly!!",error:""};
        // let data = Users.findAll();
        // return data 
    }
}
module.exports.USER_DELETE={
    type:StatusType,
    args:{
        id:{type:GraphQLInt},
    },
    resolve(parent,args){
        let {dbconfig}=parent;
        dbconfig.users.destroy({
            where:{id:args.id}
        })
        return {success:true,message:"delete successfuly!!",error:""};
        // let data = Users.findAll();
        // return data 
    }
}