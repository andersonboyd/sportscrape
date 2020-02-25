const express = require("express");
// const mongoose = require("mongoose");
// const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

if(process.env.NODE_ENV === "production"){
    app.use(express.static("client/build"));
}

// app.use(routes);

// mongoose.connect

app.listen(PORT, function(){
    console.log(`API listening on Port ${PORT}`);
});

module.exports = app;