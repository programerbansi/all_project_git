const graphql = require('graphql');
const {GraphQLObjectType,GraphQLSchema,GraphQLBoolean,GraphQLInt,GraphQLString,GraphQLList}=graphql;

const StatusType = new GraphQLObjectType({
     name:'status',
     fields:()=>({ 
        success:{type:graphql.GraphQLBoolean},
        message:{type:GraphQLString},
        error:{type:GraphQLString},
     })
})
module.exports=StatusType