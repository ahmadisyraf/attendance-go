import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  if (!id) {
    return NextResponse.json("Classroom id required", { status: 401 });
  }
  try {
    const fetchClassrooms = await prisma.classroom.findFirst({
      where: {
        id,
      },
    });

    return NextResponse.json(fetchClassrooms, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
