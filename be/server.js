const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const httpErrors = require('http-errors');
const db = require('./models');
const userRouter = require('./routes/user.routes');
const authorRouter = require('./routes/author.routes');
const bookRouter = require('./routes/book.routes');
const categoryRouter = require('./routes/category.routes');
const nationRouter = require('./routes/nation.routes');
const cartRouter = require('./routes/cart.routes');
const orderRouter = require('./routes/order.routes');
require('dotenv').config();
//Khoi tao web server
const app = express();
//Bo sung cac middleware kiem soat hoat dong tren web server
// app.use(cors({
//     origin: 'http://localhost:3000',
//     methods: 'GET,POST,PUT,DELETE',
//     credentials: true
//   }));
app.use(bodyParser.json());
app.use(morgan('dev'));
//Dinh tuyen cho root router
app.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Hello world"
    });
});

app.use('/api/user', userRouter);
app.use('/api/author', authorRouter);
app.use('/api/book', bookRouter);
app.use('/api/category', categoryRouter);
app.use('/api/nation', nationRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
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