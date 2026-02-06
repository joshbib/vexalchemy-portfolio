// app/api/upload/route.ts
import { NextResponse, NextRequest } from "next/server";
import { z } from "zod";

type RateBucket = { count: number; windowStart: number };
const RATE_LIMIT = 30;
const WINDOW_MS = 60_000;
const buckets = globalThis as unknown as { __uploadBuckets?: Map<string, RateBucket> };
const store = buckets.__uploadBuckets ?? (buckets.__uploadBuckets = new Map());

const payloadSchema = z.object({}).passthrough();

function getIp(req: NextRequest) {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.ip ||
    "unknown"
  );
}

function rateLimit(ip: string) {
  const now = Date.now();
  const bucket = store.get(ip);
  if (!bucket || now - bucket.windowStart > WINDOW_MS) {
    store.set(ip, { count: 1, windowStart: now });
    return true;
  }
  if (bucket.count >= RATE_LIMIT) return false;
  bucket.count += 1;
  return true;
}

async function validateBody(req: NextRequest) {
  if (req.method === "GET") return {};
  if (!req.headers.get("content-type")?.includes("application/json")) {
    return { error: "Invalid content type" };
  }
  const json = await req.json().catch(() => undefined);
  if (!json || typeof json !== "object") return { error: "Invalid JSON body" };
  const parsed = payloadSchema.safeParse(json);
  if (!parsed.success) return { error: "Invalid payload" };
  return { data: parsed.data };
}

export async function GET(req: NextRequest) {
  const ip = getIp(req);
  if (!rateLimit(ip)) {
    return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
  }
  return NextResponse.json({ ok: true });
}

export async function POST(req: NextRequest) {
  const ip = getIp(req);
  if (!rateLimit(ip)) {
    return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
  }
  const { error } = await validateBody(req);
  if (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
  return NextResponse.json({ success: true });
}

export async function PUT() {
  return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
}

export async function DELETE() {
  return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
}
