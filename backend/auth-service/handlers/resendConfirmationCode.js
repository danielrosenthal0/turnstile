'use strict';

const { CognitoUser, CognitoUserPool } = require("amazon-cognito-identity-js");
const dotenv = require('dotenv');

dotenv.config();

const USER_POOL_ID = process.env.USER_POOL_ID;
const CLIENT_ID = process.env.CLIENT_ID;

const poolData = {
  UserPoolId: USER_POOL_ID,
  ClientId: CLIENT_ID,
};

const userPool = new CognitoUserPool(poolData);

async function handler(event, context) {
   // const allowedOrigins = ['https://turnstilemusic.vercel.app', 'http://localhost:3000'];
  const allowedOrigins = [
    /^https:\/\/turnstile*\.vercel\.app$/,
    "http://localhost:3000",
  ];
  const origin = event.headers.origin;
  // if (!allowedOrigins.includes(origin)) {
  //   return {
  //     statusCode: 403,
  //     body: 'Forbidden',
  //   };
  // }

  if (
    !allowedOrigins.some((o) =>
      o instanceof RegExp ? o.test(origin) : o === origin
    )
  ) {
    return {
      statusCode: 403,
      body: "Forbidden",
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
        'Access-Control-Allow-Methods': 'POST,OPTIONS',
      },
    };
  };
  try {
    const { username } = JSON.parse(event.body);
    const result = await new Promise((resolve, reject) => {
      const cognitoUser = new CognitoUser({
        Username: username,
        Pool: userPool
      });

      cognitoUser.resendConfirmationCode((error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(result),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message,
      }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Credentials': true,
      }
    }
  }
}

module.exports = { handler };