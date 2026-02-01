import "server-only";
import { put, del } from "@vercel/blob";

export async function uploadToBlob(
  path: string,
  file: File
) {
  return await put(path, file, {
    access: "public",
  });
}

export async function deleteFromBlob(path: string) {
  return await del(path);
}
