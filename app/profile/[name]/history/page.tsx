"use client";
import Loading from "@/app/components/Loading";
import getData from "@/libs/getDataUser";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import UserNotFound from "@/app/components/UserNotFound";
import axios from "axios";

type User = {
  _id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  image: string;
  role: string;
  teachersId: [string];
  studentsId: [string];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export default function page({ params }: { params: { name: string } }) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [quiz, setQuiz] = useState<any>(null);

  const getData = async () => {
    const res = await axios.get(`/api/account?n=${params.name}`);
    setUser(res.data);
    const resQuiz = await axios.get(`/api/kuis?i=${res.data._id}`);
    setQuiz(resQuiz.data);

    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(quiz);

  if (loading || status === "loading" || quiz === null) {
    return (
      <div className="min-h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <main>
      {user && (
        <div className="text-white min-h-screen">

          <p className="font-poppins-bold uppercase text-center mt-12 mb-0 text-lg">
            {`${user.name}'s Quiz History:`}
          </p>

          {quiz.map((i: any, idx: any) => {
            return (
              <Link
                href={`/quiz/${i.code}/result`}
                className="flex flex-col gap-2 justify-start m-8 p-4 rounded-md bg-grey text-white"
              >
                <span className="font-poppins-bold text-[2rem]">
                  {i.headline}
                </span>
                <span className="font-poppins-medium text-medium text-[.8rem]">
                  {i.description}
                </span>
                <p>code : {i.code}</p>
                <span className="font-poppins-bold text-base text-center">
                  Tap to see result
                </span>
              </Link>
            );
          })}

        </div>
      )}

      {user === null && <UserNotFound />}
    </main>
  );
}
