const mongoose = require("mongoose")
//Cấu hình cho mongoose dạng global
mongoose.Promise = global.Promise;
//Định nghĩa đối tương Database
const db = {}
db.mongoose = mongoose;

// Bổ sung các thuộc tính cho database

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