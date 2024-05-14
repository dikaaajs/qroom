export default function Message(props: {
  headline: string;
  pesan: string;
  state: any;
  value: any;
}) {
  const { headline, pesan, state, value } = props;
  return (
    <div className="w-full h-full fixed backdrop-blur-sm bg-white/30 z-40 inset-0">
      <div className="fixed w-[90%] md:w-[50%] text-black bg-white text-center rounded-md top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 backdrop-brightness-50">
        <div className="z-50 pt-[70px] pb-[10px] flex gap-[10px] justify-center items-center">
          <img src="/svg/warning.svg" className="w-[30px]" alt="" />

          <h1 className="font-poppins-medium text-[1rem] uppercase">
            {headline}
          </h1>
        </div>

        <p className="pb-[50px] text-[.8rem]">{pesan}</p>

        <button
          className="bg-blue-500 py-[5px] px-[15px] rounded-[5px] font-rethink ml-auto mr-[20px] mb-[20px] block text-white"
          onClick={() => state(value)}
        >
          oke
        </button>
      </div>
    </div>
  );
}
