'use strict';

const { CognitoUserPool, CognitoUserAttribute } = require('amazon-cognito-identity-js');
const dotenv = require('dotenv');

dotenv.config();

const USER_POOL_ID = process.env.USER_POOL_ID;
const CLIENT_ID = process.env.CLIENT_ID;

const poolData = {
  UserPoolId: USER_POOL_ID,
  ClientId: CLIENT_ID,
};

const userPool = new CognitoUserPool(poolData);

async function signUp(event, context) {
  // Handle OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // This is the important line
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent,X-Amzn-Trace-Id',
        'Access-Control-Allow-Methods': 'POST,OPTIONS',
      },
    };
  }

  console.log(event.body);
  try {
    const { username, email, password, userType } = JSON.parse(event.body);

    const attributes = [
      new CognitoUserAttribute({ Name: 'email', Value: email }),
      new CognitoUserAttribute({ Name: 'custom:UserType', Value: userType }),
    ];

    const result = await new Promise((resolve, reject) => {
      userPool.signUp(username, password, attributes, [], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // This is the important line
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        user: result,
      }),
      
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message,
      }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // This is the important line
        'Access-Control-Allow-Credentials': true,
      },
    };
  }
}

module.exports = {
  signUp,
};