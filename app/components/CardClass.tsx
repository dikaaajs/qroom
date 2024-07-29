import Link from "next/link";
import React from "react";

type User = {
    status: string
  };

export default function CardJoin({status}: User) {
    const currentStatus: string = status;

    if (currentStatus === "authenticated") {
        return (
            <Link href="/quiz" className="flex flex-col gap-2 justify-start m-8 p-4 rounded-md bg-grey text-white">
                <span className="font-poppins-bold text-lg">XII-MIPA 1</span>
                <span className="font-poppins-medium text-medium mb-4">Quiz Sistem Reproduksi</span>
                <span className="font-poppins-bold text-base text-center">Tap to join!</span>
            </Link>
    );
    } else if (status === "unauthenticated") {
        return (
            <Link href="/auth/login" onClick={() => alert("Login terlebih dahulu!")} className="flex flex-col gap-4 items-center justify-center m-8 p-4 rounded-md bg-grey text-white">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                    <path fill-rule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" />
                </svg>
                <span className="font-poppins-bold text-lg">XII-MIPA 1</span>
                <span className="font-poppins-bold text-medium">Lorem ipsum dolor sit amet</span>
                <span className="font-poppins-bold text-base">Tap to join!</span>
            </Link>
        );
      }
}