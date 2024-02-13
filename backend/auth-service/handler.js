'use strict';
const { CognitoUserPool, CognitoUserAttribute } = require('amazon-cognito-identity-js');
const dotenv = require('dotenv');

dotenv.config();

const poolData = {
  UserPoolId: process.env.USER_POOL_ID,
  ClientId: process.env.CLIENT_ID,
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

        resolve(result);
      }
    );
  });
};

exports.handler = signUp;