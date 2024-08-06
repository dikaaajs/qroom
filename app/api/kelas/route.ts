import Kelas from "@/models/kelas";
import { NextResponse } from "next/server";
import { ObjectId } from "mongoose";
import Account from "@/models/account";

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
    console.log(teachersRef[0]);
    const updateUser = await Account.findById(teachersRef[0]);
    let tmp = updateUser.classId;
    tmp.push(res._id);
    updateUser.classId = tmp;
    await updateUser.save();
    console.log(res);
    return NextResponse.json(res, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { msg: "Gagal membuat kelas!", err: error },
      { status: 500 }
    );
  }
}
