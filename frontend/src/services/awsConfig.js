import AWS from 'aws-sdk';

AWS.config.update({
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env.REACT_APP_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY
  },
});

const s3Config = {
  bucket: 'turnstile-music',
  region: 'us-east-1'
};

export { AWS, s3Config };