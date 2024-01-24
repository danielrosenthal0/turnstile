'use strict'

const AWS = require('aws-sdk');

const s3 = new AWS.S3();

module.exports.handler = async (event, context, callback) => {
  try {
    const s3Event = event.Records[0].s3;
    const { bucket, object} = s3Event;

    const params = {
      Bucket: bucket.name,
      Key: object.key,
    };
    const { Body } = await s3.getObject(params).promise();

    console.log('File content', Body.toString());

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'File processed successfully'}),
    };
  } catch (error) {
    console.error('Error processing file:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error'}),
    };
  }
};
