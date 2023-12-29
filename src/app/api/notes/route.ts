import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import  Request  from "next";
import { NextApiRequest } from "next";

const prisma = new PrismaClient();

export const POST = async (req: Request) => {
  const body = await req.json();
  const result = await prisma.notes.create({
    data: {
      title: body.title,
      body: body.body,
      createdAt : body.createdAt,
    },
  });
  return NextResponse.json(result, { status: 201 });
}

export const GET = async (req: Request) => {
  const notes = await prisma.notes.findMany();
  return NextResponse.json(notes, { status: 200 });
}

