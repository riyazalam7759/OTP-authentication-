import mongoose from "mongoose";
const DBconn = async () => {
    try {
        mongoose.connect(process.env.MONGO_URL)
        console.log("DB connected successfully");
    }
    catch (err) {
        console.log("DB connection failed", err);
    }
}
export default DBconn;