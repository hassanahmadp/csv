import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  port: 587, // Replace with your SMTP port
  secure: false, // Set to true if using SSL/TLS
  auth: {
    user: "your-email@example.com", // Replace with your email address
    pass: "your-email-password", // Replace with your email password
  },
})


export async function sendMailToUser(user: User) {
  const subject = "Welcome to our website"
  const body = `Dear ${user.firstName},\n\nWelcome to our website! We are excited to have you as a member.\n\nBest regards,\nThe Website Team`

  try {
    // Send the email
    await transporter.sendMail({
      from: "hassanahmadp@gmail.com", // Replace with your email address
      to: user.email,
      subject,
      text: body,
    })
    console.log(`Email sent to ${user.email}`)
  } catch (error) {
    console.error("Error sending email:", error)
  }
}