import axios from "axios";

const getData = async ({
  name,
  setUser,
  setLoading,
}: {
  name: string;
  setUser: any;
  setLoading: any;
}) => {
  const res = await axios.get(`/api/account?n=${name}`);
  setUser(res.data);
  setLoading(false);
};

export default getData;
