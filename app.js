const express = require('express');
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressValidator = require("express-validator")
require("dotenv").config();

//import routes
const userRoutes = require('./routes/user.js')

//app
const app = express();

//db - Use mongoose to connect MongoDB
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  // useCreateIndex: true
}).then(() => console.log("DB connected"))
  .catch((err) => console.log("DB Error => ", err));

//middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator())

//routes middleware - prepends /api to localhost:8000
app.use('/api', userRoutes)

const port = process.env.PORT || 8000

app.listen(port, () => {
  console.log(`The Audience is listening on PORT ${port}`)
})



