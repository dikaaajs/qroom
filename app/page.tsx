import Link from "next/link";

export default function Home() {
  return (
    <main className="text-slate-100 px-[20px]">
      <div className="py-[100px] text-center">
        <h3 className="text-[2.3rem] font-poppins-bold">Qroom ?</h3>
        <p>
          With Zaloin, students cannot open new tabs, split screen, etc. when
          taking quizzes
        </p>
        <div className="flex gap-[15px] my-[20px] justify-center">
          <Link href={"/quiz"} className="btn text-white bg-grey">
            Join quiz
          </Link>
          <Link href={"/quiz/create"} className="btn bg-white text-black">
            Create quiz
          </Link>
        </div>
      </div>

      <div>
        <div className="flex flex-col md:flex-row text-center my-[50px]">
          <h3 className="text-[2.3rem] font-poppins-bold">what's in Qroom ?</h3>
          <p>Everything you need to create and take quizzes</p>
        </div>

        <div className="py-[20px] grid grid-cols-1 gap-5">
          <div className="bg-grey py-5 px-3 rounded-md">
            <img src="/svg/exam.svg" className="mx-auto h-[100px]" alt="" />
            <h5 className="text-medium font-poppins-medium capitalize text-center pt-[20px]">
              safe exam
            </h5>
            <p className="text-center">
              If it is detected that switching tabs or minimizing tabs a warning
              will appear or may be aborted
            </p>
          </div>

          <div className="bg-grey py-5 px-3 rounded-md">
            <img
              src="/svg/classroom.svg"
              className="mx-auto h-[100px]"
              alt=""
            />
            <h5 className="text-medium font-poppins-medium capitalize text-center pt-[20px]">
              create classroom
            </h5>
            <p className="text-center">
              You can enter or create a classroom to make data collection easier
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
