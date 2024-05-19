"use client";
import Loading from "@/app/components/Loading";
import getData from "@/libs/getDataUser";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

type User = {
  _id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  image: string;
  role: string;
  teachersId: [string];
  studentsId: [string];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export default function page({ params }: { params: { name: string } }) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData({ name: `${params?.name}`, setUser, setLoading });
  }, []);

  if (loading || status === "loading") {
    return <Loading />;
  }

  return (
    <main>
      {user && (
        <div className="text-white">
          <img src={user.image} className="rounded-full mx-auto block" alt="" />
          <p className="font-poppins-bold uppercase text-center py-[20px]">
            {user.name}
          </p>
          <button
            className="btn-blue gap-[10px] !bg-red-500 justify-center mx-auto block"
            onClick={() => signOut()}
          >
            logout{" "}
            <img src="/svg/logout.svg" className="w-[20px] inline" alt="" />
          </button>
        </div>
      )}

      {user === null && (
        <div className="text-white text-center py-[150px] px-[20px]">
          <h1 className="text-[2rem] font-poppins-bold">
            user tidak ditemukan !
          </h1>
          <p>user dengan username {params.name} tidak ditemukan</p>
          <Link href={"/"} className="btn-blue mx-auto my-[50px]">
            Home
          </Link>
        </div>
      )}
    </main>
  );
}
