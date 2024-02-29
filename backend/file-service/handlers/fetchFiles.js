const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1', accessKeyId: process.env.AWS_ACCESS_KEY, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY });
const s3 = new AWS.S3();

module.exports.handler = async (event) => {
  const allowedOrigins = ['https://turnstilemusic.vercel.app', 'http://localhost:3000'];
  const origin = event.headers.origin;
  if (!allowedOrigins.includes(origin)) {
    return {
      statusCode: 403,
      body: 'Forbidden',
    };
  }

  // Handle OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent,X-Amzn-Trace-Id',
        'Access-Control-Allow-Methods': 'GET,OPTIONS',
      },
    };
  };

  const { username } = event.queryStringParameters;

  const stage = process.env.stage;
  const bucketName = stage === 'prod' ? 'turnstile-music' : 'turnstile-music-dev';

  const params = {
    Bucket: bucketName,
    Prefix: `${username}_`,
  };

  try {
    const data = await s3.listObjectsV2(params).promise();
    const files = data.Contents.map(item => item.Key);
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({ files }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Credentials': true,
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