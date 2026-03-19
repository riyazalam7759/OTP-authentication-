// FIX: Import transporter from the correct local config file.
import { transporter } from './Email.config.js';
// NEW: Import reusable OTP template so email UI/content is managed in one place.
import { buildOtpEmailTemplate } from './otpTemplate.js';

export const sendVerificationCode = async (email, verificationCode) => {
    try{
        // NEW: Build subject/text/html from the template instead of hardcoding in sendMail.
        const { subject, text, html } = buildOtpEmailTemplate({
            // CHANGED: Centralized template inputs (easy to customize app name and expiry).
            appName: 'RiyazAuthApp',
            otpCode: verificationCode,
            expiryMinutes: 10
        });

        // FIX: Use `transporter` (correct spelling) to send emails.
        const response = await transporter.sendMail({
            from: '"RiyazAuthApp" <novaastror@gmail.com>', // sender address
            to: email, // recipient address
            // CHANGED: These are now provided by otpTemplate.js.
            subject,
            text,
            html
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