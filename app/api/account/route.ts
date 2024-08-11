import connectMongoDB from "@/libs/database/mongodb";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { check } from "@/utils/registerDataChecker";
import Account from "@/models/account";
import Kelas from "@/models/kelas";
connectMongoDB();

export async function POST(req: NextRequest) {
  let { name, password, email, image, role, username } = await req.json();
  let err: { name: string; msg: string }[] = [];
  try {
    const checkResult = await check({ name, password, email, username }, err);
    if (checkResult[0]) {
      throw new Error("kesalahan data");
    }
    let teachersId;
    let studentsId;
    const passwordHash = await bcrypt.hash(password, 10);
    await Account.create({
      name,
      password: passwordHash,
      email,
      image,
      role,
      username,
      teachersId,
      studentsId,
    });
    return NextResponse.json(
      { msg: "berhasil membuat account" },
      { status: 201 }
    );
  } catch (error: any) {
    console.log(error.message);
    if (error.message === "kesalahan data") {
      return NextResponse.json({ err }, { status: 500 });
    }
    return NextResponse.json(error, { status: 500 });
  }
}

export async function GET(req: any) {
  const id = req.nextUrl.searchParams.get("v");
  const email = req.nextUrl.searchParams.get("e");
  const username = req.nextUrl.searchParams.get("n");
  try {
    if (id) {
      const res = await Account.findById(id).select("-password");
      return NextResponse.json(res, { status: 200 });
    } else if (email) {
      const res = await Account.findOne({ email }).select("-password");
      return NextResponse.json(res, { status: 200 });
    } else if (username) {
      let res = await Account.findOne({ username }).select("-password");
      const kelas = await Kelas.find({ _id: { $in: res.classId } });
      return NextResponse.json({ ...res._doc, kelas }, { status: 200 });
    } else {
      const res = await Account.find().select("-password");
      return NextResponse.json(res, { status: 200 });
    }
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json(
      { msg: "gagal mengambil data account", err: error },
      { status: 500 }
    );
  }
}

export async function PATCH(req: any) {
  const id = req.nextUrl.searchParams.get("v");
  const { name, username, email, password, image, role, classId } =
    await req.json();

  try {
    const account = await Account.findById(id);
    if (name !== undefined) account.name = name;
    if (username !== undefined) account.username = username;
    if (email !== undefined) account.email = email;
    if (password !== undefined) account.password = password;
    if (image !== undefined) account.image = image;
    if (role !== undefined) account.role = role;
    if (classId !== undefined) account.classId = classId;

    await account.save();
    return NextResponse.json(
      { msg: "berhasil update data Account" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { msg: "gagal update data Account", err: error },
      { status: 500 }
    );
  }
}

export async function DELETE(req: any) {
  const id = req.nextUrl.searchParams.get("v");

  try {
    const res = await Account.findByIdAndDelete(id);
    return NextResponse.json(
      { msg: "berhasil menghapus data account" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { msg: "gagal menghapus data account", err: error },
      { status: 500 }
    );
  }
}
