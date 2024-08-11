"use client";

import Loading from "@/app/components/Loading";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function page({ params }: { params: { code: string } }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleYes = async () => {
    const resUser = await axios.get(`/api/account?n=${session?.user?.name}`);
    await axios.patch(`/api/kelas?v=${params.code}`, {
      studentsRef: [resUser.data._id],
    });
    router.push(`/room/${params.code}`);
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen">
        <Loading />
      </div>
    );
  }

  if (status === "unauthenticated") {
    router.push("/auth/login");
  }

  return (
    <div className="min-h-screen">
      <div className="w-full h-full z-auto fixed backdrop-blur-sm bg-white/30 inset-0">
        <div className="fixed w-[90%] md:w-[50%] text-white bg-[#212121] text-center rounded-md top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 backdrop-brightness-50 py-[30px]">
          <h3 className="text-[.8rem] font-poppins-medium">
            received an invitation to enter the quiz room?
          </h3>

          <button
            className="bg-[#1db954] btn text-white rounded-[5px] ml-auto mr-[20px] block"
            onClick={handleYes}
          >
            yes
          </button>
        </div>
      </div>
    </div>
  );
}
