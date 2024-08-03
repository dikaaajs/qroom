"use client";
import ListOfError from "@/app/components/ListOfError";
import axios from "axios";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function page() {
  const [errorArray, setErrorArray] = useState();
  const [name, setname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const [role, setrole] = useState("student");
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/account", {
        name,
        username,
        password,
        email,
        role,
        image: "/defaultpp.webp",
      });

      // register success
      if (res.status === 201) {
        const login: any = await signIn("credentials", {
          username,
          password,
          redirect: false,
        });

        if (login.ok) {
          router.replace(`/profile/${username}`);
        }
      }
    } catch (error: any) {
      setErrorArray(error.response.data.err);
    }
  };

  return (
    <main className="text-white">
      <div className="text-center mt-[80px] py-[50px] bg-grey text-white px-[20px] md:px-[50px] mx-auto w-[90%] md:w-1/3 rounded-[5px]">
        <h1 className="font-poppins-bold text-[1.5rem] pb-[40px]">sign up</h1>

        <form className="flex flex-col gap-[20px]" onSubmit={handleSubmit}>
          {/* name */}
          <div className="flex flex-col text-left">
            <label htmlFor="name" className="font-rethink text-[.8rem]">
              name :
            </label>
            <input
              type="text"
              id="name"
              className="input-form"
              onChange={(e) => {
                setname(e.target.value);
              }}
            />
          </div>

          {/* username */}
          <div className="flex flex-col text-left">
            <label htmlFor="username" className="font-rethink text-[.8rem]">
              username :
            </label>
            <input
              type="text"
              id="username"
              className="input-form"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>

          {/* email */}
          <div className="flex flex-col text-left">
            <label htmlFor="email" className="font-rethink text-[.8rem]">
              email :
            </label>
            <input
              type="email"
              id="email"
              className="input-form"
              onChange={(e) => setemail(e.target.value)}
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

          {/* role */}
          <div className="flex flex-col text-left">
            <label htmlFor="role" className="font-rethink text-[.8rem]">
              role :
            </label>
            <div className="relative">
              <select
                className="input-form block appearance-none"
                id="grid-state"
                onChange={(e) => setrole(e.target.value)}
              >
                <option className="">student</option>
                <option>teacher</option>
              </select>
            </div>
          </div>

          {errorArray && <ListOfError list={errorArray} />}

          {/* submit */}
          <button type="submit" className="btn bg-green ml-auto mt-[20px]">
            submit
          </button>
        </form>
      </div>

      <div className="py-[60px]">
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
          have an account ?{" "}
          <Link href={"/auth/login"} className="text-green">
            login
          </Link>
        </p>
      </div>
    </main>
  );
}
