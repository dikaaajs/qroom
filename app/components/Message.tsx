export default function Success(props: {
  pesan: string;
  handleClickSuccess: any;
}) {
  const { pesan, handleClickSuccess } = props;
  return (
    <div className="w-full h-full z-auto fixed backdrop-blur-sm bg-white/30 inset-0">
      <div className="fixed w-[90%] md:w-[50%] text-white bg-[#212121] text-center rounded-md top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 backdrop-brightness-50 py-[30px]">
        <p className=" text-[.8rem]">{pesan}</p>

        <button
          className="bg-[#1db954] py-[5px] px-[15px] rounded-[5px] font-rethink ml-auto mr-[20px] mb-[20px] block text-white"
          onClick={() => handleClickSuccess()}
        >
          oke
        </button>
      </div>
    </div>
  );
}
