import Kuis from "@/models/kuis";

const generateRandomString = async (length: number): Promise<string> => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;

  let result = "";
  let isUnique = false;

  while (!isUnique) {
    result = "";
    for (let i = 0; i < length; i++) {
      let randomCharacter;
      do {
        randomCharacter = characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      } while (result.includes(randomCharacter));
      result += randomCharacter;
    }

    const checkCode = await Kuis.findOne({ code: result });
    if (!checkCode) {
      isUnique = true;
    }
  }

  return result;
};

export default generateRandomString;
