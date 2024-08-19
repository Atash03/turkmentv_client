import Image from 'next/image';
import { CSSProperties } from 'react';

interface IProps {
  height?: CSSProperties['height'];
}

const Loader = ({ height = 'auto' }: IProps) => {
  return (
    <div className="loader my-6 w-full flex justify-center items-center" style={{ height }}>
      <Image
        src={'/spin-blue.svg'}
        alt="loader"
        width={38}
        height={38}
        unoptimized
        className="object-contain w-[50px] h-[50px]"
      />
    </div>
  );
};

export default Loader;
