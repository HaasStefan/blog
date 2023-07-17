const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "angularjournal@gmail.com",
    pass: "hnirwsufneemmjbw",
  },
});

exports.handler = async (event, context) => {
  const { concern, name, email, company, subject, message, sentFromWebsite } =
    event.queryStringParameters;

  console.log(`new contact request: ${JSON.stringify(event.queryStringParameters)}`);

  if (!sentFromWebsite) {
    return {
      statusCode: 403,
    };
  }
  
  try {
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: "stefan.haas.privat@gmail.com",
      subject: `Angular Journal - ${subject}`,
      text: `Concern: ${concern}\nName: ${name}\nEmail: ${email}\nCompany: ${company}\nMessage: ${message}\nSubject: ${subject}`,
      html: `<p>Concern: ${concern}</p><p>Name: ${name}</p><p>Email: ${email}</p><p>Company: ${company}</p><p>Message: ${message}</p><p>Subject: ${subject}</p>`,
    });
    return {
      statusCode: 200,
    };
  } catch (e) {
    console.error("Internal error", e);
    return {
      statusCode: 500,
    };
  }
};
