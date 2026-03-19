import nodemailer from 'nodemailer';
// FIX: Export transporter so other files can import and reuse one mail client.
export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: "novaastror@gmail.com", // your email address
        pass: "qtqc wzte pxiy nwts", // your email password or app password
    },
});

// FIX: Removed auto-call (SendEmail()) to avoid sending mail during server startup/import.