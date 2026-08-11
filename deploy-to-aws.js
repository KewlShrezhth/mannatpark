import { 
  S3Client, 
  CreateBucketCommand, 
  PutPublicAccessBlockCommand,
  PutBucketWebsiteCommand, 
  PutBucketPolicyCommand, 
  PutObjectCommand 
} from '@aws-sdk/client-s3';
import fs from 'fs';
import path from 'path';

// Helper to load .env.local or aws_deployment_keys.txt into process.env if present
function loadEnvFile(fileName) {
  if (fs.existsSync(fileName)) {
    const content = fs.readFileSync(fileName, 'utf-8');
    content.split(/\r?\n/).forEach(line => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#') && !trimmed.startsWith('=') && !trimmed.startsWith('-')) {
        const parts = trimmed.split('=');
        if (parts.length >= 2) {
          const key = parts[0].trim();
          const val = parts.slice(1).join('=').trim().replace(/^["']|["']$/g, '');
          if (key && val && !process.env[key]) {
            process.env[key] = val;
          }
        }
      }
    });
  }
}

loadEnvFile('.env.local');
loadEnvFile('.env');
loadEnvFile('aws_deployment_keys.txt');

const region = process.env.AWS_REGION || process.env.AWS_DEFAULT_REGION || 'us-east-1';
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

console.log("=== AWS Zero-Cost Deployment Script ===");

if (!accessKeyId || !secretAccessKey || accessKeyId.includes('YOUR_') || secretAccessKey.includes('YOUR_')) {
  console.log("\n❌ AWS Credentials Not Configured!");
  console.log("\nTo deploy to AWS S3 for 100% FREE, edit `.env.local` or `aws_deployment_keys.txt` with your AWS keys:");
  console.log("  AWS_ACCESS_KEY_ID=AKIAxxxxxxxxxxxxxx");
  console.log("  AWS_SECRET_ACCESS_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
  console.log("  AWS_REGION=us-east-1");
  console.log("\nThen run:");
  console.log("  node deploy-to-aws.js\n");
  process.exit(1);
}

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

const bucketName = `the-mannat-park-web-${Date.now()}`;

function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.html': return 'text/html';
    case '.css': return 'text/css';
    case '.js': return 'application/javascript';
    case '.json': return 'application/json';
    case '.png': return 'image/png';
    case '.jpg':
    case '.jpeg': return 'image/jpeg';
    case '.svg': return 'image/svg+xml';
    case '.webp': return 'image/webp';
    case '.ico': return 'image/x-icon';
    default: return 'application/octet-stream';
  }
}

async function uploadDirectory(dirPath, bucketPath = '') {
  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    const s3Path = bucketPath ? `${bucketPath}/${file}` : file;

    if (fs.statSync(fullPath).isDirectory()) {
      await uploadDirectory(fullPath, s3Path);
    } else {
      const fileBuffer = fs.readFileSync(fullPath);
      const contentType = getMimeType(fullPath);
      console.log(`Uploading ${s3Path} (${contentType})...`);
      
      await s3Client.send(
        new PutObjectCommand({
          Bucket: bucketName,
          Key: s3Path,
          Body: fileBuffer,
          ContentType: contentType,
        })
      );
    }
  }
}

async function deploy() {
  try {
    console.log(`\n1. Creating S3 Bucket '${bucketName}' in ${region}...`);
    await s3Client.send(
      new CreateBucketCommand({
        Bucket: bucketName,
      })
    );

    console.log("2. Removing Public Access Block...");
    await s3Client.send(
      new PutPublicAccessBlockCommand({
        Bucket: bucketName,
        PublicAccessBlockConfiguration: {
          BlockPublicAcls: false,
          IgnorePublicAcls: false,
          BlockPublicPolicy: false,
          RestrictPublicBuckets: false,
        },
      })
    );

    console.log("3. Setting Public Read Bucket Policy...");
    const policy = {
      Version: "2012-10-17",
      Statement: [
        {
          Sid: "PublicReadGetObject",
          Effect: "Allow",
          Principal: "*",
          Action: "s3:GetObject",
          Resource: `arn:aws:s3:::${bucketName}/*`,
        },
      ],
    };

    await s3Client.send(
      new PutBucketPolicyCommand({
        Bucket: bucketName,
        Policy: JSON.stringify(policy),
      })
    );

    console.log("4. Enabling Static Website Hosting...");
    await s3Client.send(
      new PutBucketWebsiteCommand({
        Bucket: bucketName,
        WebsiteConfiguration: {
          IndexDocument: { Suffix: 'index.html' },
          ErrorDocument: { Key: 'index.html' },
        },
      })
    );

    console.log("5. Uploading built website assets from ./dist...");
    await uploadDirectory('./dist');

    const websiteUrl = `http://${bucketName}.s3-website-${region}.amazonaws.com`;
    console.log("\n=======================================================");
    console.log("✅ AWS S3 DEPLOYMENT COMPLETE!");
    console.log(`👉 Live Website URL: ${websiteUrl}`);
    console.log("=======================================================\n");
  } catch (err) {
    console.error("❌ Deployment failed:", err.message);
    process.exit(1);
  }
}

deploy();
