'use strict';

const { REGION, USER_POOL_ID, CLIENT_ID } = require('./cognitoEnv');
const { CognitoUserPool, CognitoUserAttribute } = require('amazon-cognito-identity-js');
const dotenv = require('dotenv');

dotenv.config();

const poolData = {
  UserPoolId: USER_POOL_ID,
  ClientId: CLIENT_ID,
};

const userPool = new CognitoUserPool(poolData);


async function signUp(event, context) {
  const { username, email, password, userType } = JSON.parse(event.body);

  return new Promise((resolve, reject) => {
    userPool.signUp(
      username,
      password,
      [
        new CognitoUserAttribute({ Name: 'email', Value: email }),
        new CognitoUserAttribute({ Name: 'custom:UserType', Value: userType }),
      ],
      [],
      (err, result) => {
        if (err) {
          return reject(err);
        }

        resolve({
          statusCode: 200,
          body: JSON.stringify({
            user: result,
          }),
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
          },
        });
      }
    );
  });
};

exports.handler = signUp;