// FIX: Import transporter from the correct local config file.
import { transporter } from './Email.config.js';

export const sendVerificationCode = async (email, verificationCode) => {
    try{
        // FIX: Use `transporter` (correct spelling) to send emails.
        const response = await transporter.sendMail({
            from: '"RiyazAuthApp" <novaastror@gmail.com>', // sender address
            to: email, // recipient address
            subject: "Verify Your Email", // subject line
            text: `Your verification code is: ${verificationCode}`, // plain text body - FIX: Now includes random code
            html: `<b>Your verification code is: ${verificationCode}</b>` // HTML body
        })
        // FIX: Delivery debug logs to confirm SMTP acceptance for the destination email.
        console.log("Email accepted:", response.accepted);
        console.log("Email rejected:", response.rejected);
        console.log("Email messageId:", response.messageId);
        console.log("SMTP response:", response.response);
    }

    catch(err){
        console.log("Error sending email:", err);
        throw new Error(`Email send failed: ${err?.message || "Unknown SMTP error"}`);
    }

}