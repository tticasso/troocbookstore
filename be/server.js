const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const httpErrors = require('http-errors');
const db = require('./models');

require('dotenv').config();
//Khoi tao web server
const app = express();
//Bo sung cac middleware kiem soat hoat dong tren web server
app.use(bodyParser.json());
app.use(morgan('dev'));
//Dinh tuyen cho root router
app.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Hello world"
    });
});

//Kiem soat loi
app.use(async (req, res, next) => {
    next(httpErrors.NotFound());
})

app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    });
});

//Lang nghe cac request tu client
app.listen(process.env.PORT, process.env.HOST_NAME, () => {
    console.log(`Server is running at: http://${process.env.HOST_NAME}:${process.env.PORT}`);
    db.connectDB();
});