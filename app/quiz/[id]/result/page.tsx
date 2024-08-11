"use client";

import Loading from "@/app/components/Loading";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function page({ params }: { params: { id: string } }) {
  const { data: session, status } = useSession();

  const [dataQuiz, setDataQuiz] = useState();
  const [answer, setAnswer] = useState<any>();

  const getData = async () => {
    const resQuiz = await axios.get(`/api/kuis?c=${params.id}`);
    setDataQuiz(resQuiz.data);
    let resAnswer = await axios.get(`/api/answer?q=${resQuiz.data._id}`);
    const isNumber = (value: any) => typeof value === "number";

    // Sort the data
    let sortedData = await resAnswer.data
      .filter((item: any) => isNumber(item.result))
      .sort((a: any, b: any) => b.result - a.result);

    // Include unfinished results at the end
    sortedData = await sortedData.concat(
      resAnswer.data.filter((item: any) => !isNumber(item.result))
    );
    console.log(sortedData);
    setAnswer(sortedData);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="min-h-screen">
      {!answer ? (
        <Loading />
      ) : (
        <div>
          <h1 className="font-poppins-bold text-white text-center text-[2rem]">
            Leaderboard
          </h1>

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
      )}
    </div>
  );
}
