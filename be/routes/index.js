const userRouter = require('./user.routes');
const bookRouter = require('./book.routes');
const authorRouter = require('./author.routes');
const categoryRouter = require('./category.routes');
const nationRouter = require('./nation.routes');
const cartRouter = require('./cart.routes');
module.exports = {
    userRouter,
    bookRouter,
    authorRouter,
    categoryRouter,
    nationRouter,
    cartRouter
}