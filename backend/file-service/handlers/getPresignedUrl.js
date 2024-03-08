const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const { AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY } = process.env;
const stage = process.env.stage;
const tableName = `${stage}-search`;

AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: 'us-east-1',
});
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

    //write to s3
    const dynamoDbParams = {
      TableName: tableName,
      Item: {
        id: name,
        type: 'audio',
        filename: name,
        contentType: type,
      },
    };

    await dynamoDb.put(dynamoDbParams).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ url }),
      headers: {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Credentials": true,
      },
    };
  } catch (error) {
    console.error('Error generating pre-signed URL:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
      headers: {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Credentials": true,
      },
    };
  }
};