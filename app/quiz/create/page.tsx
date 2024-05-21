"use client";

import Loading from "@/app/components/Loading";
import getData from "@/libs/getDataUser";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { QuestionModel, QuizModel } from "../model";
import Question from "@/app/components/Question";

export default function page() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<QuestionModel[]>([]);
  const [quiz, setQuiz] = useState<QuizModel>({
    headline: " ",
    description: " ",
    questions: questions,
  });

  useEffect(() => {
    if (status === "authenticated" && session.user) {
      getData({ name: `${session.user.name}`, setUser, setLoading });
    }
  }, [status]);

  useEffect(() => {
    const tmp: QuizModel = {
      ...quiz,
      questions: questions,
    };
    setQuiz(tmp);
  }, [questions]);

  console.log(quiz);

  if (status === "unauthenticated") {
    return (
      <div>
        <p>login terlebih dahulu</p>
      </div>
    );
  }

  return (
    <main>
      {loading || (status === "loading" && <Loading />)}

      {status === "authenticated" && (
        <form className="mx-4">
          {/* top */}
          <header className="card py-[50px] px-[20px]">
            {/* header */}
            <div className="text-center">
              <h3 className="text-white font-poppins-bold text-2xl">
                Create Quiz
              </h3>
              <p>create your own quiz</p>
            </div>

            {/* headline */}
            <div className="relative z-0 w-full mb-5 group">
              <input
                className="block py-2.5 px-0 w-full font-poppins-bold font-bold text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                onChange={(e) => {
                  const tmp: QuizModel = {
                    ...quiz,
                    headline: e.target.value,
                  };
                  setQuiz(tmp);
                }}
              />
              <label
                htmlFor="floating_headline"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Headline
              </label>
            </div>

            {/* description */}
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 font-rethink bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                onChange={(e) => {
                  const tmp: QuizModel = {
                    ...quiz,

                    description: e.target.value,
                  };
                  setQuiz(tmp);
                }}
              />
              <label
                htmlFor="floating_description"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                description
              </label>
            </div>
          </header>

          {/* questions */}
          <div className="flex flex-col gap-[30px] mt-[50px]">
            {/* card */}
            {questions.map((e, idx) => {
              return (
                <Question
                  indexQuestion={idx}
                  setQuestions={setQuestions}
                  questions={questions}
                  key={idx}
                />
              );
            })}
          </div>

          {/* button */}
          <button
            className="btn-blue my-[30px] ml-auto mr-[20px] block"
            type="button"
            onClick={() => {
              const tmp = [...questions];

              const question: QuestionModel = {
                paragraf: "",
                image: [],
                options: [],
              };

              tmp.push(question);
              setQuestions(tmp);
            }}
          >
            <img src="/svg/add.svg" className="w-[20px] inline" alt="" />
            question
          </button>
        </form>
      )}
    </main>
  );
}
