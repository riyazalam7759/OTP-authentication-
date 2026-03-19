// NEW: Reusable OTP email template builder.
// Purpose: keep email UI/content in one file so send logic stays clean.
export const buildOtpEmailTemplate = ({ appName = "RiyazAuthApp", otpCode, expiryMinutes = 10 }) => {
  // NEW: Subject line returned to nodemailer.
  const subject = `Your OTP Code - ${appName}`;

  // NEW: Plain-text fallback for mail clients that do not render HTML.
  const text = `Your OTP code is ${otpCode}. This code will expire in ${expiryMinutes} minutes. Do not share this code with anyone.`;

  // NEW: Main HTML UI template shown in the email.
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 12px; background: #ffffff;">
      <h2 style="margin: 0 0 12px; color: #111827;">Verify your email</h2>
      <p style="margin: 0 0 16px; color: #374151; line-height: 1.6;">
        Use the OTP below to complete your signup.
      </p>
      <div style="font-size: 30px; letter-spacing: 6px; font-weight: 700; color: #0f172a; background: #f3f4f6; padding: 14px 18px; border-radius: 10px; text-align: center;">
        ${otpCode}
      </div>
      <p style="margin: 16px 0 8px; color: #374151;">This OTP is valid for ${expiryMinutes} minutes.</p>
      <p style="margin: 0; color: #6b7280; font-size: 13px;">
        For security, never share this code with anyone.
      </p>
      <hr style="margin: 20px 0; border: 0; border-top: 1px solid #e5e7eb;" />
      <p style="margin: 0; color: #9ca3af; font-size: 12px;">${appName}</p>
    </div>
  `;

  // NEW: Return all content formats used by transporter.sendMail.
  return { subject, text, html };
};
