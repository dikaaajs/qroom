"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function page() {
  const [name, setname] = useState("");
  const [password, setpassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const login: any = await signIn("credentials", {
        name,
        password,
        redirect: false,
      });

      if (login.ok) {
        router.replace(`/profile/${name}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="text-white">
      <div className="text-center my-[60px] py-[50px] bg-white text-black px-[20px] mx-[20px] rounded-[5px]">
        <h1 className="font-poppins-bold text-[1.5rem] pb-[40px]">sign up</h1>

        <form className="flex flex-col gap-[20px]" onSubmit={handleSubmit}>
          {/* name */}
          <div className="flex flex-col text-left">
            <label htmlFor="name" className="font-rethink text-[.8rem]">
              name :
            </label>
            <input
              type="text"
              id="username"
              className="input-form"
              onChange={(e) => {
                setname(e.target.value);
              }}
            />
          </div>

          {/* password */}
          <div className="flex flex-col text-left">
            <label htmlFor="password" className="font-rethink text-[.8rem]">
              password :
            </label>
            <input
              type="password"
              id="password"
              className="input-form"
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>

          {/* submit */}
          <button type="submit" className="btn-blue ml-auto mt-[20px]">
            submit
          </button>
        </form>
      </div>
    </main>
  );
}
