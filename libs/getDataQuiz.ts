import axios from "axios";

const getData = async ({
  code,
  setQuiz,
  setLoading,
}: {
  code: string;
  setQuiz: any;
  setLoading: any;
}) => {
  const res = await axios.get(`/api/kuis?c=${code}`);
  setQuiz(res.data);
  setLoading(false);
};

export default getData;
