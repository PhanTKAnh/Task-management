const express = require("express");
require("dotenv").config();
var bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
var cors = require('cors')
const database = require("./config/database");


const routesApiVer1 = require("./api/v1/routes/client/index.route");

const app = express();
const port = process.env.PORT;

app.use(cors())

database.connect();

app.use(cookieParser('DBVFWFGVSGH'));

// parse application/json
app.use(bodyParser.json())

// Routes Version 1 
routesApiVer1(app);


app.listen(port, () =>{
    console.log(`App listening on port ${port}`);
});