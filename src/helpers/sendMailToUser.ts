import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.sendinblue.com",
  port: 587,
  auth: {
    user: process.env.MAILER_EMAIL,
    pass: process.env.MAILER_PASSWORD,
  },
});

export async function sendMailToUser(user:{email:string, firstName: string}, link: string) {
  const subject = "Email to set password";
  debugger
  const body = `Dear ${user.firstName},\n\nWelcome to our website! To set a password, click on the link. ${link}\n\nBest regards,\nThe Website Team`;

  try {
    // Send the email
    const mailOptions = {
      from: process.env.MAILER_EMAIL,
      to: user.email,
      subject,
      text: body,
    };

    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log(`Email sent to ${user.email}`, {response: info.response});
      }
    });
    console.log(`Email sent to ${user.email}`);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error(JSON.stringify(error))
  }
}
