import { storage } from "@/libs/database/firebase";
import connectMongoDB from "@/libs/database/mongodb";
import generateRandomString from "@/libs/generateRandomStr";
import Kuis from "@/models/kuis";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { NextResponse } from "next/server";
connectMongoDB();

export async function POST(req: any) {
  const {
    headline,
    questions,
    description,
    creatorId,
    duration,
    timeStart,
    timeEnd,
    imgBanner,
  } = await req.json();
  try {
    const code = await generateRandomString(6);
    // const uploadImgBanner = await uploadBytes(
    //   ref(storage, `images/${code}/banner`),
    //   imgBanner
    // );
    // const imgBannerUrl = await getDownloadURL(uploadImgBanner.ref);
    const res = await Kuis.create({
      headline,
      questions,
      description,
      code,
      creatorId,
      duration,
      timeStart,
      timeEnd,
      imgBannerUrl: "/image/laptop.png",
    });
    return NextResponse.json(res, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { msg: "gagal menambahkan data kuis", err: error },
      { status: 500 }
    );
  }
}

export async function GET(req: any) {
  const id = req.nextUrl.searchParams.get("v");
  const creatorId = req.nextUrl.searchParams.get("i");
  const code = req.nextUrl.searchParams.get("c");
  try {
    if (id) {
      const res = await Kuis.findById(id);
      return NextResponse.json(res, { status: 200 });
    } else if (code) {
      const res = await Kuis.findOne({ code });
      if (res === null) {
        return NextResponse.json({ msg: "code invalid" }, { status: 500 });
      }
      return NextResponse.json(res, { status: 200 });
    } else if (creatorId) {
      const res = await Kuis.find({ creatorId });
      if (res === null) {
        return NextResponse.json({ msg: "code invalid" }, { status: 500 });
      }
      return NextResponse.json(res, { status: 200 });
    }
    const res = await Kuis.find();
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { msg: "gagal mengambil data kuis", err: error },
      { status: 500 }
    );
  }
}

export async function PATCH(req: any) {
  const id = req.nextUrl.searchParams.get("v");
  const { headline, questions } = await req.json();

  try {
    const kuis = await Kuis.findById(id);
    if (headline !== undefined) {
      kuis.headline = headline;
    } else if (questions !== undefined) {
      kuis.questions = questions;
    }
    await kuis.save();
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

export async function DELETE(req: any) {
  const id = req.nextUrl.searchParams.get("v");

  try {
    const res = await Kuis.findByIdAndDelete(id);
    return NextResponse.json(
      { msg: "berhasil menghapus data kuis" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { msg: "gagal mengambil data kuis", err: error },
      { status: 500 }
    );
  }
}
