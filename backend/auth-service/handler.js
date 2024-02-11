'use strict';
import { CognitoUserPool, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { REGION, USER_POOL_ID, CLIENT_ID } from './cognitoEnv';
import dotenv from 'dotenv';

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

        resolve(result);
      }
    );
  });
};

export const handler = signUp;
