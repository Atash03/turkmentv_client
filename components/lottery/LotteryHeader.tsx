import Image from "next/image";
import InfoDateAllert from "../common/InfoDateAllert";

interface LotteryHeaderProps {
  title: string;
  description: string;
  image: string;
  smsCode: string;
  startDate: string;
}

const LotteryHeader = ({
  title,
  description,
  image,
  smsCode,
  startDate,
}: LotteryHeaderProps) => {
  return (
    <section className="container">
      <div className="flex flex-col md:gap-[32px] gap-[24px]">
        <div className="flex flex-col gap-[24px] items-center">
          <h1 className="sm:font-display-1-regular text-[32px] leading-[40px] text-center">
            {title}
          </h1>
          <p className="text-center text-textLarge leading-textLarge">
            {description}
          </p>
          <InfoDateAllert date={startDate} text="Senesi:" />
        </div>
        {image && (
          <div className="md:mb-8 sm:mb-[40px] mb-[16px]">
            <Image
              src={image}
              width={1416}
              height={177}
              alt="banner"
              className="rounded-[12px] h-[177px] object-cover"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default LotteryHeader;
