'use strict';

const { CognitoUserPool } = require("amazon-cognito-identity-js");
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
  const allowedOrigins = ['https://dev.d5quvta5fj0rx.amplifyapp.com', 'https://prod.d5quvta5fj0rx.amplifyapp.com', 'http://localhost:3000'];
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
        'Access-Control-Allow-Methods': 'POST,OPTIONS',
      },
    };
  };

  try {
    const result = await new Promise((resolve, reject) => { 
      const cognitoUser = userPool.getCurrentUser();

      if (!cognitoUser) {
        reject(new Error("No user found"));
        return;
      }

      cognitoUser.getSession((error, session) => {
        if (error) {
          reject(error);
          return;
        }
        cognitoUser.getUserAttributes((error, attributes) => {
          if (error) {
            reject(error);
            return;
          }
          const userData = attributes.reduce((account, attribute) => {
            account[attribute.Name] = attribute.Value;
            return account;
          }, {});

          resolve({...userData, username: cognitoUser.username});
        })
      })
    });
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(result),
    }
  } catch (error) {
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
  };
};

module.exports = { handler };