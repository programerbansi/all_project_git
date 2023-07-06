const graphql = require('graphql');
const {GraphQLObjectType,GraphQLSchema,GraphQLInt,GraphQLString,GraphQLList}=graphql;

const userType = new GraphQLObjectType({
     name:'user',
     fields:()=>({
        id:{type:GraphQLInt},
        name:{type:GraphQLString},
        email:{type:GraphQLString},
        phone:{type:GraphQLString},
        status:{type:GraphQLInt},
        create_at:{type:GraphQLString},
        modify_at:{type:GraphQLString}
     })
})
var db=require('./models');
const Users=db.users;

const RootQuery = new GraphQLObjectType({
    name:'xyz',
    fields:()=>({
        codeimprove:{
            type:new GraphQLList(userType),
            resolve(parent,args){
                let data = [{
                    id:1,name:"bansi",email:"bansi@gmail.com",phone:"8236589657"
                },
                {
                    id:2,name:"mansi",email:"mansi@gmail.com",phone:"9856785465"
                },
                {
                    id:3,name:"bhumi",email:"bhumi@gmail.com",phone:"6589678523"
                }]
                return data
            }
        },
        userList:{
            type:new GraphQLList(userType),
            resolve(parent,args){
                let data = Users.findAll();
                return data
            }
        }
    })
})
module.exports=new GraphQLSchema({query:RootQuery})