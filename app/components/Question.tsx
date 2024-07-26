import { useEffect, useState } from "react";
import { OptionModel, QuestionModel } from "../../utils/model";
import { handleChangeImg } from "@/libs/handleChangeImg";

export default function Question({
  indexQuestion,
  questionsState,
  answerState,
}: {
  indexQuestion: number;
  questionsState: { questions: any; setQuestions: any };
  answerState: { setAnswer: any; answer: any };
}) {
  const { questions, setQuestions } = questionsState;
  const { setAnswer, answer } = answerState;

  const [options, setOptions] = useState<OptionModel[]>([
    { paragraf: "", image: [] },
  ]);

  // start image state required
  const [imgWillBeCrop, setImgWillBeCrop] = useState<any>(null);
  const [cropDialog, setCropDialog] = useState(false);
  // img TMP is dinamic variable that will be send to CropImg component
  // this variable will be assign with state and setState
  const [imageTMP, setImageTMP] = useState<{ state: any; setState: any }>({
    state: null,
    setState: null,
  });
  // end

  const [imgQuestion, setimgQuestion] = useState();

  return (
    <div className="card py-8 px-[20px] relative" key={indexQuestion}>
      {/* header */}
      <header className="flex justify-between items-center">
        <h4 className="font-poppins-medium text-md text-white">
          Question {indexQuestion + 1}
        </h4>

        <button
          type="button"
          onClick={() => {
            const tmp = [...questions];
            tmp.splice(indexQuestion, 1);
            setQuestions(tmp);
          }}
        >
          <img src="/svg/delete-white.svg" className="w-[22px]" />
        </button>
      </header>

      {/* soal */}
      <div className="relative z-40 w-full mb-5 mt-5 group">
        <input
          type="text"
          name={`text${indexQuestion}`}
          className="z-40 block py-2.5 px-0 w-full text-sm text-gray-900 font-rethink bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          value={questions[indexQuestion].paragraf}
          onChange={(e) => {
            const tmp = [...questions];
            tmp[indexQuestion] = {
              ...tmp[indexQuestion],
              paragraf: e.target.value,
            };

            setQuestions(tmp);
          }}
          required
        />
        <label
          htmlFor={`text${indexQuestion}`}
          className="z-40 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          text
        </label>

        {/* add image */}
        {/* <label
          htmlFor={`file-text-${indexQuestion}`}
          className="text-black bg-white font-rethink w-7 h-7 flex items-center justify-center rounded-md absolute right-0 top-0 opacity-80"
        >
          <img src="/svg/add-image.svg" className="w-5 " />
        </label> */}
        <input
          className="hidden"
          type="file"
          id={`file-text-${indexQuestion}`}
          onChange={(e) => {
            handleChangeImg(e, setImgWillBeCrop, setCropDialog, setImageTMP, {
              state: imgQuestion,
              setState: setimgQuestion,
            });
          }}
        />
      </div>

      {/* options */}
      <div className="grid md:grid-cols-2 md:gap-6 mt-5">
        {questions[indexQuestion].options.map((e: any, indexOption: any) => {
          return (
            <div
              className="relative z-40 w-full mb-3 group flex gap-[10px] items-center"
              key={indexOption}
            >
              {/* button option */}
              <input
                type="radio"
                id={`${indexQuestion}-${indexOption}`}
                value={`${indexQuestion}-${indexOption}`}
                name={`option-${indexQuestion}`}
                onChange={() => {
                  const tmpAnswer = [...answer];
                  tmpAnswer[indexQuestion] = indexOption;
                  setAnswer(tmpAnswer);
                }}
              />
              {/* text input */}
              <input
                type="text"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                onChange={(e) => {
                  const tmp = [...questions];
                  tmp[indexQuestion].options[indexOption] = {
                    ...tmp[indexQuestion].options[indexOption],
                    paragraf: e.target.value,
                  };

                  setQuestions(tmp);
                }}
                value={e.paragraf}
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 translate-x-[25px] scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                option {indexOption + 1}
              </label>

              {/* button options */}
              <div className="flex gap-3 absolute right-2 bottom-2">
                {/* add img */}
                {/* <button
                  type="button"
                  className=" opacity-80"
                  onClick={() => {
                  }}
                >
                  <img src={`/svg/add-image-white.svg`} className="w-5 " />
                </button> */}

                {/* delete option */}
                <button
                  type="button"
                  className=" opacity-80"
                  onClick={() => {
                    const tmp = [...questions];
                    const test = tmp[indexQuestion].options.splice(
                      indexOption,
                      1
                    );

                    setOptions(tmp);
                  }}
                >
                  <img src={`/svg/delete.svg`} className="w-5 " />
                </button>
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

      {/* add button */}
      <button
        type="button"
        className="flex gap-2 items-center"
        onClick={() => {
          const tmp = [...questions];
          const tmpOptions: OptionModel = {
            paragraf: "",
            image: [],
          };
          tmp[indexQuestion].options.push(tmpOptions);

          setQuestions(tmp);
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
