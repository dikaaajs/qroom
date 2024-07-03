"use client";

import Loading from "@/app/components/Loading";
import getData from "@/libs/getDataUser";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { QuestionModel, QuizModel } from "../../../utils/model";
import Question from "@/app/components/Question";
import axios from "axios";
import { useRouter } from "next/navigation";
import Success from "@/app/components/Success";
import Message from "@/app/components/Message";

export default function page() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [user, setUser] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<QuestionModel[]>([]);
  const [quiz, setQuiz] = useState<QuizModel>({
    headline: " ",
    description: " ",
    timeStart: "",
    timeEnd: "",
    duration: 0,
    code: "",
    questions: questions,
  });
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log({ quiz });
    setLoading(true);
    const tmp = { ...quiz, creatorId: user._id };

    try {
      const res = await axios.post("/api/kuis", tmp);
      if (res.status == 201) {
        setSuccess(true);
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleSuccess = () => {
    router.push(`/profile/${user.username}`);
  };

  // effect
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

  if (status === "unauthenticated") {
    return (
      <main className="min-h-screen">
        <Message
          pesan="you must log in first"
          handleClickSuccess={() => router.push("/auth/login")}
        />
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      {loading || (status === "loading" && <Loading />)}

      {success && (
        <Success
          headline="apalah"
          pesan="successfully created the quiz"
          handleClickSuccess={handleSuccess}
        />
      )}

      {status === "authenticated" && (
        <form className="mx-4" onSubmit={handleSubmit}>
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

            {/* duration */}
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="number"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 font-rethink bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                onChange={(e: any) => {
                  setQuiz({ ...quiz, duration: e.target.value });
                }}
                id="duration"
              />
              <label
                htmlFor="duration"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                duration (minutes)
              </label>
            </div>

            {/* timepicker */}
            <div>
              <div className="max-w-[16rem] mx-auto grid grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="start-time"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Start time:
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      type="time"
                      id="start-time"
                      className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      onChange={(e) => {
                        setQuiz({ ...quiz, timeStart: e.target.value });
                      }}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="end-time"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    End time:
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      type="time"
                      id="end-time"
                      className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      onChange={(e) => {
                        setQuiz({ ...quiz, timeEnd: e.target.value });
                      }}
                    />
                  </div>
                </div>
              </div>
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
          <div className="flex gap-5 justify-end my-[50px]">
            {/* add question */}
            <button
              className="btn-blue block"
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

            {/* submit */}
            <button
              className="btn-blue !bg-white !text-black block"
              type="submit"
            >
              submit
            </button>
          </div>
        </form>
      )}
    </main>
  );
}
