'use strict';

const { CognitoUser, AuthenticationDetails, CognitoUserPool } = require('amazon-cognito-identity-js');
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
    const {username, password} = JSON.parse(event.body);

    const result = await new Promise((resolve, reject) => {
      const authenticationDetails = new AuthenticationDetails({
        Username: username,
        Password: password,
      });
      // console.log(authenticationDetails);
  
      const cognitoUser = new CognitoUser({
        Username: username,
        Pool: userPool,
      });
      // console.log(cognitoUser);

      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          cognitoUser.getUserAttributes((err, attributes) => {
            if (err) {
              // Handle error
            } else {
              const email = attributes.find(attr => attr.Name === 'email').Value;
              const userType = attributes.find(attr => attr.Name === 'custom:UserType').Value;
              resolve({ username, email, userType, tokens: result });
            }
          });
        },
        onFailure: (error) => {
          reject(error)
        }
      });
    });
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({ user: result }),
    }
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