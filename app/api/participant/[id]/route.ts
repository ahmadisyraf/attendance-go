import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const { classcode } = await request.json();

  if (!id) {
    return NextResponse.json("User id required", { status: 401 });
  }

  if (!classcode) {
    return NextResponse.json("Classroom id required", { status: 401 });
  }

  try {
    const getParticipant = await prisma.participant.findFirst({
      where: {
        classroom: {
          classcode: classcode,
        },
      },
    });

    if (getParticipant) {
      return NextResponse.json("Already join the class", { status: 404 });
    }

    const getClass = await prisma.classroom.findFirst({
      where: {
        classcode: classcode,
      },
    });

    const classid = getClass?.id;

    const postParticpant = await prisma.participant.create({
      data: {
        classroom: {
          connect: {
            id: classid,
          },
        },
        user: {
          connect: {
            id: id,
          },
        },
      },
    });

    return NextResponse.json(postParticpant, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  if (!id) {
    return NextResponse.json("User id required", { status: 401 });
  }

  try {
    const getClassrooms = await prisma.participant.findMany({
      where: {
        userId: id,
      },
      include: {
        classroom: true,
      },
    });

    return NextResponse.json(getClassrooms, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}