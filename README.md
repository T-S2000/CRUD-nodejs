# CRUD-nodejs

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