const nodeMailer = require('nodemailer');

const sendEmail = async (options) => {

    if (!options || !options.email || !options.subject || !options.message) {
        throw new Error("Invalid email options provided");
    }

    const transporter = nodeMailer.createTransport({
        service: process.env.SMPT_SERVICE,
        auth: {
            user: process.env.SMPT_MAIL,
            pass: process.env.SMPT_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.SMPT_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message
    };

    await transporter.sendMail(mailOptions); // Corrected method name
};

module.exports = sendEmail;
