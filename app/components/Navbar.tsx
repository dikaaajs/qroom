"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session, status } = useSession();
  return (
    <nav className="flex justify-between text-white py-[20px] px-[30px] items-center">
      <Link href={"/"} className="font-montserrat text-[1.5rem]">
        zaloid
      </Link>

      {/* navigation md */}
      <ul className="md:flex hidden gap-[25px] font-robotomono">
        <li>home</li>
        <li>about</li>
        <li>help</li>
      </ul>

      {/* navigation sm */}
      <ul className="md:hidden fixed bottom-0 left-0 px-[20px] py-[10px] border-white border-t-[1px] font-robotomono flex justify-between w-full items-center text-[.6rem]">
        <li>
          <Link href={"/about"}>
            <img src="/svg/about.svg" className="w-[30px]" alt="" />
            <p className="text-center">about</p>
          </Link>
        </li>
        <li>
          <Link href={"/"}>
            <img src="/svg/home.svg" className="w-[30px]" alt="" />
            <p className="text-center">home</p>
          </Link>
        </li>
        <li>
          <Link href={"/help"}>
            <img src="/svg/help.svg" className="w-[30px]" alt="" />
            <p className="text-center">help</p>
          </Link>
        </li>
      </ul>

      <div>
        <img src="/defaultpp.webp" className="w-[50px] rounded-full" alt="" />
      </div>
    </nav>
  );
}
