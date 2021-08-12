const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema=require('./schema/schema') 
const mongoose=require('mongoose');

const app = express();

//connect ot database
const uri = "mongodb+srv://bala:qwert12345@dao.fphzg.mongodb.net/LinkedIn?retryWrites=true&w=majority";


mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(uri)

mongoose.connection.once('open',()=>{
  console.log('connect to database');
})


app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  }),
);
 
app.listen(4000);