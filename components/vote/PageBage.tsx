interface IProps {
  title: string;
}
const PageBage = ({ title }: IProps) => {
  return (
    <div className="flex items-center justify-center p-2 sm:p-5 rounded-full border border-black w-fit">
      <span className="text-[12px] sm:text-2xl leading-[100%] text-textBlack font-semibold">
        {title}
      </span>
    </div>
  );
};

export default PageBage;
