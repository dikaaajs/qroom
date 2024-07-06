"use client";
import Loading from "@/app/components/Loading";
import getData from "@/libs/getDataUser";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import UserNotFound from "@/app/components/UserNotFound";
import CardJoin from "@/app/components/CardJoin";
import CardClass from "@/app/components/CardClass";

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
        <div className="text-white min-h-screen">
          <img src={user.image} className="rounded-full mx-auto block" alt="" />
          <p className="font-poppins-bold uppercase text-center mt-8 m-2 text-lg">
            {user.name}
          </p>
          <p className="font-poppins-bold uppercase text-center m-2">
            @{user.username}
          </p>
          <p className="font-poppins-bold uppercase text-center m-2 mb-4 text-lg">
            {user.role}
          </p>
          <div className="flex gap-4 flex-wrap justify-center mb-4">
            {session?.user?.name === user.username && (
              <Link href={`${user.username}/settings`} className="flex items-center justify-center gap-2 btn bg-green">Edit
                {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 ml-2">
                <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                </svg> */}
              </Link>
            )}
            <Link href={`${user.username}/history`} className="flex items-center justify-center gap-2 btn bg-green">History
              {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
              <path d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z" />
              </svg> */}
            </Link>
          </div>

          <p className="font-poppins-bold uppercase text-center mt-12 mb-0 text-lg">
            Recent Quiz:
          </p>

          <CardClass status={status} />
          
          <CardJoin status={status} role={user.role} username={user.username} sessionUsername={session!.user!.name!} />
          
        </div>
      )}

      {user === null && (
        <UserNotFound />
      )}
    </main>
  );
}
