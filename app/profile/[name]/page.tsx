"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
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

  useEffect(() => {
    const getData = async () => {
      console.log("jalan");
      const res = await axios.get(`/api/account?n=${params.name}`);
      setUser(res.data);
    };

    getData();
  }, []);

  return (
    <main>
      {user && (
        <div className="text-white">
          <img src={user.image} className="rounded-full mx-auto block" alt="" />
          <p className="font-poppins-bold uppercase text-center py-[20px]">
            {user.name}
          </p>
        </div>
      )}
    </main>
  );
}
