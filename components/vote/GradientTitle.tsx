interface IProps {
  title: string;
  size: 'big' | 'small';
}

const GradientTitle = ({ title, size }: IProps) => {
  return size === 'big' ? (
    <h1
      className={`text-[44px] sm:text-[100px] leading-[100%] font-bold bg-fancyTitle bg-clip-text text-transparent text-center `}>
      {title}
    </h1>
  ) : (
    <h2
      className={`sm:text-[36px] leading-[100%] font-bold bg-fancySubtitle bg-clip-text text-transparent text-center tracking-[3.6px] uppercase`}>
      {title}
    </h2>
  );
};

export default GradientTitle;
