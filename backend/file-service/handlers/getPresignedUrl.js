const AWS = require('aws-sdk');
const { AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY } = process.env;
AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: 'us-east-1',
});
const s3 = new AWS.S3();

module.exports.handler = async (event) => {
  const { name, type } = event.queryStringParameters;
  const stage = process.env.stage; 
  const bucketName = stage === "prod" ? "turnstile-music" : "turnstile-music-dev";
  const params = {
    Bucket: bucketName,
    Key: name,
    Expires: 60, // The URL will expire after 1 minute
    ContentType: type,
    ACL: 'public-read',
  };

  try {
    const url = await s3.getSignedUrlPromise('putObject', params);
    return {
      statusCode: 200,
      body: JSON.stringify({ url }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};