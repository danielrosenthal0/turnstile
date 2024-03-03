const AWS = require("aws-sdk");
const { AWS_ACCESS_KEY, AWS_SECRET_KEY } = process.env;
AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_KEY,
  region: 'us-east-1',
});
const s3 = new AWS.S3();

module.exports.handler = async (event) => {
  const allowedOrigins = [
    "https://turnstilemusic.vercel.app",
    "http://localhost:3000",
  ];
  const origin = event.headers.origin;
  if (!allowedOrigins.includes(origin)) {
    return {
      statusCode: 403,
      body: "Forbidden",
    };
  }

  // Handle OPTIONS request
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Headers":
        "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent,X-Amzn-Trace-Id",
        "Access-Control-Allow-Methods": "POST,OPTIONS",
      },
    };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch (error) {
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ error: "Invalid JSON in request body" }),
    };
  }

  const { username, fileName, fileContent } = body;

  const stage = process.env.stage;
  const bucketName =
    stage === "prod" ? "turnstile-music" : "turnstile-music-dev";

  const params = {
    Bucket: bucketName,
    Key: `${username}_${fileName}`,
    Body: Buffer.from(fileContent, "base64"),
    ACL: "public-read",
    ContentType: "audio/mpeg",
  };

  try {
    await s3.upload(params).promise();
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ message: "File uploaded successfully" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Credentials": true,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        error: {
          message: error.message,
          code: error.code,
          awsError: error,
        },
      }),
    };
  }
};
