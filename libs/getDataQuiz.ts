import axios from "axios";

const getData = async ({
  code,
  setQuiz,
  setLoading,
  setAnswer,
}: {
  code: string;
  setQuiz: any;
  setLoading: any;
  setAnswer: any;
}) => {
  const res = await axios.get(`/api/kuis?c=${code}`);
  const tmpAnswer: any = [];
  res.data.questions.map((i: any, idx: any) => {
    tmpAnswer.push(null);
  });
  setQuiz(res.data);
  if (setAnswer) {
    setAnswer(tmpAnswer);
  }

  setLoading(false);
};

export default getData;
