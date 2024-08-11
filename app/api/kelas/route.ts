import Kelas from "@/models/kelas";
import { NextResponse } from "next/server";
import { ObjectId } from "mongoose";
import Account from "@/models/account";
import Kuis from "@/models/kuis";
import Answer from "@/models/answer";

export async function GET(req: any) {
  const classId = req.nextUrl.searchParams.get("c") as string;
  try {
    const res = await Kelas.findById(classId);
    const quiz = await Kuis.find({ _id: { $in: res.quizRef } });
    const students = await Account.find({ _id: { $in: res.studentsRef } });
    let answer = [];
    for (const i of quiz) {
      const tmp = await Answer.find({ quizRef: i._id });
      answer.push(tmp);
    }
    return NextResponse.json(
      { ...res._doc, quiz, answer, students },
      { status: 200 }
    );
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
    const updateUser = await Account.findById(teachersRef[0]);
    let tmp = updateUser.classId;
    tmp.push(res._id);
    updateUser.classId = tmp;
    await updateUser.save();
    return NextResponse.json(res, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { msg: "Gagal membuat kelas!", err: error },
      { status: 500 }
    );
  }
}

export async function PATCH(req: any) {
  const id = req.nextUrl.searchParams.get("v");
  const { studentsRef, teachersRef, quizRef, label } = await req.json();

  try {
    const updateKelas = await Kelas.findById(id);
    if (studentsRef !== undefined) {
      const tmp = updateKelas.studentsRef;
      tmp.push(...studentsRef);
      updateKelas.studentsRef = tmp;
    } else if (teachersRef !== undefined) {
      const tmp = updateKelas.teachersRef;
      tmp.push(...teachersRef);
      updateKelas.teachersRef = tmp;
    } else if (quizRef !== undefined) {
      const tmp = updateKelas.quizRef;
      tmp.push(...quizRef);
      updateKelas.quizRef = tmp;
    }
    await updateKelas.save();
    return NextResponse.json(
      { msg: "berhasil update data kuis" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { msg: "gagal update data kuis", err: error },
      { status: 500 }
    );
  }
}
