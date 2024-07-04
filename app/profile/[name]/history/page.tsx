"use client";
import Loading from "@/app/components/Loading";
import getData from "@/libs/getDataUser";
import UserNotFound from "@/app/components/UserNotFound";
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
        <div className="min-h-screen">
          <p className="font-poppins-bold text-white text-center mt-4 m-2 text-lg">
            {user.name}'s Quiz History
          </p>
          
        </div>
      )}

      {user === null && (
        <UserNotFound />
      )}
    </main>
  );
}
