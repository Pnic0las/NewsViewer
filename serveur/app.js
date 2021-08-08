const express = require('express');
const app = express();
var mongoose = require('mongoose');
const bodyParser = require('body-parser')
var cors = require('cors')

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

mongoose.connect('mongodb://localhost:27017/epitrello', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

app.use(cors())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.use(bodyParser.json())

app.use("/", indexRouter);
app.use("/users", usersRouter);


// listen on port 8080
app.listen(8080, function () {
  console.log('App listening on port 8080!')
})