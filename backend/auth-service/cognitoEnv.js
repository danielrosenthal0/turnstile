const dotenv = require('dotenv');

dotenv.config();

const REGION = process.env.REGION;
const USER_POOL_ID = process.env.USER_POOL_ID;
const CLIENT_ID = process.env.CLIENT_ID;

module.exports = { REGION, USER_POOL_ID, CLIENT_ID };