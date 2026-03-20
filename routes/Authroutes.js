import express from "express";
import { register } from "../controllers/Auth.js";
import { VerifyEmail } from "../controllers/Auth.js"; // NEW: Import the new email verification controller function.
const Authroutes = express.Router();

Authroutes.post("/register", register);
Authroutes.post("/verifyemail", VerifyEmail); // NEW: Add route for email verification endpoint.

export default Authroutes;