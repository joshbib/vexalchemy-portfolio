import "server-only";
import { S3Client } from "@aws-sdk/client-s3";

export type R2Env = {
  accountId: string;
  accessKeyId: string;
  secretAccessKey: string;
  bucket: string;
};

export function validateR2Env(): R2Env {
  const missing: string[] = [];
  const accountId = process.env.R2_ACCOUNT_ID;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
  const bucket = process.env.R2_BUCKET_NAME;

  if (!accountId) missing.push("R2_ACCOUNT_ID");
  if (!accessKeyId) missing.push("R2_ACCESS_KEY_ID");
  if (!secretAccessKey) missing.push("R2_SECRET_ACCESS_KEY");
  if (!bucket) missing.push("R2_BUCKET_NAME");

  if (missing.length) {
    throw new Error(
      `Missing R2 environment variables: ${missing.join(", ")}`
    );
  }

  return { accountId, accessKeyId, secretAccessKey, bucket };
}

let client: S3Client | null = null;
let cachedEnv: R2Env | null = null;

export function getR2Client() {
  if (client && cachedEnv) return { client, env: cachedEnv };

  const env = validateR2Env();
  client = new S3Client({
    region: "auto",
    endpoint: `https://${env.accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: env.accessKeyId,
      secretAccessKey: env.secretAccessKey,
    },
    forcePathStyle: true,
  });
  cachedEnv = env;
  return { client, env };
}

export function toPublicUrl(key: string, envOverride?: R2Env) {
  const { env } = envOverride
    ? { env: envOverride }
    : getR2Client();
  return `https://${env.bucket}.${env.accountId}.r2.cloudflarestorage.com/${key}`;
}
