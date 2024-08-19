import Image from 'next/image';
import Link from 'next/link';

const Success = () => {
  return (
    <main className="success flex items-center justify-center h-screen">
      <div className="flex flex-col gap-4 items-center justify-center h-screen">
        <Image
          src={'/success.svg'}
          alt="success icon"
          width={100}
          height={100}
          className="w-[100px] h-[100px] object-contain"
        />
        <h1 className="text-black font-mw_sans font-bold text-[32px]">Gutlaýarys!</h1>
        <p className="font-roboto text-black text-lg text-center">
          Siziň sargydyňyz kabul edildi, “mahabat@turkmentv.gov.tm” elektron poçtasyna
          rekwizitleriňizi ugratmagyňyzy haýyş edýäris!
        </p>
        <Link
          href={'/advert'}
          className="flex items-center justify-center gap-2 text-white text-lg font-roboto text-center rounded-[30px] bg-mlightblue py-4 min-w-[480px]">
          <Image
            src={'/arrow-left.svg'}
            alt="arrow"
            width={32}
            height={14}
            className="w-8 h-[14px] object-contain"
          />
          <p>Yza geç</p>
        </Link>
      </div>
    </main>
  );
};
export default Success;
