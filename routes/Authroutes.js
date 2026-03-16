import express from "express";
import { register } from "../controllers/Auth.js";
const Authroutes = express.Router();

Authroutes.post("/register", register);

export default Authroutes;