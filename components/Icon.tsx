import Image from "next/image";

interface IProps {
  width: number;
  height: number;
  element: string;
}

const Icon = ({ width, height, element }: IProps) => {
  return (
    <div style={{ width, height }}>
      <Image
        src={element}
        unoptimized
        unselectable="off"
        alt={`icon_${element}`}
        width={width}
        height={height}
      ></Image>
    </div>
  );
};

export default Icon;
