"use client";

import Loading from "@/app/components/Loading";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function page({ params }: { params: { id: string } }) {
  const { data: session, status } = useSession();

  const [dataQuiz, setDataQuiz] = useState();
  const getData = async () => {
    const resQuiz = await axios.get(`/api/kuis?c=${params.id}`);
    setDataQuiz(resQuiz.data);
  };

  useEffect(() => {
    getData();
  }, []);

  if (status === "loading") {
    return (
      <div className="min-h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div>
        <h1 className="">Leadboard</h1>
      </div>
    </div>
  );
}
