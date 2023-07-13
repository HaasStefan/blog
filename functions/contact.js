const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "angularjournal@gmail.com",
    pass: "hnirwsufneemmjbw",
  },
});

exports.handler = async (event, context) => {
  const { concern, name, email, company, subject, message } =
    event.queryStringParameters;

  try {
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: "stefan.haas.privat@gmail.com",
      subject: `Angular Journal - ${subject}`,
      text: `Concern: ${concern}\nName: ${name}\nEmail: ${email}\nCompany: ${company}\nMessage: ${message}`,
      html: `<p>Concern: ${concern}</p><p>Name: ${name}</p><p>Email: ${email}</p><p>Company: ${company}</p><p>Message: ${message}</p>`,
    });
    return {
      statusCode: 200,
    };
  } catch {
    return {
      statusCode: 500,
    };
  }
};
