import clsx from 'clsx';

interface IProps {
  index: number;
  number: string;
  sms: string;
  date: string;
}

const SmsTableRow = ({ index, number, sms, date }: IProps) => {
  const formateDate = (date: string) => {
    const parsedDate = date.split(' ')[0].split('-').reverse().join('.');
    const parsedTime = date.split(' ')[1];
    return {
      parsedDate,
      parsedTime,
    };
  };

  const { parsedDate, parsedTime } = formateDate(date);

  return (
    <div
      className={clsx(' flex justify-between', {
        'bg-fillTableRow': index % 2 !== 0,
        'bg-fillTableRow2': index % 2 === 0,
      })}>
      <div className="w-[80px] px-[24px] py-[20px]">
        <span className="text-black font-[600] leading-[125%] text-[16px]">{index}</span>
      </div>
      <div className="w-[200px] px-[24px] py-[20px]">
        <span className="text-textDarkt  leading-[125%] text-[16px]">+{number}</span>
      </div>
      <div className="w-[380px] px-[24px] py-[20px] flex flex-wrap break-words text-textDarkt">
        <span className="text-textDarkt leading-[125%] text-[16px] inline-block w-[340px]  break-words">
          {sms}
        </span>
      </div>
      <div className="w-[180px] px-[24px] py-[20px] flex flex-col">
        <span className="text-textDarkt  leading-[125%] text-[16px]">{parsedDate}ý.</span>
        <span className="text-textDarkt  leading-[125%] text-[14px]">{parsedTime}</span>
      </div>
    </div>
  );
};

export default SmsTableRow;
