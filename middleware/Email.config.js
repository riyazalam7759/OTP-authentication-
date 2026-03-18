import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: "novaastror@gmail.com", // your email address
        pass: "qtqc wzte pxiy nwts", // your email password or app password
    },
});

const SendEmail = async () => {
    try {
        const info = await transporter.sendMail({
            from: '"RiyazAuthApp" <novaastror@gmail.com>', // sender address
            to: "riyazrafique06@gmail.com", // recipient address
            subject: "Verification Code", // subject line
            text: "hello World", // plain text body
            html: "<b>Your verification code is: </b>" // HTML body

        })
        console.log(info)
    }

    catch (err) {
        console.log("Error sending email:", err);

    }
}
SendEmail();