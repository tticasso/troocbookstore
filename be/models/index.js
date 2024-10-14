const mongoose = require("mongoose")
const user = require("./user.model")
const author = require("./author.model")
const book = require("./book.model")
const category = require("./category.model")
const nation = require("./nation.model")
const cartItem = require("./cartItem.model")
const cart = require("./cart.model")
//Cấu hình cho mongoose dạng global
mongoose.Promise = global.Promise;
//Định nghĩa đối tương Database
const db = {}
db.mongoose = mongoose;

// Bổ sung các thuộc tính cho database
db.user = user;
db.author = author;
db.book = book;
db.category = category;
db.nation = nation;
db.cartItem = cartItem;
db.cart = cart;
// Thuộc tính tham chiếu tới action kết nối CSDL
db.connectDB = async () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: process.env.DB_NAME
    })
        .then(() => console.log("Connect to Mongo success"))
        .catch(error => {
            console.error(error.message);
            process.exit();
        })
}

module.exports = db;