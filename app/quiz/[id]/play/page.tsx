"use client";

import Loading from "@/app/components/Loading";
import Message from "@/app/components/Message";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quiz, setQuiz] = useState<any>(null);
  const [answer, setAnswer] = useState<any>([]);
  const [visibility, setVisibility] = useState(true);
  const [violation, setViolation] = useState(0);
  const [deviceSize, setDeviceSize] = useState([0, 0]);
  const [resized, setResized] = useState(false);
  const [message, setMessage] = useState<any>(null);

  const [die, setDie] = useState(false);
  const [finished, setFinished] = useState(false);

  const [kick, setKick] = useState(false);

  const router = useRouter();

  const getData = async () => {
    try {
      const resUser = await axios.get(`/api/account?n=${session?.user?.name}`);
      setUser(resUser.data);

      const resQuiz = await axios.get(`/api/kuis?c=${params.id}`);
      setQuiz(resQuiz.data);

      const tmpAnswer: any = [];
      resQuiz.data.questions.forEach(() => {
        tmpAnswer.push(null);
      });
      setAnswer(tmpAnswer);

      let answertmp;
      const getAnswer = await axios.get(
        `/api/answer?q=${resQuiz.data._id}&u=${resUser.data._id}`
      );

      console.log(getAnswer);
      if (getAnswer.data !== null) {
        if (getAnswer.data.status === "finished") {
          setFinished(true);
        } else if (getAnswer.data.status === "kick") {
          setKick(true);
        }
      }

      if (!getAnswer.data) {
        answertmp = await axios.post("/api/answer", {
          answer: tmpAnswer,
          quizRef: resQuiz.data._id,
          status: "unfinished",
          userRef: resUser.data._id,
        });
      } else {
        answertmp = getAnswer;
      }

      setAnswer(answertmp.data.answer);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const handleSubmit = async () => {
    const checkAnswer = answer.filter((e: any) => e == null);
    if (checkAnswer[0] !== undefined) {
      return setMessage("there are unanswered questions");
    }

    try {
      await axios.patch(`/api/answer?q=${quiz._id}&u=${user._id}`, {
        answer,
        status: "finished",
      });
      router.push(`result`);
    } catch (error: any) {
      alert(error.message);
    }
  };

  useEffect(() => {
    setDeviceSize([window.innerHeight, window.innerWidth]);
  }, []);

  useEffect(() => {
    if (status === "authenticated") {
      getData();
    }
  }, [status]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setKick(true);
      }
    };

    const handleResizeChange = () => {
      if (
        window.innerHeight !== deviceSize[0] ||
        window.innerWidth !== deviceSize[1]
      ) {
        setKick(true);
      }
    };

    if (deviceSize[0] !== 0) {
      document.addEventListener("visibilitychange", handleVisibilityChange);
      window.addEventListener("resize", handleResizeChange);
    }

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("resize", handleResizeChange);
    };
  }, [violation, deviceSize]);

  const updateDie = async () => {
    await axios.patch(`/api/answer?q=${quiz._id}&u=${user._id}`, {
      answer,
      status: "kick",
    });
  };

  useEffect(() => {
    if (die) {
      updateDie();
      router.push("/");
    }
  }, [die]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="text-white min-h-screen mx-4">
      {/* popup */}
      {kick && (
        <Message
          pesan="you committed a violation. so you are required to leave this quiz"
          handleClickSuccess={() => setDie(true)}
        />
      )}

      {message && (
        <Message pesan={message} handleClickSuccess={() => setMessage(null)} />
      )}

      {finished && (
        <Message
          pesan="You have done this quiz"
          handleClickSuccess={() => router.push("result")}
        />
      )}

      {/* header */}
      <div>
        <div className="w-full h-[150px] rounded-md my-[30px] overflow-hidden">
          <img src="/image/laptop.png" className="w-full" alt="Quiz Header" />
        </div>

        <div>
          <h1 className="text-white font-poppins-bold text-2xl text-center">
            {quiz.headline}
          </h1>
          <p className="text-center">{quiz.description}</p>
        </div>

        <div className="flex gap-[10px] items-center px-[10px] py-[5px] w-fit">
          <img src="/svg/time.svg" className="w-5" alt="Time" />
          <p>{quiz.duration} m</p>
        </div>
      </div>

      {/* questions */}
      <div className="flex flex-col gap-[15px] py-[20px]">
        {quiz.questions.map((i: any, indexQuestion: any) => (
          <div
            className="bg-grey rounded-md px-[10px] py-[10px]"
            key={indexQuestion}
          >
            <p className="font-montserrat text-white">{i.paragraf}</p>

            {/* options */}
            <div className="py-[10px]">
              {i.options.map((j: any, indexOption: any) => (
                <div className="flex gap-[10px] items-center" key={indexOption}>
                  <input
                    type="radio"
                    id={`${indexQuestion}-${indexOption}`}
                    value={indexOption}
                    name={`soal-${indexQuestion}`}
                    onChange={async () => {
                      const newAnswer = [...answer];
                      newAnswer[indexQuestion] = indexOption;
                      try {
                        await axios.patch(
                          `/api/answer?q=${quiz._id}&u=${user._id}`,
                          { answer: newAnswer }
                        );
                        setAnswer(newAnswer);
                      } catch (error: any) {
                        alert(error.message);
                      }
                    }}
                    checked={answer[indexQuestion] === indexOption}
                  />
                  <label htmlFor={`${indexQuestion}-${indexOption}`}>
                    {j.paragraf}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* submit */}
      <div>
        <button
          className="btn bg-green text-white ml-auto block"
          onClick={() => handleSubmit()}
        >
          submit
        </button>
      </div>
    </div>
  );
}
