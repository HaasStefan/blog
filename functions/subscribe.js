const { BlobServiceClient } = require("@azure/storage-blob");
const connectionString = process.env.BLOB_STORAGE_CONNECTION_STRING;
const { Readable } = require("stream");
const nodemailer = require("nodemailer");

exports.handler = async (event, context) => {
    try {
        const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);

        const containerClient = await blobServiceClient.getContainerClient('subscribers');
        const blobClient = await containerClient.getBlockBlobClient('subscribers.csv');
        const downloaded = await streamToBuffer((await blobClient.download()).readableStreamBody);
      
        if (!downloaded.toString().match(event.queryStringParameters.email)) {
            const emails = `${downloaded.toString()}${event.queryStringParameters.email}\r\n`;
            blobClient.uploadStream(Readable.from([emails]));
      
            sendWelcome(event.queryStringParameters.email);

            return {
              statusCode: 200,
            };
        }
      
        return {
          statusCode: 400
        };
    } catch {
        return {
            statusCode: 500
        };
    }
};


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

function sendWelcome(email) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.USER,
          pass: process.env.PASSWORD
        }
      });
      
      var mailOptions = {
        from: process.env.USER,
        to: email,
        subject: 'Thank you for subscribing to ng-journal!',
        html: '<h2>Thank you!</h2><p> You subscribed to get notifications when a new blog post is published on <a href="https://ng-journal.com">ng-journal.com</a></p><p> If you want to cancel your subscription, please send an email to stefan.haas.privat@gmail.com</p>'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}