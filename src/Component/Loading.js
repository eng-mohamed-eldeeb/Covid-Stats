const Loading = () => (
  <div className="absolute z-10 w-screen h-screen bg-[#5787E5] flex flex-col gap-4 justify-center items-center">
    <div className="w-[110px] h-[110px] border-[16px] border-t-[#5787E5] rounded-full border-white animate-spin" />
    <div className="text-white text-2xl font-bold">Loading...</div>
  </div>
);

export default Loading;
