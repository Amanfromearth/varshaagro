import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { cookies } from "next/headers";

async function readRequestBody(req) {

  const reader = req.body.getReader();
  
  let chunks = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
  }
  const body = new TextDecoder().decode(Buffer.concat(chunks));
  return JSON.parse(body);
}

export async function POST(req) {

  let bodyData;
  try {
    bodyData = await readRequestBody(req);
  } catch (error) {
    console.error("Failed to parse request body:", error);
    return NextResponse.json({ error: "Invalid JSON format" });
  }

  let cookieStore = cookies(req.headers);

  let cookie_uuid = cookieStore.get("uuid")?.value;

  const updatedUser = await prisma.user.update({
    where: { id: cookie_uuid },
    data: {
      entries: { increment: 1 }
    }
  });
  
  if (bodyData.one) {
    await prisma.user.update({
      where: { id: cookie_uuid },
      data: { one: true }
    });
  }
  if (bodyData.two) {
    await prisma.user.update({
      where: { id: cookie_uuid },
      data: { two: true }
    });
  }
  if (bodyData.three) {
    await prisma.user.update({
      where: { id: cookie_uuid },
      data: { three: true }
    });
  }
  
  return NextResponse.json({ entriesapi: updatedUser.entries});
}
