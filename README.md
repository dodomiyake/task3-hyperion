# Deploying a React Application to S3 Using LocalStack

This guide demonstrates how to deploy a React application (or any static website) to a locally emulated Amazon S3 bucket using LocalStack. LocalStack allows you to test AWS services locally without incurring cloud costs.

## Prerequisites

- **Docker**: LocalStack runs inside a Docker container. Follow the [official Docker documentation](https://docs.docker.com/get-docker/) to install Docker on your system.
- **Node.js and npm**: Required for building the React project.

## Step 1: Building a React Project

1. In your React project's root directory, run:
   ```bash
   npm run build
   ```

2. Create a deployment folder:
   ```bash
   mkdir my-site
   cp -r dist/ my-site/
   ```

## Step 2: Configure Access Policies

Inside `my-site/`, create a file named `policy.json` with the following contents:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": ["s3:GetObject"],
      "Resource": ["arn:aws:s3:::my-site/*"]
    }
  ]
}
```

## Step 3: Set Up Docker Compose

In the root of your project, create a file named `docker-compose.yml`:

```yaml
version: "3.8"
services:
  localstack:
    container_name: stacky
    image: localstack/localstack
    ports:
      - "127.0.0.1:4566:4566"
      - "127.0.0.1:4510-4559:4510-4559"
    volumes:
      - ./my-site:/opt/code/localstack/my-site
```

## Step 4: Launch LocalStack

From your project's root directory:

```bash
docker compose up -d
```

Verify with:
```bash
docker ps
```

## Step 5: Create and Configure S3 Bucket

Enter the container:
```bash
docker exec -it stacky bash
```

Navigate to your mapped folder:
```bash
cd my-site
```

Create the S3 bucket:
```bash
awslocal s3api create-bucket --bucket my-site
```

Verify bucket creation:
```bash
awslocal s3api list-buckets
```

## Step 6: Configure Website Hosting

Configure the bucket for static website hosting:
```bash
awslocal s3 website s3://my-site --index-document index.html
```

## Step 7: Upload Files

From the `my-site/` directory:
```bash
awslocal s3 sync dist s3://my-site
```

## Step 8: Apply Public Access Policy

Apply the public-read policy:
```bash
awslocal s3api put-bucket-policy --bucket my-site --policy file://policy.json
```

## Step 9: Access Your Website

Your website should now be accessible at:
```
http://my-site.s3.localhost.localstack.cloud:4566/index.html
```

## Step 10: Clean Up

Exit the container:
```bash
exit
```

Shut down LocalStack:
```bash
docker compose down
```

## Troubleshooting

- If you can't access the website, check if LocalStack is running properly with `docker ps`
- Ensure port 4566 is not being used by other applications
- Verify the bucket policy was applied correctly

## Additional Resources

- [LocalStack Documentation](https://docs.localstack.cloud/overview/)
- [AWS CLI S3 Commands](https://docs.aws.amazon.com/cli/latest/reference/s3/index.html)
