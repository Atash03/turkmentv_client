const CountDown = () => {
  return (
    <div className="bg-lightSurfaceContainer pb-8 flex flex-col w-full gap-2 rounded-[12px]">
      {/* Countdown */}
      <div className="flex items-center gap-6">
        {/* {Array(5)
          .fill(' ')
          .map((item, index) =>
            index % 2 === 0 ? (
              <div className="flex flex-col items-center justify-center flex-1 p-6">
                <h3 className="text-[80px] leading-[88px] -tracking-[1%]">12</h3>
                <h4 className="font-medium text-[20px] leading-[28px] -tracking-[1%]">sagat</h4>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <div className="w-3 h-3 rounded-full bg-lightOutlineVariant"></div>
                <div className="w-3 h-3 rounded-full bg-lightOutlineVariant"></div>
              </div>
            ),
          )} */}
        <div className="flex flex-col items-center justify-center flex-1 p-6">
          <h3 className="text-[80px] leading-[88px] -tracking-[1%]">12</h3>
          <h4 className="font-medium text-[20px] leading-[28px] -tracking-[1%]">sagat</h4>
        </div>

        <div className="flex flex-col gap-3">
          <div className="w-3 h-3 rounded-full bg-lightOutlineVariant"></div>
          <div className="w-3 h-3 rounded-full bg-lightOutlineVariant"></div>
        </div>

        <div className="flex flex-col items-center justify-center flex-1 p-6">
          <h3 className="text-[80px] leading-[88px] -tracking-[1%]">44</h3>
          <h4 className="font-medium text-[20px] leading-[28px] -tracking-[1%]">minut</h4>
        </div>

        <div className="flex flex-col gap-3">
          <div className="w-3 h-3 rounded-full bg-lightOutlineVariant"></div>
          <div className="w-3 h-3 rounded-full bg-lightOutlineVariant"></div>
        </div>

        <div className="flex flex-col items-center justify-center flex-1 p-6">
          <h3 className="text-[80px] leading-[88px] -tracking-[1%]">36</h3>
          <h4 className="font-medium text-[20px] leading-[28px] -tracking-[1%]">sekund</h4>
        </div>
      </div>

      {/* Seperator */}
      <div className="w-full bg-lightOutlineVariant h-[1px]"></div>

      <div className="flex items-center justify-center text-lightOnSurface font-heading-1-regular">
        <span>-dan başlar</span>
      </div>
    </div>
  );
};

export default CountDown;
