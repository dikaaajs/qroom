import Link from "next/link";

export default function Home() {
  return (
    <main className="text-slate-100 px-[20px]">
      <div className="py-[100px] text-center">
        <h3 className="text-[2.3rem] font-poppins-bold">Welcome!</h3>
        <p>
          Create or join quizzes seamlessly with Qroom!
        </p>
        <div className="flex gap-[15px] my-[20px] justify-center">
          <Link href={"/quiz"} className="btn text-white bg-grey">
            Join Quiz
          </Link>
          <Link href={"/quiz/create"} className="btn bg-white text-black">
            Create Quiz
          </Link>
        </div>
      </div>

      <div>
        <div className="flex flex-col md:flex-row text-center my-[50px]">
          <h3 className="text-[2.3rem] font-poppins-bold">Why use Qroom?</h3>
          <p>Everything you need to create and take quizzes is here. Take a look at some of the features!</p>
        </div>

        <div className="py-[20px] grid grid-cols-1 gap-5">
          <div className="bg-grey py-5 px-3 rounded-md">
            <img src="/svg/exam.svg" className="mx-auto h-[100px]" alt="" />
            <h5 className="text-medium font-poppins-medium capitalize text-center pt-[20px]">
              Safe Exam
            </h5>
            <p className="text-center">
              Automatically warn students if they switch between tabs in the browser.
            </p>
          </div>

          <div className="bg-grey py-5 px-3 rounded-md">
            <img
              src="/svg/classroom.svg"
              className="mx-auto h-[100px]"
              alt=""
            />
            <h5 className="text-medium font-poppins-medium capitalize text-center pt-[20px]">
              Create Classroom
            </h5>
            <p className="text-center">
              Easier class organization just like in Google Clsasroom, but better!
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
