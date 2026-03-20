import UserModel from "../models/user.js";
import bcryptjs from "bcryptjs";
import { sendVerificationCode } from "../middleware/Email.js";


const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        // FIX: Normalize email so duplicate checks and delivery use one canonical value.
        const normalizedEmail = email.trim().toLowerCase();

        const ExistingUser = await UserModel.findOne({ email: normalizedEmail });
        if (ExistingUser && ExistingUser.isVerified) {
            return res.status(400).json({ success: false, message: "User already exists , Please login" });
        }

        // FIX: If user exists but is not verified, resend a fresh code instead of blocking registration.
        if (ExistingUser && !ExistingUser.isVerified) {
            const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
            ExistingUser.verificationCode = verificationCode;
            await ExistingUser.save();
            await sendVerificationCode(ExistingUser.email, verificationCode);

            return res.status(200).json({
                success: true,
                message: "Verification code resent successfully",
                user: {
                    id: ExistingUser._id,
                    name: ExistingUser.name,
                    email: ExistingUser.email,
                    isVerified: ExistingUser.isVerified,
                    verificationCode
                }
            });
        }

        const hashedPassword = await bcryptjs.hashSync(password, 10);
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString(); //to generate 6 digit random number as verification code for every user
        const user = new UserModel({
            name,
            email: normalizedEmail,
            password: hashedPassword,
            verificationCode
        })
        await user.save();

        await sendVerificationCode(user.email, verificationCode); // Call the function to send the verification code email

        // FIX: Return only safe fields (do not leak hashed password in API response).
        return res.status(200).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                isVerified: user.isVerified,
                verificationCode: user.verificationCode
            }
        });

    }
    catch (err) {
        console.log("Register error:", err);
        return res.status(500).json({ success: false, message: err?.message || "internalServer Error" });

    }
}

const VerifyEmail = async (req, res) => {
    try {
        const { code } = req.body;
        const user = await UserModel.findOne({
            verificationCode: code
        })
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or Expired code" });
        }
        user.isVerified = true;
        user.verificationCode = undefined;
        await user.save();
        return res.status(200).json({ success: true, message: "Email verified successfully" });

    }
    catch (err) {
        console.log("Email verification error:", err);
        return res.status(500).json({ success: false, message: err?.message || "internal Server Error" });
    }
}

export { register, VerifyEmail };