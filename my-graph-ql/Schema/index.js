const graphql = require('graphql');
const {GraphQLObjectType,GraphQLSchema,GraphQLInt,GraphQLString,GraphQLList}=graphql;


const {USER_LIST1,USER_LIST2}=require("./Queries/Users")
const {USER_ADD,USER_UPDATE,USER_DELETE}=require("./Mutations/Users")
const RootQuery = new GraphQLObjectType({
    name:'xyz',
    fields:()=>({
        // codeimprove:{
        //     type:new GraphQLList(UserType),
        //     resolve(parent,args){
        //         let data = [{
        //             id:1,name:"bansi",email:"bansi@gmail.com",phone:"8236589657"
        //         },
        //         {
        //             id:2,name:"mansi",email:"mansi@gmail.com",phone:"9856785465"
        //         },
        //         {
        //             id:3,name:"bhumi",email:"bhumi@gmail.com",phone:"6589678523"
        //         }]
        //         return data
        //     }
        // },
        userList1:USER_LIST1,
        userList2:USER_LIST2,
        
    })

})

const Mutation=new GraphQLObjectType({
    name:'mutation',
    fields:{ 
        createUser:USER_ADD,
        updateUser:USER_UPDATE,
        deleteUser:USER_DELETE,
    }
})
module.exports=new GraphQLSchema({query:RootQuery,mutation:Mutation})