const graphql = require('graphql');
const {GraphQLObjectType,GraphQLSchema,GraphQLInt,GraphQLString,GraphQLList}=graphql;

const UserType = new GraphQLObjectType({
     name:'user',
     fields:()=>({
        id:{type:GraphQLInt},
        name:{type:GraphQLString},
        email:{type:GraphQLString},
        phone:{type:GraphQLString},
        status:{type:GraphQLInt},
        create_at:{type:GraphQLString},
        modify_at:{type:GraphQLString},
        gender:{type:GraphQLString},
     })
})
module.exports=UserType