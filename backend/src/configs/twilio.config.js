require('dotenv').config();
const twilio = require("twilio"); 
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN; 
const client = twilio(accountSid, authToken);
const nodemailer = require("nodemailer");
const Email = process.env.Email;
async function createMessage(body, to) {
    const message = await client.messages.create({

        body: body,
        from: "+17402245415",
        to: "+91" + to,
    }).then(message => console.log(message.sid)).catch(console.error);



}
const mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: Email,
        pass: "pllo ifeu sbcg otcc"
    }

});




async function sendEmail(to, subject, text) {
    let mailDetails = {
        from: Email,
        to: to,
        subject: subject,
        text: text
    };
    await mailTransporter
        .sendMail(mailDetails,
            function (err, data) {
                if (err) {
                    console.log('Error Occurs');
                    console.log(err.message)
                } else {
                    console.log('Email sent successfully');
                }
            });


}


module.exports = {
    createMessage,
    sendEmail
}