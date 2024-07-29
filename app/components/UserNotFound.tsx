import Link from "next/link";

export default function UserNotFound() {
    return (
        <div className="text-white text-center py-[150px] px-[20px]">
          <h1 className="text-[2rem] font-poppins-bold mb-4">
            User tidak ditemukan !
          </h1>
          <Link href={"/"} className="btn-blue mx-auto my-[50px]">
            Home
          </Link>
        </div>
    )
}