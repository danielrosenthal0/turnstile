const { CognitoUserPool } = require("amazon-cognito-identity-js");
const Joi = require("joi");

const middy = require("middy");
const { cors } = require("middy/middlewares");

const schema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  userType: Joi.string().valid("EmergingArtist", "VerifiedArtist").required(),
});

const validateRequest = (payload) => {
  const { error, value } = schema.validate(payload);
  if (error) {
    throw new Error(error.details[0].message);
  }
  return value;
};

const userPool = new CognitoUserPool({
  UserPoolId: process.env.USER_POOL_ID,
  ClientId: process.env.CLIENT_ID,
});

const SignUp = async (event) => {
  if (typeof event.body !== "string") {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing or invalid request body" }),
    };
  }

  try {
    const requestBody = JSON.parse(event.body);
    const validatedPayload = validateRequest(requestBody);
    // const { username, email, password, userType } = requestBody;

    await signUp(
      validatedPayload.username,
      validatedPayload.email,
      validatedPayload.password,
      validatedPayload.userType
    );
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Signup successful" }),
    };
  } catch (error) {
    console.error("Error:", error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

function signUp(username, email, password, userType) {
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
  });
}

const handler = middy(SignUp).use(cors());

module.exports = { handler };
