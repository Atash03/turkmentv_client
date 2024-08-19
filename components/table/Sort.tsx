export const Sort = () => {
  const sortItems = [
    {
      view: 'Сначала новые',
    },
    {
      view: 'Сначала старые ',
    },
    {
      view: 'Выбрать дату...',
    },
  ];

  return (
    <div className="rounded-[25px] flex items-center bg-[#F0F0FA] max-w-[555px] w-full">
      <div className="bg-[#E1E1F5] rounded-[25px_0_0_25px] flex justify-center items-center py-[16px] px-[18px]">
        <span className="font-semibold text-[14px] leading-[120%]">Сортировка</span>
      </div>

      <div className="flex w-full justify-between gap-[16px] items-center px-[16px]">
        {sortItems.map((item) => (
          <div className="flex justify-center items-center">
            <span className="cursor-pointer text-[#636370] block text-[14px] leading-[120%] text-center">
              {item.view}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
