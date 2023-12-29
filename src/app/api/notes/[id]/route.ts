import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { Notes } from "@prisma/client";
const prisma = new PrismaClient();

export const GET = async (request: Request, {params}: {params: {id: string}}) =>{
    const note = await prisma.notes.findUnique({
        where:{
            id: Number(params.id)
        }
    });
    return NextResponse.json(note, {status: 200});
}

export const DELETE = async (req: Request, {params}: {params: {id: string}}) => {
  if (!params || !params.id) {
    return NextResponse.json({ error: 'Missing id parameter' }, {status: 400});
  }

  const note = await prisma.notes.delete({
    where: {
      id: Number(params.id)
    }
  });

  return NextResponse.json(note, {status: 200});
}

export const PATCH = async (req: Request, {params}: {params: {id: string}}) => {
  if (!params || !params.id) {
    return NextResponse.json({ error: 'Missing id parameter' }, {status: 400});
  }

  const body = await req.json();

  const updatedNote = await prisma.notes.update({
    where: {
      id: Number(params.id)
    },
    data: {
      title: body.title,
      body: body.body,
    },
  });

  return NextResponse.json(updatedNote, {status: 200});
}