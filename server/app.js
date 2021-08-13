const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const path = require('path')
const fs = require('fs');
const schema=require('./schema/schema') 
const mongoose=require('mongoose');

const app = express();

// Daatabase ORM
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);


//connect to database
fs.readFile('db-credentails.json', (err, data) => {
  if (err) throw err;
  data = JSON.parse(data);
  mongoose.connect(data.uri)
})




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