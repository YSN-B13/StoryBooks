const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        console.log(`MongoDB connected successfully: ${conn.connection.host}`);
    } catch(error) {
        console.log("Error with connecting with the MongoDB", error)
        process.exit(1)
    }
}

module.exports = connectDB
