import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service:'gmail',
  auth: {
    user: "hassaanahmaddigital@gmail.com", 
    pass: "your-email-password", 
  },
})


export async function sendMailToUser(user: User, link: string) {
  const subject = "Email to set password"
  const body = `Dear ${user.firstName},\n\nWelcome to our website! To set a password, click on the link. ${link}\n\nBest regards,\nThe Website Team`

  try {
    // Send the email
    await transporter.sendMail({
      from: "hassaanahmaddigital@gmail.com",
      to: user.email,
      subject,
      text: body,
    })
    console.log(`Email sent to ${user.email}`)
  } catch (error) {
    console.error("Error sending email:", error)
  }
}