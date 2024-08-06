"use client";
import Success from "@/app/components/Success";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function page() {
  const { data: session, status } = useSession();

  const [label, setLabel] = useState("");
  const [success, setSuccess] = useState<null | boolean>(null);
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const resUser = await axios.get(`/api/account?n=${session?.user?.name}`);
    const res = await axios.post("/api/kelas", {
      label,
      teachersRef: [resUser.data._id],
    });

    console.log(res);
    setSuccess(true);
  };

  return (
    <main className="text-white min-h-screen">
      {/* popup */}
      {success && (
        <Success
          headline="berhasil"
          pesan="anda berhasil membuat QuizRoom"
          handleClickSuccess={() =>
            router.push(`/profile/${session?.user?.name}`)
          }
        />
      )}

      <div className="text-center mt-[80px] py-[50px] bg-grey text-white px-[20px] md:px-[50px] mx-auto w-[90%] md:w-1/3 rounded-[5px]">
        <h1 className="font-poppins-bold text-[1.5rem] pb-[40px] capitalize">
          create{" "}
          <span className="text-green font-poppins-bold text-[1.5rem]">
            Quiz
          </span>
          Room
        </h1>

        <form className="flex flex-col gap-[20px]" onSubmit={handleSubmit}>
          {/* label */}
          <div className="flex flex-col text-left">
            <label htmlFor="label" className="font-rethink text-[.8rem]">
              label :
            </label>
            <input
              type="text"
              id="label"
              className="input-form"
              onChange={(e) => {
                setLabel(e.target.value);
              }}
            />
          </div>

          {/* submit */}
          <button type="submit" className="btn bg-green ml-auto mt-[20px]">
            submit
          </button>
        </form>
      </div>
    </main>
  );
}
