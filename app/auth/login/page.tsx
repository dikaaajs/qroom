"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
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
        username: name,
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
      <div className="text-center mt-[80px] py-[50px] bg-grey text-white px-[20px] md:px-[50px] mx-auto w-[90%] md:w-1/3 rounded-[5px]">
        <h1 className="font-poppins-bold text-[1.5rem] pb-[40px]">sign in</h1>

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
          <button type="submit" className="btn bg-green ml-auto mt-[20px]">
            submit
          </button>
        </form>
      </div>

      <div className="py-[60px]">
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
          don't have an account ?{" "}
          <Link href={"/auth/register"} className="text-green">
            create account
          </Link>
        </p>
      </div>
    </main>
  );
}
