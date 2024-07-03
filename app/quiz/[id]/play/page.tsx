"use client";

import Message from "@/app/components/Message";
import getData from "@/libs/getDataQuiz";
import { useEffect, useState } from "react";

export default function page({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState(true);
  const [quiz, setQuiz] = useState<any>(null);

  const [visibility, setVisibility] = useState(true);
  const [violation, setViolation] = useState(0);
  const [die, setDie] = useState(false);

  const [deviceSize, setDeviceSize] = useState([0, 0]);
  const [resized, setResized] = useState(false);

  useEffect(() => {
    setDeviceSize([window.innerHeight, window.innerWidth]);
    getData({ code: params.id, setLoading, setQuiz });
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (violation >= 1) {
          setDie(true);
        } else {
          setViolation(violation + 1);
          setVisibility(false);
        }
      } else {
        console.log("Tab is active again");
      }
    };

    if (deviceSize[0] !== 0) {
      const handleResizeChange = () => {
        if (
          window.innerHeight !== deviceSize[0] ||
          window.innerWidth !== deviceSize[1]
        ) {
          if (violation >= 1) {
            setDie(true);
          } else {
            setViolation(violation + 1);
            setResized(true);
          }
        }
      };

      document.addEventListener("visibilitychange", handleVisibilityChange);
      window.addEventListener("resize", handleResizeChange);
      return () => {
        document.removeEventListener("resize", handleResizeChange);
        document.removeEventListener(
          "visibilitychange",
          handleVisibilityChange
        );
      };
    }
  }, [violation, deviceSize]);

  return (
    <div className="text-white">
      {/* popup */}
      {die && (
        <Message
          pesan="anda melakukan pelanggaran. jadi anda diharuskan keluar dari quiz ini"
          handleClickSuccess={setDie(false)}
        />
      )}

      {resized && (
        <Message
          pesan="ini hanya peringatan, jika kamu melakukan sekali lagi. kamu tidak bisa
          melanjutkan quiz !"
          handleClickSuccess={() => setResized(false)}
        />
      )}

      {!visibility && (
        <Message
          pesan="ini hanya peringatan, jika kamu melakukan sekali lagi. kamu tidak bisa
          melanjutkan quiz !"
          handleClickSuccess={() => setVisibility(true)}
        />
      )}

      <h1>id: {params.id}</h1>
    </div>
  );
}
