import "dotenv/config";
import fs from "fs";
import path from "path";
import { put } from "@vercel/blob";

// 🔴 HARD CHECK — fail fast if token is missing
if (!process.env.BLOB_READ_WRITE_TOKEN) {
  console.error("❌ BLOB_READ_WRITE_TOKEN is missing from environment");
  process.exit(1);
}

const PROJECTS_DIR = path.join(process.cwd(), "public/projects");

async function uploadFile(localPath: string, blobPath: string) {
  const fileBuffer = await fs.promises.readFile(localPath);

  const blob = await put(blobPath, fileBuffer, {
    access: "public",
    // ✅ EXPLICIT TOKEN — THIS IS THE FIX
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });

  console.log(`✅ Uploaded: ${blobPath}`);
  console.log(`🔗 URL: ${blob.url}\n`);
}

async function walk(dir: string, baseDir: string) {
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      await walk(fullPath, baseDir);
    } else {
      const relativePath = path
        .relative(baseDir, fullPath)
        .replace(/\\/g, "/");

      const blobPath = `projects/${relativePath}`;
      await uploadFile(fullPath, blobPath);
    }
  }
}

async function migrate() {
  if (!fs.existsSync(PROJECTS_DIR)) {
    console.error("❌ public/projects not found");
    process.exit(1);
  }

  console.log("🚀 Starting migration...\n");
  await walk(PROJECTS_DIR, PROJECTS_DIR);
  console.log("🎉 Migration complete");
}

migrate().catch((err) => {
  console.error("❌ Migration failed", err);
  process.exit(1);
});
