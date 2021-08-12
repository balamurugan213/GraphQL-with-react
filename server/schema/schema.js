const graphql=require("graphql");
const _ = require('lodash');
const User=require('../models/user')
const Stack=require('../models/stack')



const {GraphQLObjectType,GraphQLString,GraphQLSchema,GraphQLID,GraphQLList,GraphQLNonNull}=graphql;



const StackType = new GraphQLObjectType({
    name:'Stack',
    fields:()=>({
        id:{ type : GraphQLID},
        name:{type:GraphQLString},
        language:{ type : GraphQLString},
        userId:{ type : GraphQLString},
        user:{
            type:UserType,
            resolve(parent,args){
                return User.findById(parent.userId);
            }
        }

    })
})

const UserType=new GraphQLObjectType({
    name:'Users',
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString}, 
        age:{type:graphql.GraphQLInt},
        stack:{
            type:new GraphQLList(StackType),
            resolve(parent,args){
                return Stack.find({userId:parent.id})
            }
        }
    })
})

const RootQuery=  new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        stack:{
            type:StackType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
            //  code the get date from db/ other resources.
            return Stack.findById(args.id)

            }
        },
        user:{
            type:UserType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return User.findById(args.id);

            }
        },
        stacks:{
            type:new GraphQLList(StackType),
            resolve(parent,args){
                return Stack.find();
            }
        },
        users:{
            type:new GraphQLList(UserType),
            resolve(parent,args){
                return User.find();
            }
        }
    }
});

const Mutation=new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addUser:{
            type: UserType,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)},
                age:{type:new GraphQLNonNull(graphql.GraphQLInt)}
            },
            resolve(parent,args){
                let user=new User({
                    name:args.name,
                    age:args.age
                });
                console.log(user)
                return user.save()
            }
        },
        addStack:{
            type:StackType,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)},
                language:{type:new GraphQLNonNull(GraphQLString)},
                userId:{type:new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent,args){
                let stack=new Stack({
                    name:args.name,
                    language:args.language,
                    userId:args.userId
                })
                return stack.save()
            }
        }
    }
})

module.exports=new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation
})