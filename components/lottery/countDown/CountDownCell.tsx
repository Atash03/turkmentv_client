interface IProps {
  number: string;
  title: string;
}

const CountDownCell = ({ number, title }: IProps) => {
  return (
    <div className="flex flex-col items-center justify-center flex-1 p-6">
      <h3 className="text-[80px] leading-[88px] -tracking-[1%]">{number}</h3>
      <h4 className="font-medium text-[20px] leading-[28px] -tracking-[1%]">{title}</h4>
    </div>
  );
};

export default CountDownCell;
