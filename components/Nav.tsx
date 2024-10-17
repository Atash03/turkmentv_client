'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiOutlineUser } from 'react-icons/ai';
import ThemeSwitch from './home/ThemeSwitch';
import { useContext, useEffect, useRef, useState } from 'react';
import GlobalContext from '@/context/GlobalContext';
import burger from '@/public/menu-outline.svg';

const Nav = () => {
  const path = usePathname() ?? '/';
  const { burgerOpen, setBurgerOpen } = useContext(GlobalContext).burgerContext;
  const [dropDownOpened, setDropDownOpened] = useState(false);
  // const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropDownOpened(false);
      }
    };

    // Attach the event listener to the document
    document.addEventListener('click', handleOutsideClick);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <nav className="nav py-1 border-b-2 border-solid border-[#D9D9D9] bg-transparent dark:bg-black transition-all dark:border-black z-50 ">
      <div className="container">
        <div className="nav-inner flex justify-between gap-4 items-center">
          <div className="flex gap-11 items-center justify-start">
            <Link href={'/'} className="logo">
              <Image
                priority
                src={'/logo.png'}
                alt="logo"
                unoptimized
                unselectable="off"
                width={60}
                height={60}
                className="w-[60px] h-[60px] object-contain"
              />
            </Link>
            <ul className="md:flex gap-5 items-center justify-start hidden">
              <li>
                <Link
                  className="block text-lg text-black transition-all font-roboto font-bold dark:text-white"
                  href={'/news'}
                  style={path.includes('news') ? { color: '#FFAB48' } : {}}>
                  Habarlar
                </Link>
              </li>
              <li>
                <Link
                  href={'/treasury'}
                  className="block text-lg text-black transition-all font-roboto font-bold dark:text-white"
                  style={
                    path.includes('treasury') || path.includes('video/') ? { color: '#FFAB48' } : {}
                  }>
                  Hazyna
                </Link>
              </li>
              <li>
                <Link
                  href={'/live'}
                  className="block text-lg text-black transition-all font-roboto font-bold dark:text-white"
                  style={path.includes('live') ? { color: '#FFAB48' } : {}}>
                  Göni Ýaýlym
                </Link>
              </li>
              <li>
                <Link
                  href={'/advert'}
                  className="block text-lg text-black transition-all font-roboto font-bold dark:text-white"
                  style={path.includes('advert') ? { color: '#FFAB48' } : {}}>
                  Mahabat
                </Link>
              </li>
              <li>
                <div
                  ref={dropdownRef}
                  className="flex items-center cursor-pointer relative w-full"
                  onClick={() => setDropDownOpened(!dropDownOpened)}>
                  <span className="block text-lg text-black transition-all font-roboto font-bold dark:text-white">
                    Interaktiw
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className={`${
                      dropDownOpened ? '' : 'rotate-180'
                    } transition-all ease-in duration-150`}>
                    <path
                      d="M7.41 15.41L12 10.83L16.59 15.41L18 14L12 8L6 14L7.41 15.41Z"
                      fill="#4D4D4D"
                    />
                  </svg>

                  <div
                    className={`absolute top-10 left-1/2 -translate-x-1/2 bg-[#353598] flex flex-col gap-4 p-[24px] rounded-[8px] transition-all duration-300 w-[160px] ${
                      dropDownOpened
                        ? 'opacity-100 translate-y-0 pointer-events-auto'
                        : ' opacity-0 translate-y-2 pointer-events-none'
                    }`}>
                    <Link
                      href={'/quiz/active'}
                      className="block min-w-fit text-lg text-white transition-all font-roboto font-bold "
                      style={path.includes('quiz/active') ? { color: '#FFAB48' } : {}}
                      onClick={() => setDropDownOpened(false)}>
                      Bäsleşik
                    </Link>
                    <Link
                      href={'/vote/active'}
                      className="block min-w-fit text-lg text-white transition-all font-roboto font-bold "
                      style={path.includes('vote/active') ? { color: '#FFAB48' } : {}}
                      onClick={() => setDropDownOpened(false)}>
                      Ses bermek
                    </Link>
                    <Link
                      target="_blank"
                      href={'https://shop.turkmentv.gov.tm/'}
                      className="block min-w-fit text-lg text-white transition-all font-roboto font-bold"
                      onClick={() => setDropDownOpened(false)}>
                      TV market
                    </Link>
                    <Link
                      href={'/sms/sign_up'}
                      className="block min-w-fit text-lg text-white transition-all font-roboto font-bold"
                      style={path.includes('/sms/sign_up') ? { color: '#FFAB48' } : {}}
                      onClick={() => setDropDownOpened(false)}>
                      SMS ulgamy
                    </Link>
                    <Link
                      href={'/prizes/auth'}
                      className="block min-w-fit text-lg text-white transition-all font-roboto font-bold"
                      style={path.includes('/prizes/auth') ? { color: '#FFAB48' } : {}}
                      onClick={() => setDropDownOpened(false)}>
                      Sowgatlar
                    </Link>
                  </div>
                </div>
              </li>
              <li>
                <Link
                  href={'https://turkmentv.gov.tm/mahabat/admin/user/login'}
                  target="_blank"
                  className="block text-lg p-2 bg-red-500 rounded-lg text-white transition-all font-roboto font-bold dark:text-white">
                  Ýaýlym tertibi
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex gap-4 items-center">
            <ul className="md:flex gap-4 items-center hidden">
              <li>
                <Link
                  href={'/contact_us'}
                  style={path.includes('contact_us') ? { color: '#FFAB48' } : {}}
                  className="font-roboto font-normal text-black text-lg dark:text-white transition-all">
                  Habarlaşmak üçin
                </Link>
              </li>
              {/* <li>
              <span className="text-[#B2B1B1]">|</span>
            </li>
            <li>
              <AiOutlineUser
                style={{
                  transitionProperty: 'all',
                  transitionDuration: '150ms',
                  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                }}
                color={theme === 'dark' ? '#fff' : '#000'}
                className="w-[22px] h-[22px]"
              />
            </li>
            <li>
              <span className="text-[#B2B1B1]">|</span>
            </li>
            <li>
              <ThemeSwitch />
            </li> */}
            </ul>
            <div
              className="md:hidden block relative w-[24px] h-[24px] cursor-pointer p-4"
              onClick={() => setBurgerOpen(true)}>
              <Image src={burger} fill alt="menu" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
