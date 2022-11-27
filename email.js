const { BlobServiceClient } = require("@azure/storage-blob");
require('dotenv').config()
const fs = require('fs');

const connectionString = process.env.BLOB_STORAGE_CONNECTION_STRING;
const { Readable } = require("stream");
const nodemailer = require("nodemailer");

async function sendEmail(email, subject, html) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER,
      pass: process.env.PASSWORD,
    },
  });

  var mailOptions = {
    from: process.env.USER,
    to: email,
    subject,
    html,
  };

  let res = await transporter.sendMail(mailOptions);
  console.log(JSON.stringify(res));
}

async function streamToBuffer(readableStream) {
    return new Promise((resolve, reject) => {
        const chunks = [];
        readableStream.on('data', (data) => {
            chunks.push(data instanceof Buffer ? data : Buffer.from(data));
        });
        readableStream.on('end', () => {
            resolve(Buffer.concat(chunks));
        });
        readableStream.on('error', reject);
    });
}

async function getSubscribers() {
    const blobServiceClient =
  BlobServiceClient.fromConnectionString(connectionString);

const containerClient = await blobServiceClient.getContainerClient(
  "subscribers"
);
const blobClient = await containerClient.getBlockBlobClient("subscribers.csv");
const downloaded = await streamToBuffer(
  (
    await blobClient.download()
  ).readableStreamBody
);

const emails = downloaded.toString();

 return emails.split('\n');
}

function getHTML() {
    const data = fs.readFileSync('./email.html', 'utf8');
    return data;
}

getSubscribers().then(subscribers => {
    const html = getHTML();
    const subject = 'A New Article: "Strongly Typed ngTemplateOutlet"';

    for(const subscriber of subscribers) {
        sendEmail(subscriber, subject, html);
    }
})
