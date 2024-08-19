import Link from 'next/link';

interface IProps {
  href: string;
  color: string;
  content: string;
}

const LinkBlock = ({ color, href, content }: IProps) => {
  return (
    <Link
      href={href}
      className="flex items-center justify-center p-4 w-full lg:h-full h-[200px] font-aeroport font-bold md:text-[34px] text-[26px] text-white text-center"
      style={{ backgroundColor: color }}>
      {content}
    </Link>
  );
};

export default LinkBlock;
