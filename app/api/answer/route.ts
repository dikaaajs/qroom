import Account from "@/models/account";
import Answer from "@/models/answer";
import { NextResponse } from "next/server";

export async function POST(req: any) {
  const { answer, quizRef, status, userRef } = await req.json();
  try {
    const res = await Answer.create({ answer, quizRef, status, userRef });
    return NextResponse.json(res, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { msg: "gagal menambahkan data answer", err: error },
      { status: 500 }
    );
  }
}

export async function GET(req: any) {
  const userRef = req.nextUrl.searchParams.get("u");
  const quizRef = req.nextUrl.searchParams.get("q");
  try {
    if (!userRef) {
      const answers = await Answer.find({ quizRef });

      const creatorEntry = answers.find(
        (answer) => answer.status === "creator"
      );
      if (!creatorEntry) {
        throw new Error("No creator entry found for the given quizRef");
      }

      const correctAnswers = creatorEntry.answer;

      // Function to calculate result
      const calculateResult = (userAnswers: any, correctAnswers: any) => {
        let score = 0;
        userAnswers.forEach((answer: any, index: any) => {
          if (answer === correctAnswers[index]) {
            score += 1;
          }
        });
        return (score / correctAnswers.length) * 100;
      };

      // Create a map of userRef to user name
      const userRefs = answers.map((answer) => answer.userRef);
      const users = await Account.find({ _id: { $in: userRefs } });
      const userMap = users.reduce((acc, user) => {
        acc[user._id] = user.name;
        return acc;
      }, {});

      // Process each answer and create the result array
      const results = answers.map((answer) => {
        if (answer.status === "unfinished") {
          return {
            name: userMap[answer.userRef],
            result: "unfinished",
          };
        } else {
          const result = calculateResult(answer.answer, correctAnswers);
          return {
            name: userMap[answer.userRef],
            result: result,
          };
        }
      });

      return NextResponse.json(results, { status: 200 });
    }

    const res = await Answer.findOne({ userRef, quizRef });
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { msg: "gagal mengambil data answer", err: error },
      { status: 500 }
    );
  }
}

export async function PATCH(req: any) {
  const userRef = req.nextUrl.searchParams.get("u");
  const quizRef = req.nextUrl.searchParams.get("q");
  const { answer, status } = await req.json();

  try {
    const answerRes = await Answer.findOne({ userRef, quizRef });
    if (answer) {
      answerRes.answer = answer;
    }
    if (status) {
      answerRes.status = status;
    }
    await answerRes.save();
    return NextResponse.json(
      { msg: "berhasil update answer" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { msg: "gagal update data answer", err: error },
      { status: 500 }
    );
  }
}
