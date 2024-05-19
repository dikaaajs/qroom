"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

export default function page() {
  const code1 = useRef<any>(null);
  const code2 = useRef<any>(null);
  const code3 = useRef<any>(null);
  const code4 = useRef<any>(null);
  const code5 = useRef<any>(null);
  const code6 = useRef<any>(null);
  const [index, setIndex] = useState(0);
  const [codeValue, setCodeValue] = useState(["", "", "", "", "", ""]);

  const handleSwitchFocus = (nextIndex: number | null) => {
    const inputCode = [code1, code2, code3, code4, code5, code6];

    if (nextIndex !== null) {
      inputCode[nextIndex].current.focus();
    } else {
      inputCode[index].current.focus();
    }
  };

  const handleChange = (e: any) => {
    let tmp = [...codeValue];
    tmp[index] = e.target.value;
    setCodeValue(tmp);

    if (index === 5) {
      return code6.current.blur();
    } else if (e.target.value !== "") {
      setIndex(index + 1);
      const nextIndex = index + 1;
      handleSwitchFocus(nextIndex);
    }
  };

  const handleDelete = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (index === 0) {
    } else if (e.key === "Backspace" || e.key === "Delete") {
      const tmp = [...codeValue];
      tmp[index] = "";
      setCodeValue(tmp);

      setIndex(index - 1);
      handleSwitchFocus(index - 1);
    }
  };

  return (
    <div className="text-white text-center px-[20px] py-[100px]">
      <div id="enter-quiz">
        <h1 className="font-poppins-bold text-[2rem] uppercase">enter code</h1>
        <p>
          Enter the code to enter the quiz lobby. The code can be obtained from
          the quiz maker
        </p>

        <form className="max-w-sm mx-auto">
          {/* input number */}
          <div className="flex mb-2 space-x-2 rtl:space-x-reverse justify-center py-[20px] font-poppins-medium !uppercase">
            <div>
              <label htmlFor="code-1" className="sr-only">
                First code
              </label>
              <input
                ref={code1}
                value={codeValue[0]}
                type="text"
                maxLength={1}
                data-focus-input-init
                data-focus-input-next="code-2"
                id="code-1"
                className="block w-9 h-9 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                onClick={() => handleSwitchFocus(null)}
                onChange={(e) => handleChange(e)}
                onKeyDown={handleDelete}
                required
              />
            </div>
            <div>
              <label htmlFor="code-2" className="sr-only">
                Second code
              </label>
              <input
                ref={code2}
                value={codeValue[1]}
                type="text"
                maxLength={1}
                data-focus-input-init
                data-focus-input-prev="code-1"
                data-focus-input-next="code-3"
                id="code-2"
                className="block w-9 h-9 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                onClick={() => handleSwitchFocus(null)}
                onChange={(e) => handleChange(e)}
                onKeyDown={handleDelete}
                required
              />
            </div>
            <div>
              <label htmlFor="code-3" className="sr-only">
                Third code
              </label>
              <input
                type="text"
                ref={code3}
                value={codeValue[2]}
                maxLength={1}
                data-focus-input-init
                data-focus-input-prev="code-2"
                data-focus-input-next="code-4"
                id="code-3"
                className="block w-9 h-9 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                onClick={() => handleSwitchFocus(null)}
                onChange={(e) => handleChange(e)}
                onKeyDown={handleDelete}
                required
              />
            </div>
            <div>
              <label htmlFor="code-4" className="sr-only">
                Fourth code
              </label>
              <input
                type="text"
                ref={code4}
                value={codeValue[3]}
                maxLength={1}
                data-focus-input-init
                data-focus-input-prev="code-3"
                data-focus-input-next="code-5"
                id="code-4"
                className="block w-9 h-9 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                onClick={() => handleSwitchFocus(null)}
                onChange={(e) => handleChange(e)}
                onKeyDown={handleDelete}
                required
              />
            </div>
            <div>
              <label htmlFor="code-5" className="sr-only">
                Fifth code
              </label>
              <input
                type="text"
                ref={code5}
                value={codeValue[4]}
                maxLength={1}
                data-focus-input-init
                data-focus-input-prev="code-4"
                data-focus-input-next="code-6"
                id="code-5"
                className="block w-9 h-9 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                onClick={() => handleSwitchFocus(null)}
                onChange={(e) => handleChange(e)}
                onKeyDown={handleDelete}
                required
              />
            </div>
            <div>
              <label htmlFor="code-6" className="sr-only">
                Sixth code
              </label>
              <input
                type="text"
                ref={code6}
                value={codeValue[5]}
                maxLength={1}
                data-focus-input-init
                data-focus-input-prev="code-5"
                id="code-6"
                className="block w-9 h-9 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                onClick={() => handleSwitchFocus(null)}
                onChange={(e) => handleChange(e)}
                onKeyDown={handleDelete}
                required
              />
            </div>
          </div>

          {/* submit */}
          <button className="btn-blue mx-auto text-[1.5rem]">Join</button>
        </form>
      </div>

      <div id="make-quiz" className="w-full mt-[200px]">
        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Create Quiz
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Create Your Own Quiz At No Cost!
          </p>
          <Link
            href="/quiz/create"
            className="btn-blue !inline-flex !items-center"
          >
            Start
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
