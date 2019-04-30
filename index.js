const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.port || 8000
const app = express();
const measurements = require('./api/routes/measurements');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.listen(PORT, (err)=>{
    if(!err)console.log("server started at port"+PORT);
});

app.use('/measurements',measurements);

module.exports = app;
