import Link from 'next/link';
import Image from 'next/image';
import apple from '@/public/App Store Button Black.svg';
import play from '@/public/Google Play Button Black.svg';
import app1 from '@/public/tv-mobile.png';
import app2 from '@/public/tv-mobile2.png';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer w-full bg-[#121268] z-auto">
      <div className="container">
        <div className="footer-inner py-[22px] md:px-8 md:grid md:grid-cols-footer flex flex-col gap-6 overflow-x-hidden">
          <div className="flex flex-col md:gap-14 gap-6">
            <ul className="grid grid-cols-2 gap-3">
              <li>
                <Link
                  href={'/news'}
                  className="w-full h-full text-left font-roboto text-lg text-white">
                  Habarlar
                </Link>
              </li>
              <li>
                <Link
                  href={'/advert'}
                  className="w-full h-full text-left font-roboto text-lg text-white">
                  Mahabat
                </Link>
              </li>
              <li>
                <Link
                  href={'/treasury'}
                  className="w-full h-full text-left font-roboto text-lg text-white">
                  Hazyna
                </Link>
              </li>
              <li>
                <Link
                  href={'/about_us'}
                  className="w-full h-full text-left font-roboto text-lg text-white">
                  Biz barada
                </Link>
              </li>
              <li>
                <Link
                  href={'/live'}
                  className="w-full h-full text-left font-roboto text-lg text-white">
                  Göni Ýaýlym
                </Link>
              </li>
              <li>
                <Link
                  href={'/contact_us'}
                  className="w-full h-full text-left font-roboto text-lg text-white">
                  Habarlaşmak üçin
                </Link>
              </li>
            </ul>
            <div className="flex md:flex-row flex-col md:gap-12 gap-6">
              <div className="flex  items-center  gap-6">
                <div className="relative w-20 h-20 rounded-full overflow-hidden">
                  <Image src={app2} alt="asf" fill />
                </div>
                <div className="flex flex-col gap-3 w-fit">
                  <Link
                    href="https://apps.apple.com/ru/app/t%C3%BCrkmen-radio/id1622189361"
                    className="relative h-12 w-40 block"
                    target="_blank">
                    <Image src={apple} alt="app store" fill />
                  </Link>
                  <Link
                    href="https://play.google.com/store/apps/details?id=com.app.telecom_radio"
                    className="relative h-12 w-40 block"
                    target="_blank">
                    <Image src={play} alt="google play" fill />
                  </Link>
                </div>
              </div>
              <div className="flex  items-center  gap-6">
                <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                  <Image src={app1} alt="asf" fill />
                </div>
                <div className="flex flex-col gap-3 w-fit">
                  <Link
                    href="https://apps.apple.com/ru/app/t%C3%BCrkmen-tv/id915833573"
                    className="relative h-12 w-40 block"
                    target="_blank">
                    <Image src={apple} alt="app store" fill />
                  </Link>
                  <Link
                    href="https://play.google.com/store/apps/details?id=tm.ykjam.turkmentv"
                    className="relative h-12 w-40 block"
                    target="_blank">
                    <Image src={play} alt="google play" fill />
                  </Link>
                </div>
              </div>
            </div>
            <p className="font-alexandria text-[#5151CF] md:block hidden">
              {year} © TurkmenTV. All rights reserved.
            </p>
          </div>
          <div className="flex flex-col gap-9">
            <p className="relative font-roboto font-normal opacity-60 text-white flex flex-col gap-3 pl-[18px]">
              <a href="tel:+99312493705">Phone: +993 12 493705</a>
              <span>Aşgabat şäheri Oguzhan 13</span>
              <a href="mailto:mahabat@turkmentv.gov.tm">mahabat@turkmentv.gov.tm</a>
              <span className="absolute top-0 left-0 w-[5px] h-full bg-white"></span>
            </p>
          </div>
          <p className="font-alexandria text-[#5151CF] md:hidden block">
            {year} © TurkmenTV. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
