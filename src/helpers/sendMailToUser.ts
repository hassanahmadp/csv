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
  }
}

/**
 * 
Drop Down for Agency.  Use other and allow them to type in.

Amtrak PD
Bay Constable
Federal Corrections
Freeport PD
Hempstead PD
Long Beach PD
Lynbrook PD
Malvern PD
NC DA Squad
NC Probation
NC Sheriff
NCPD 
NYC DOC
NYC Sanitation Police
NYC Sheriff
NYPD
NYS Court Officers 
NYS Trooper
Out of State Corrections
Out of State Other
Out of State Police
Out of State Sherriff 
Postal Police 
Quogue PD
RVC Police 
SC Sheriff
SCPD 
Village PD Other
 * 
 */
