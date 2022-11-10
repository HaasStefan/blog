const { BlobServiceClient } = require("@azure/storage-blob");
const connectionString = process.env.BLOB_STORAGE_CONNECTION_STRING;
const { Readable } = require("stream");

exports.handler = async (event, context) => {
  const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);

  const containerClient = await blobServiceClient.getContainerClient('subscribers');
  const blobClient = await containerClient.getBlockBlobClient('subscribers.csv');
  const downloaded = await streamToBuffer((await blobClient.download()).readableStreamBody);

  const emails = `${downloaded.toString()}${event.queryStringParameters.email}\r\n`;

  blobClient.uploadStream(Readable.from([emails]));

  return {
    statusCode: 200,
  };
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