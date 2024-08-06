import Kelas from "@/models/kelas";
import { NextResponse } from "next/server";
import { ObjectId } from "mongoose";

export async function GET(req: any) {
  const classId = req.nextUrl.searchParams.get("c") as string;
  try {
    const res = await Kelas.findById(classId);
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { msg: "Gagal memuat kelas!", err: error },
      { status: 500 }
    );
  }
}

export async function POST(req: any) {
  const { label, teachersRef, studentsRef, quizRef } = await req.json();
  if (!label || !teachersRef) {
    return NextResponse.json(
      { msg: "Label atau teacher tidak boleh kosong!" },
      { status: 400 }
    );
  }
  try {
    const res = await Kelas.create({
      label,
      teachersRef,
      studentsRef,
      quizRef,
    });
    console.log(res);
    return NextResponse.json(res, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { msg: "Gagal membuat kelas!", err: error },
      { status: 500 }
    );
  }
}
