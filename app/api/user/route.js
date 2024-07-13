import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { randomBytes } from "crypto";
import { cookies } from "next/headers";

function generateSecureUUID() {
  return randomBytes(16).toString("hex");
}

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
  if (!cookie_uuid) {
    if (!bodyData.phoneNumber) {
      return NextResponse.json({ authenticated: false });
    }
    const uuid = await generateSecureUUID();
    cookieStore.set("uuid", uuid, {
      maxAge: 60 * 60 * 60 * 60,
      secure: true,
      httpOnly: true,
    });
    cookie_uuid = uuid;
    await prisma.user.create({
      data: {
        id: cookie_uuid,
        name: bodyData.name,
        mobile: bodyData.phoneNumber,
        entries: 0,
        one : false,
        two : false,
        three : false,
      },
    });
    return NextResponse.json({ authenticated: true, entriesapi: 0, nameapi: bodyData.name, one: false, two: false, three: false });
  } else {
    const user = await prisma.user.findUnique({
      where: { id: cookie_uuid },
    });
    return NextResponse.json({ authenticated: true, entriesapi: user.entries, nameapi: user.name,one: user.one, two: user.two, three: user.three });
  }
}
