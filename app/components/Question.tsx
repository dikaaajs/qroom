import { useEffect, useState } from "react";
import { OptionModel, QuestionModel } from "../quiz/model";

interface Props {
  indexQuestion: number;
  setQuestions: any;
  questions: QuestionModel[];
}

export default function Question(props: Props) {
  const { indexQuestion, questions, setQuestions } = props;

  const [question, setQuestion] = useState<QuestionModel>({
    paragraf: "",
    image: [],
    options: [],
  });
  const [options, setOptions] = useState<OptionModel[]>([
    { paragraf: "", image: [], nav: false },
  ]);

  useEffect(() => {
    const tmp = [...questions];
    tmp[indexQuestion] = question;
    setQuestions(tmp);
  }, [question, options]);

  return (
    <div className="card py-8 px-[20px] relative -z-50" key={indexQuestion}>
      {/* header */}
      <header className="flex justify-between items-center">
        <h4 className="font-poppins-medium text-md text-white">
          Question {indexQuestion + 1}
        </h4>

        <button type="button" onClick={() => {}}>
          <img src="/svg/delete-white.svg" className="w-[22px]" />
        </button>
      </header>

      {/* soal */}
      <div className="relative z-0 w-full mb-5 mt-5 group">
        <input
          type="text"
          name="floating_text"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 font-rethink bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          onChange={(e) => {
            const tmp: QuestionModel = {
              ...question,
              paragraf: e.target.value,
            };

            setQuestion(tmp);
          }}
          required
        />
        <label
          htmlFor="floating_text"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          text
        </label>

        <label
          htmlFor={`file-text-${indexQuestion}`}
          className="text-black bg-white font-rethink w-7 h-7 flex items-center justify-center rounded-md absolute right-0 top-0 opacity-80"
        >
          <img src="/svg/add-image.svg" className="w-5 " />
        </label>
        <input
          className="hidden"
          id={`file-text-${indexQuestion}`}
          type="file"
        />
      </div>

      {/* options */}
      <div className="grid md:grid-cols-2 md:gap-6 mt-5">
        {options.map((e, indexOption) => {
          return (
            <div className="relative z-0 w-full mb-3 group" key={indexOption}>
              {/* text input */}
              <input
                type="text"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                onChange={(e) => {
                  const tmp = [...options];
                  tmp[indexOption].paragraf = e.target.value;

                  setQuestion({
                    ...question,
                    options: tmp,
                  });
                }}
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                option {indexOption + 1}
              </label>

              <button
                type="button"
                className="absolute right-0 top-0 opacity-80"
                onClick={() => {
                  const tmp = [...options];
                  tmp[indexOption] = {
                    ...tmp[indexOption],
                    nav: !tmp[indexOption].nav,
                  };
                  setOptions(tmp);
                }}
              >
                <img
                  src={`/svg/${options[indexOption].nav ? "x" : "dots"}.svg`}
                  className="w-5 "
                />
              </button>
              <div
                className={`${
                  options[indexOption].nav ? "" : "hidden"
                } z-50 absolute right-2 top-6 text-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 font-rethink py-3 px-4`}
              >
                <ul className="flex flex-col gap-3 text-left">
                  <label
                    className="text-left"
                    htmlFor={`file-${indexOption}-${indexQuestion}`}
                  >
                    <img
                      src="/svg/add-image-white.svg"
                      className="w-5 inline"
                    />{" "}
                    add image
                  </label>
                  <button
                    className="text-left text-red-500"
                    onClick={() => {
                      const tmp = [...options];
                      console.log(tmp);
                      console.log(indexOption);
                      tmp.splice(1, 1);
                      console.log({ tmp });
                      setOptions(tmp);
                    }}
                    type="button"
                  >
                    <img src="/svg/delete.svg" className="w-5 inline" /> delete
                  </button>
                </ul>
              </div>

              <input
                className="hidden"
                id={`file-${indexOption}-${indexQuestion}`}
                type="file"
              />
            </div>
          );
        })}
      </div>

      {/* button */}
      <button
        type="button"
        className="flex gap-2 items-center"
        onClick={() => {
          const tmp = [...options];
          const tmpOptions: OptionModel = {
            paragraf: "",
            image: [],
            nav: false,
          };
          tmp.push(tmpOptions);

          setOptions(tmp);
        }}
      >
        <p className="">add option</p>
        <div className="p-1 border-2 border-gray-700 rounded-full">
          <img src="/svg/add.svg" className="w-5" alt="" />
        </div>
      </button>
    </div>
  );
}
