import AWS from "aws-sdk";

export const s3 = new AWS.S3({
	accessKeyId: process.env.S3_ACCESS_KEY,
	secretAccessKey: process.env.S3_SECRET_KEY,
});

export const bucketName = process.env.S3_BUCKET_NAME;

export const params = {
	Bucket: bucketName,
};
