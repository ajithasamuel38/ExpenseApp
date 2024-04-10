const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./config/db"); 

const routes = require("./routes/userRoutes")

const cors = require('cors'); 

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.use(routes);


sequelize.sync().then((result)=>{
    console.log(result);
    app.listen(4000);
}).catch((err)=>{
    console.log(err)
});