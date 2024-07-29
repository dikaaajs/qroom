"use client";

import Loading from "@/app/components/Loading";
import getData from "@/libs/getDataQuiz";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function page({ params }: { params: { id: string } }) {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [quiz, setQuiz] = useState<any>(null);
  const [readed, setReaded] = useState(false);
  const router = useRouter();
  const url = usePathname();

  useEffect(() => {
    getData({ code: params.id, setLoading, setQuiz, setAnswer: null });
  }, []);

  console.log(quiz);
  const handleStart = () => {
    if (!readed) {
      return;
    }

    router.push(`${url}/play`);
  };

  if (loading || status === "loading") {
    return (
      <main className="min-h-screen">
        <Loading />;
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <div className="w-[90%] h-[150px] rounded-md overflow-hidden mx-auto my-[50px] relative px-5 py-5 bg-white bg-opacity-50">
        <img
          src="/image/black-lines.jpg"
          className="absolute top-0 left-0 w-full -z-50 opacity-50"
          alt=""
        />
        <h3 className="font-poppins-bold text-[1.5rem] text-grey z-50">
          read this first
        </h3>
        <p className="!text-black">
          Before taking the quiz you are required to read the rules first
        </p>
        <button className="btn bg-green text-white flex w-fit items-center gap-1 mt-[5px]">
          <img className="inline w-5" src="/svg/book.svg" alt="" />
          read
        </button>
      </div>

      <div className="flex justify-center">
        <div className="text-center border-r-[1px] w-1/2 border-white px-5">
          <h1 className="font-poppins-bold text-white text-[2rem]">
            {quiz.headline}
          </h1>
          <p>{quiz.description}</p>
        </div>

        <div className="px-5 border-l-[1px] w-1/2 border-white text-center">
          <p>{quiz.questions.length} question</p>
          <p>120 minutes</p>
          <p>start at 12:00</p>
        </div>
      </div>

      <div className="py-[50px]">
        <div className="flex gap-[20px] justify-center">
          <button
            className={`btn bg-green text-white block ${
              readed ? "" : "opacity-45 cursor-not-allowed"
            }`}
            onClick={handleStart}
          >
            start
          </button>

          <Link
            href={`/quiz/${params.id}/result`}
            className="btn bg-white text-black"
          >
            result
          </Link>
        </div>

        <div className="flex items-center justify-center gap-1 py-3">
          <input
            id="link-checkbox"
            type="checkbox"
            onClick={(e) => {
              setReaded(!readed);
            }}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="link-checkbox"
            className="text-[.9rem] font-rethink font-normal text-gray-700 dark:text-gray-400"
          >
            I have read the rules above
          </label>
        </div>
      </div>
    </main>
  );
}
