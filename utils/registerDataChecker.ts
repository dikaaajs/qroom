import connectMongoDB from "@/libs/database/mongodb";
import Account from "@/models/account";

export async function check(
  data: { name: string; password: string; email: string; username: string },
  err: { name: string; msg: string }[]
) {
  const { name, password, email, username } = data;

  await connectMongoDB();
  const checkUsername = /^[a-zA-Z0-9]{1,29}$/.test(username);
  if (!checkUsername) {
    err.push({
      name: "username",
      msg: "username tidak boleh menggunakan simbol, dan tidak boleh lebih dari 30 karakter",
    });
  }

  const checkName = /^[a-zA-Z0-9 ]{1,30}$/.test(name);
  if (!checkName) {
    err.push({
      name: "name",
      msg: "name tidak boleh menggunakan simbol selain spasi, tidak boleh lebih dari 30 karakter",
    });
  }

  const checkPassword = /^[^\s]{8,22}$/.test(password);
  if (!checkPassword) {
    err.push({
      name: "password",
      msg: "password memiliki minimal 8 dan maksimal 22 karakter, tidak boleh mengguanakn spasi",
    });
  }
  const findUsername = await Account.findOne({ username });
  if (findUsername !== null) {
    err.push({ name: "username", msg: "username sudah digunakan" });
  }

  const user = await Account.findOne({ email });
  if (user !== null) {
    err.push({ name: "email", msg: "email sudah digunakan" });
  }

  return err;
}
