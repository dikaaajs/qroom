import Link from "next/link";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <main className="text-slate-100 px-[20px]">
      <div className="py-[100px] text-center">
        <h3 className="text-[2.3rem] font-poppins-bold">Zaloid ?</h3>
        <p>
          With Zaloin, students cannot open new tabs, split screen, etc. when
          taking quizzes
        </p>
        <div className="flex gap-[15px] my-[20px] justify-center">
          <Link
            href={"/quiz"}
            className="btn text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            Join quiz
          </Link>
          <Link href={"/quiz/create"} className="btn bg-white text-black">
            Create quiz
          </Link>
        </div>
      </div>

      <div>
        <div className="flex flex-col md:flex-row text-center my-[100px]">
          <h3 className="text-[2.3rem] font-poppins-bold">
            what's in Zaloid ?
          </h3>
          <p>Everything you need to create and take quizzes</p>
        </div>

        <div className="py-[50px]">
          <div className="flex flex-col mx-[10px] items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <img
              className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
              src="/image/laptop.png"
              alt=""
            />
            <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="mb-2 text-2xl font-bold font-poppins-medium tracking-tight text-gray-900 dark:text-white">
                Strict Mode
              </h5>
              <p className="mb-3 text-gray-700 dark:text-gray-400">
                With strict mode, students cannot switch tabs, split screen, etc
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
