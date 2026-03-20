// NEW: Reusable Welcome email template builder.
// Purpose: keep subject/text/html in one place for easy edits.
export const buildWelcomeEmailTemplate = ({
  appName = "RiyazAuthApp",
  userName = "User",
  loginUrl = "",
  supportEmail = ""
}) => {
  // NEW: Subject line for welcome message.
  const subject = `Welcome to ${appName}`;

  // NEW: Plain-text fallback for mail clients with no HTML support.
  const text = `Hi ${userName}, welcome to ${appName}. Your account is ready. ${loginUrl ? `Login here: ${loginUrl}.` : ""} ${supportEmail ? `Need help? Contact: ${supportEmail}.` : ""}`;

  // NEW: Main HTML UI for welcome email.
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 12px; background: #ffffff;">
      <h2 style="margin: 0 0 12px; color: #111827;">Welcome, ${userName}</h2>
      <p style="margin: 0 0 14px; color: #374151; line-height: 1.6;">
        Your account has been created successfully. We are happy to have you with us.
      </p>
      <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 10px; padding: 14px; margin: 0 0 16px; color: #1f2937;">
        You can now sign in and start using ${appName}.
      </div>
      ${loginUrl ? `<a href="${loginUrl}" style="display: inline-block; background: #111827; color: #ffffff; text-decoration: none; padding: 10px 16px; border-radius: 8px; font-weight: 600;">Go to Dashboard</a>` : ""}
      ${supportEmail ? `<p style="margin: 16px 0 0; color: #6b7280; font-size: 13px;">Need help? Reach us at ${supportEmail}</p>` : ""}
      <hr style="margin: 20px 0; border: 0; border-top: 1px solid #e5e7eb;" />
      <p style="margin: 0; color: #9ca3af; font-size: 12px;">${appName}</p>
    </div>
  `;

  // NEW: Return content payload for transporter.sendMail.
  return { subject, text, html };
};
