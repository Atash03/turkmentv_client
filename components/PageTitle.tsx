interface IProps {
  title: string;
}
const PageTitle = ({ title }: IProps) => {
  return <h1 className="font-mw_sans font-bold text-black md:text-[32px] text-[24px]">{title}</h1>;
};

export default PageTitle;
