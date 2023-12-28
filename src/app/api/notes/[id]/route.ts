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

export const DELETE = async ({params}: {params: {id: string}}) => {
    const note = await prisma.notes.delete({
      where: {
        id: Number(params.id)
      }
    });
  
    return NextResponse.json(note, {status: 200});
  }