import Link from "next/link";
import React from "react";

type User = {
    role: string,
    status: string
    username: string,
    sessionUsername: string
  };

export default function CardJoin({status, role, username, sessionUsername}: User) {
    const selectedRole: string = role;
    const currentStatus: string = status;
    const targetUsername: string = username;
    const currentUsername: string = sessionUsername;

    if ((currentUsername === targetUsername) && (selectedRole === "teacher")) {
        return (
            <Link href="/quiz/create" className="flex flex-col gap-4 items-center justify-center m-8 p-4 rounded-md bg-grey text-white">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                    <path fill-rule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" />
                </svg>
                <span className="font-poppins-bold text-lg">Create a quiz</span>
            </Link>
    );
    } 

    if ((currentUsername === targetUsername) && (selectedRole === "student")) {
        return (
            <Link href="/quiz/join" className="flex flex-col gap-4 items-center justify-center m-8 p-4 rounded-md bg-grey text-white">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                    <path fill-rule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" />
                </svg>
                <span className="font-poppins-bold text-lg">Join a quiz</span>
            </Link>
    );
    }

    return (
        <span className="hidden">.</span>
    );
}