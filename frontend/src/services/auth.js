import { CognitoUserPool, CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import { cognitoConfig } from "./cognitoConfig";

const userPool = new CognitoUserPool({
  UserPoolId: cognitoConfig.UserPoolId,
  ClientId: cognitoConfig.ClientId,
});

export function signUp(username, email, password, userType) {
  // Sign up implementation
  return new Promise((resolve, reject) => {
    userPool.signUp(
      username,
      password,
      [
        { Name: "email", Value: email },
        { Name: "custom:UserType", Value: userType },
      ],
      null,
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(result.user);
      }
    );
  })
}

export function confirmSignUp(username, code) {
  // Confirm sign up implementation
  return new Promise((resolve, reject) => {
    const cognitoUser = new CognitoUser({
      Username: username,
      Pool: userPool,
    })

    cognitoUser.confirmRegistration(code, true, (error, result) => {
      if (error) {
        reject(error)
        return
      }
      resolve(result)
    })
  })
}

export function resendConfirmationCode(username) {
  return new Promise((resolve, reject) => {
    const cognitoUser = new CognitoUser({
      Username: username,
      Pool: userPool
    });

    cognitoUser.resendConfirmationCode((error, result) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(result);
    });
  })
}

export function signIn(username, password) {
  // Sign in implementation
  return new Promise ((resolve, reject) => {
    const authenticationDetails = new AuthenticationDetails({
      Username: username,
      Password: password,
    })

    const cognitoUser = new CognitoUser({
      Username: username,
      Pool: userPool,
    })

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        resolve(result);
      },
      onFailure: (error) => {
        reject(error)
      }
    })
  })
}

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