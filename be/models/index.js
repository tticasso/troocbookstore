const mongoose = require("mongoose")
const user = require("./user.model")
const author = require("./author.model")
//Cấu hình cho mongoose dạng global
mongoose.Promise = global.Promise;
//Định nghĩa đối tương Database
const db = {}
db.mongoose = mongoose;

// Bổ sung các thuộc tính cho database
db.user = user;
db.author = author;
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