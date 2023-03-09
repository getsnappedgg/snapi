const AWS = require("aws-sdk");

const s3 = new AWS.S3({
	accessKeyId: process.env.S3_ACCESS_KEY,
	secretAccessKey: process.env.S3_SECRET_KEY,
});

const bucketName = process.env.S3_BUCKET_NAME;

const params = {
	Bucket: bucketName,
};
module.exports = s3;
