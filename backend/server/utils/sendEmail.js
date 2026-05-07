import nodemailer from "nodemailer";

const sendEmail = async ({ to, subject, html }) => {
  if (
    !process.env.EMAIL_USER ||
    !process.env.EMAIL_PASS ||
    process.env.DISABLE_EMAIL === "true"
  ) {
    console.log("Email skipped: email service disabled or not configured");
    return null;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    port: Number(process.env.EMAIL_PORT) || 465,
    secure: Number(process.env.EMAIL_PORT) === 465,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    family: 4,
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 8000,
  });

  const info = await transporter.sendMail({
    from: `"RealEstatePro" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });

  console.log("Email sent:", info.response);
  return info;
};

export default sendEmail;