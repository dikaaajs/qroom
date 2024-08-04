"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [navbarActive, setnavbarActive] = useState(false);

  const handleClickImage = () => {
    const tmp: boolean = !navbarActive;
    setnavbarActive(tmp);
  };

  return (
    <nav className="flex justify-between text-white py-[20px] px-[30px] items-center z-auto">
      <Link href={"/"} className="font-montserrat text-[1.5rem]">
        Qroom
      </Link>

      {status === "authenticated" && session.user !== undefined && (
        <div className="relative">
          <img
            id="avatarButton"
            data-dropdown-toggle="userDropdown"
            data-dropdown-placement="bottom-start"
            className="w-10 h-10 rounded-full cursor-pointer"
            src={`${session.user?.image}`}
            alt="User dropdown"
            onClick={() => handleClickImage()}
          />

          <div
            id="userDropdown"
            className={`z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 right-0 top-[50px] ${
              navbarActive ? "" : "hidden"
            }`}
          >
            <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
              <Link
                href={`/profile/${session.user.name}`}
                className="underline"
              >
                {session.user.name}
              </Link>
              <div className="font-medium truncate">{session.user.email}</div>
            </div>
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="avatarButton"
            >
              <li>
                <Link
                  href="/"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href={`/profile/${session.user.name}`}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  href="/quiz"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Quiz
                </Link>
              </li>
            </ul>
            <div className="py-1">
              <button
                onClick={() => signOut()}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      {status === "unauthenticated" && (
        <div>
          <Link className="!text-black !bg-white btn-blue" href={"/auth/login"}>
            Login
          </Link>
        </div>
      )}

      {/* navigation md */}
      <ul className="md:flex hidden gap-[25px] font-robotomono">
        <li>home</li>
        <li>about</li>
        <li>help</li>
      </ul>

      {/* navigation sm */}
      <ul className="z-50 md:hidden fixed bottom-0 left-0 px-[30px] py-[10px] bg-black border-white border-t-[1px] font-robotomono flex justify-between w-full items-end text-[.6rem]">
        <li>
          <Link href={"/quiz"}>
            <img src="/svg/play.svg" className="w-[30px]" alt="" />
            <p className="text-center !text-[.7rem]">quiz</p>
          </Link>
        </li>
        <li>
          <Link href={"/"}>
            <img src="/svg/home.svg" className="w-[30px]" alt="" />
            <p className="text-center !text-[.7rem]">home</p>
          </Link>
        </li>
        <li>
          <Link href={"/help"}>
            <img src="/svg/help.svg" className="w-[30px]" alt="" />
            <p className="text-center !text-[.7rem]">help</p>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
