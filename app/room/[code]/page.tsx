"use client";
import { useState } from "react";

export default function page({ params }: { params: { code: string } }) {
  const [nav, setNav] = useState<"quiz" | "dashboard" | "student">("quiz");
  return (
    <div className="min-h-screen px-[15px]">
      {/* banner */}
      <div className="w-full h-[150px] rounded-md my-[30px] overflow-hidden">
        <img src="/image/laptop.png" className="w-full" alt="Quiz Header" />
      </div>

      <h3 className="font-poppins-bold text-[2rem] text-center text-white">
        XII MIPA 1
      </h3>

      <nav className="flex text-center pt-[30px] relative">
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
      {/* quiz */}
      <div className=""></div>
    </div>
  );
}
