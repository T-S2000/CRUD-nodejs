# CRUD-nodejs

## Description

- AWS S3 bucket like Backend Application(beta).
- You can create,delete and list buckets.
- You can upload/update file, get file, delete file, list file based on bucket.
- Pinata and mongoDB is used in this project.
- This is a nodejs application. 

## Setup

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Create a `.env` file based on the provided template.
4. Run `npm start` to start the server.

### Buckets
- `POST /api/buckets`: Create a new bucket.
  - Request Body: `{ "name": "bucketName", "userId": "userId" }`
- `GET /api/buckets`: List all buckets for a user.
  - Query Param: `userId`
- `DELETE /api/buckets` : Deletes the specified bucket.
  - Query Param: `BucketId`

### Files
- `POST /api/files/:bucketId`: Upload a file to a bucket.
  - Form Data: `file`
  - Query Param: `BucketId`
- `GET /api/files/:fileId`: Retrieve a file from pinata.
  - Query Param: `fileId`
- `GET /api/files/bucket/:bucketId`: List all files in a bucket.
  - Query Param: `BucketId`
- `DELETE /api/files/:fileId`: Deletes file from the bucket.
  - Query Param: `fileId`
