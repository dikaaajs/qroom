"use client";

import Message from "@/app/components/Message";
import { useEffect, useState } from "react";

export default function page({ params }: { params: { id: string } }) {
  const [visibility, setVisibility] = useState(true);
  const [violation, setViolation] = useState(0);
  const [die, setDie] = useState(false);

  const [deviceSize, setDeviceSize] = useState([0, 0]);
  const [resized, setResized] = useState(false);

  useEffect(() => {
    setDeviceSize([window.innerHeight, window.innerWidth]);
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
          headline="prit prit prit"
          pesan="anda melakukan pelanggaran. jadi anda diharuskan keluar dari quiz ini"
          state={setDie}
          value={false}
        />
      )}

      {resized && (
        <Message
          headline="resize atau split screen terdeteksi"
          pesan="ini hanya peringatan, jika kamu melakukan sekali lagi. kamu tidak bisa
          melanjutkan quiz !"
          state={setResized}
          value={false}
        />
      )}

      {!visibility && (
        <Message
          pesan="ini hanya peringatan, jika kamu melakukan sekali lagi. kamu tidak bisa
          melanjutkan quiz !"
          headline="anda beralih tab"
          state={setVisibility}
          value={true}
        />
      )}

      <h1>id: {params.id}</h1>
    </div>
  );
}
