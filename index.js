require("dotenv").config();
// Import required AWS SDK clients and commands for Node.js
const { S3Client, ListObjectsV2Command } = require("@aws-sdk/client-s3");

// Set the AWS Region.
const REGION = process.env.AWS_REGION; //e.g. "us-east-1"

// Create an Amazon S3 service client object.
const s3Client = new S3Client({ region: REGION });

const listObjects = async () => {
  const bucketParams = {
    Bucket: process.env.AWS_BUCKET,
  };

  try {
    const data = await s3Client.send(new ListObjectsV2Command(bucketParams));
    console.log("Objects in the bucket:");
    data.Contents.forEach((obj) => {
      console.log(obj.Key);
    });
  } catch (err) {
    console.error("Error", err);
  }
};

listObjects();
