import { CognitoUserPool, CognitoUser,  } from "amazon-cognito-identity-js";
import { cognitoConfig } from "./cognitoConfig";

const userPool = new CognitoUserPool({
  UserPoolId: cognitoConfig.UserPoolId,
  ClientId: cognitoConfig.ClientId,
});

export function forgotPassword(username) {
  // Forgot password implementation
  return new Promise((resolve, reject) => {
    const cognitoUser = new CognitoUser({
      Username: username,
      Pool: userPool,
    })

    cognitoUser.forgotPassword({
      onSuccess: () => {
        resolve()
      },
      onFailure: (error) => {
        reject(error)
      },
    })
  })
}

export function confirmPassword(username, code, newPassword) {
  // Confirm password implementation
  return new Promise((resolve, reject) => {
    const cognitoUser = new CognitoUser({
      Username: username,
      Pool: userPool,
    })

    cognitoUser.confirmPassword(code, newPassword, {
      onSuccess: () => {
        resolve()
      },
      onFailure: (error) => {
        reject(error)
      },
    })
  })
}

export function signOut() {
  // Sign out implementation
  const cognitoUser = userPool.getCurrentUser();
  if (cognitoUser ) {
    cognitoUser.signOut();
  }
}

export function getCurrentUser() {
  // Get current user implementation
  return new Promise((resolve, reject) => {
    const userFromStorage = localStorage.getItem("user");
    if (userFromStorage) {
      resolve(JSON.parse(userFromStorage));
      return;
    }

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

        localStorage.setItem("user", JSON.stringify(userData));
        resolve({...userData, username: cognitoUser.username});
      })
    })
  })
}

export function getSession() {
  // Get session implementation
  const cognitoUser = userPool.getCurrentUser();
  return new Promise((resolve, reject) => {
    if (!cognitoUser) {
      reject(new Error("No user found"));
      return;
    }
    cognitoUser.getSession((error, session) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(session);
    })
  })
}