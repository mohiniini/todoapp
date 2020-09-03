const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cros = require('cors');
app.use(cros());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
require('./db/database');
require('./routes')(app);
app.get('/mohini', function(req, res) {
    res.send("hrllp")
})
app.use((error, req, res, next) => {
    res.status(error.status || 500).send({
        error: {
            status: error.status || 500,
            message: error.message || 'Internal Server Error',
        },
    });
});



app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});

port = 3000;

app.listen(port, console.log(`listening on port ${port}...`));