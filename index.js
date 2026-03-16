// code by zahid
import express from "express";
import dotenv from "dotenv";
import DBconn from "./libs/db.js";
import Authroutes from "./routes/Authroutes.js";

dotenv.config();
DBconn();

const PORT = process.env.PORT || 6000;
const app = express();
app.use(express.json());
app.use('/auth', Authroutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
console.log("Hello World!");
