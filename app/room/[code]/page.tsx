"use client";
import Loading from "@/app/components/Loading";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function page({ params }: { params: { code: string } }) {
  const [nav, setNav] = useState<"quiz" | "dashboard" | "student">("quiz");
  const [quiz, setQuiz] = useState([]);
  const [codeQuiz, setCodeQuiz] = useState(0);
  const [kelasData, setKelasData] = useState<any>(null);
  const [answer, setAnswer] = useState<any>([]);
  const [user, setUser] = useState<any>(null);

  const [addQuizPopup, setAddQuizPopup] = useState(false);
  const [addStudents, setAddStudents] = useState(false);

  const { data: session, status } = useSession();

  const handleAddQuiz = () => {
    setAddQuizPopup(true);
  };

  const AddClassToDB = async () => {
    try {
      const res = await axios.get(`/api/kuis?c=${codeQuiz}`);
      if (res.status == 200) {
        console.log(res);
        setAddQuizPopup(false);
        await axios.patch(`/api/kelas?v=${params.code}`, {
          quizRef: [res.data._id],
        });
      }
    } catch (error) {
      alert("not finding");
    }
  };

  const getData = async () => {
    const res = await axios.get(`/api/kelas?c=${params.code}`);
    if (session?.user?.name) {
      const resUser = await axios.get(`/api/account?n=${session?.user?.name}`);
      setUser(resUser.data);
    }
    if (res.data.quiz) {
    }
    setKelasData(res.data);
  };

  const handleCopy = () => {
    const textToCopy = window.location.href + "/invite";
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        alert("Teks berhasil disalin!");
      })
      .catch((err) => {
        console.error("Gagal menyalin teks: ", err);
      });
  };

  useEffect(() => {
    getData();
  }, [status]);

  if (kelasData === null || status === "loading") {
    return (
      <div className="min-h-screen">
        <Loading />
      </div>
    );
  }

  console.log(kelasData);

  return (
    <div className="min-h-screen px-[15px] w-full overflow-hidden">
      {/* popup */}
      {addQuizPopup && (
        <div className="w-full h-full z-50 fixed backdrop-blur-sm bg-white/30 inset-0">
          <div className="fixed w-[90%] md:w-[50%] text-white bg-[#212121] text-center rounded-md top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 backdrop-brightness-50 px-[20px] md:px-[100px] py-[50px]">
            <h3 className="font-poppins-bold text-[1rem] uppercase pb-[10px]">
              code class
            </h3>
            <input
              type="text"
              className="input-form"
              onChange={(e: any) => setCodeQuiz(e.target.value)}
            />
            <button
              onClick={AddClassToDB}
              className="bg-[#1db954] py-[5px] px-[15px] rounded-[5px] font-rethink ml-auto mt-[20px] block text-white text-center"
            >
              add
            </button>
          </div>
        </div>
      )}

      {addStudents && (
        <div className="w-full h-full z-50 fixed backdrop-blur-sm bg-white/30 inset-0">
          <div className="fixed w-[90%] md:w-[50%] text-white bg-[#212121] text-center rounded-md top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 backdrop-brightness-50 px-[20px] md:px-[100px] py-[50px]">
            <h3 className="font-poppins-bold text-[1rem] uppercase pb-[10px]">
              link
            </h3>
            <button className="btn bg-green text-white" onClick={handleCopy}>
              copy
            </button>
          </div>
        </div>
      )}

      {/* banner */}
      <div className="w-full md:w-[50%] h-[150px] mx-auto rounded-md my-[30px] overflow-hidden">
        <img src="/image/laptop.png" className="w-full" alt="Quiz Header" />
      </div>

      <h3 className="font-poppins-bold text-[2rem] text-center text-white">
        {kelasData.label}
      </h3>

      <nav className="flex text-center pt-[30px] relative md:w-[60%] mx-auto">
        <div
          className={`w-1/3 cursor-pointer`}
          onClick={() => {
            setNav("quiz");
          }}
        >
          <p
            className={`${
              nav === "quiz" ? "text-green" : "text-white"
            } duration-300`}
          >
            Quiz
          </p>
        </div>
        <div
          className={`w-1/3 cursor-pointer ${
            nav === "dashboard" ? "text-green" : "text-white"
          }`}
          onClick={() => {
            setNav("dashboard");
          }}
        >
          <p
            className={`${
              nav === "dashboard" ? "text-green" : "text-white"
            } duration-300`}
          >
            Dashboard
          </p>
        </div>
        <div
          className={`w-1/3 cursor-pointer ${
            nav === "student" ? "text-green" : "text-white"
          }`}
          onClick={() => {
            setNav("student");
          }}
        >
          <p
            className={`${
              nav === "student" ? "text-green" : "text-white"
            } duration-300`}
          >
            Student
          </p>
        </div>

        <div
          className={`bg-green h-[2px] rounded-full w-1/3 absolute -bottom-[2px] duration-300 ease-out ${
            nav === "quiz"
              ? "translate-x-0"
              : nav === "dashboard"
              ? "translate-x-full"
              : "translate-x-[200%]"
          }`}
        ></div>
      </nav>

      {/* body */}
      <div
        className={`flex duration-300 ease-out ${
          nav === "quiz"
            ? "translate-x-0"
            : nav === "dashboard"
            ? "-translate-x-full"
            : "-translate-x-[200%]"
        }`}
      >
        {/* quiz */}
        <div className="w-full flex-shrink-0">
          <div className="md:w-2/3 mx-auto">
            <div className="flex flex-col gap-[20px] py-[30px]">
              {kelasData.quiz[0] === undefined && (
                <div className="flex flex-col gap-2 justify-center items-center relative p-4 rounded-md text-white overflow-hidden h-[150px] w-[90%] md:w-[80%] mx-auto">
                  <p>This class has not added a quiz</p>
                </div>
              )}
              {kelasData.quiz.map((i: any, idx: any) => {
                return (
                  <Link
                    key={idx}
                    href={`/quiz/${i.code}`}
                    className="flex flex-col gap-2 justify-start relative bg-grey p-4 rounded-md text-white overflow-hidden h-[150px] w-[90%] md:w-[80%] mx-auto"
                  >
                    <span className="font-poppins-bold text-[2rem]">
                      {i.headline}
                    </span>
                    <span className="font-poppins-medium text-medium text-[.8rem]">
                      {i.description}
                    </span>
                  </Link>
                );
              })}

              {kelasData.teachersRef.includes(user?._id) && (
                <div className="flex gap-[10px] justify-end px-[10px]">
                  <Link href="/quiz/create" className="btn bg-white">
                    create
                  </Link>
                  <button
                    className="btn bg-green text-white"
                    onClick={handleAddQuiz}
                  >
                    add quiz
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* dashboard */}
        <div className="w-full flex-shrink-0">
          <div className="md:w-2/3 mx-auto">
            <div className="relative overflow-x-auto mx-[10px] rounded-md">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 font-poppins-medium">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      rank
                    </th>
                    <th scope="col" className="px-6 py-3">
                      name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      score
                    </th>
                  </tr>
                </thead>
                <tbody className="font-rethink">
                  {answer.map((i: any, idx: any) => {
                    return (
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td className="px-6 py-4">{idx + 1}</td>

                        <td className="px-6 py-4 font-medium whitespace-nowrap text-white">
                          {i.name}
                        </td>
                        <td className="px-6 py-4 font-medium whitespace-nowrap text-white">
                          {i.result}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* student */}
        <div className="w-full flex-shrink-0">
          <div className="md:w-2/3 mx-auto pt-[50px]">
            <div className="flex flex-col gap-[40px]">
              {kelasData.students.map((i: any, idx: any) => {
                return (
                  <div
                    className="bg-grey rounded-md py-[10px] px-[20px] flex gap-[20px] items-center text-white"
                    key={idx}
                  >
                    <img
                      src={i.image}
                      className="rounded-full w-[30px]"
                      alt=""
                    />
                    <p>{i.name}</p>
                  </div>
                );
              })}
            </div>
            {kelasData.teachersRef.includes(user?._id) && (
              <button
                className="btn bg-green text-white block ml-auto mt-[20px]"
                onClick={() => setAddStudents(true)}
              >
                add
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
