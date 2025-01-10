'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useContext, useEffect, useRef, useState } from 'react';
import GlobalContext from '@/context/GlobalContext';
import close from '@/public/close-white.svg';
const MobileMenu = () => {
  const path = usePathname() ?? '/';
  const { burgerOpen, setBurgerOpen } = useContext(GlobalContext).burgerContext;

  const onClickCloseBurgerHandler = () => {
    setBurgerOpen(false);
  };

  const [dropDownOpened, setDropDownOpened] = useState(false);
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
    <>
      {burgerOpen && (
        <div className="absolute top-0 left-0 w-full h-fit bg-[#131369] z-50 py-1">
          <div className="container">
            <div className="w-full h-screen flex flex-col gap-10">
              <div className="flex items-center justify-between">
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
                <div
                  className="relative w-[24px] h-[24px] cursor-pointer "
                  onClick={() => setBurgerOpen(false)}>
                  <Image src={close} fill alt="menu" />
                </div>
              </div>
              <ul className="flex flex-col gap-10 items-start justify-center p-6">
                {/* <li>
                  <Link
                    className="block text-3xl text-white transition-all font-roboto font-bold dark:text-white"
                    onClick={() => onClickCloseBurgerHandler()}
                    href={'/news'}
                    style={path.includes('news') ? { color: '#FFAB48' } : {}}>
                    Habarlar
                  </Link>
                </li> */}
                <li>
                  <Link
                    href={'/treasury'}
                    onClick={() => onClickCloseBurgerHandler()}
                    className="block text-3xl text-white transition-all font-roboto font-bold dark:text-white"
                    style={
                      path.includes('treasury') || path.includes('video/')
                        ? { color: '#FFAB48' }
                        : {}
                    }>
                    Hazyna
                  </Link>
                </li>
                <li>
                  <Link
                    href={'/live'}
                    onClick={() => onClickCloseBurgerHandler()}
                    className="block text-3xl text-white transition-all font-roboto font-bold dark:text-white"
                    style={path.includes('live') ? { color: '#FFAB48' } : {}}>
                    Göni Ýaýlym
                  </Link>
                </li>
                <li>
                  <Link
                    href={'/advert'}
                    onClick={() => onClickCloseBurgerHandler()}
                    className="block text-3xl text-white transition-all font-roboto font-bold dark:text-white"
                    style={path.includes('advert') ? { color: '#FFAB48' } : {}}>
                    Mahabat
                  </Link>
                </li>
                <li>
                  <Link
                    href={'/contact_us'}
                    onClick={() => onClickCloseBurgerHandler()}
                    style={path.includes('contact_us') ? { color: '#FFAB48' } : {}}
                    className="font-roboto font-bold text-white text-3xl dark:text-white transition-all">
                    Habarlaşmak üçin
                  </Link>
                </li>
                <li>
                  <div
                    ref={dropdownRef}
                    className="flex flex-col  cursor-pointer relative"
                    onClick={() => setDropDownOpened(!dropDownOpened)}>
                    <div className="flex items-center gap-[8px]">
                      <span className="block text-3xl text-white transition-all font-roboto font-bold">
                        Interaktiw
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        viewBox="0 0 24 24"
                        fill="none"
                        className={`${
                          dropDownOpened ? '' : 'rotate-180'
                        } transition-all ease-in duration-150`}>
                        <path
                          d="M7.41 15.41L12 10.83L16.59 15.41L18 14L12 8L6 14L7.41 15.41Z"
                          fill="#fff"
                        />
                      </svg>
                    </div>

                    <div
                      className={` flex flex-col gap-4 rounded-[8px] transition-all duration-150 ${
                        dropDownOpened
                          ? 'h-fit opacity-100 pointer-events-auto py-[16px] px-[24px]'
                          : ' h-0 opacity-0 pointer-events-none'
                      }`}>
                      <Link
                        href={'/quiz'}
                        className="block text-2xl text-white transition-all font-roboto font-bold "
                        style={path.includes('quiz') ? { color: '#FFAB48' } : {}}
                        onClick={() => {
                          setDropDownOpened(false);
                          onClickCloseBurgerHandler();
                        }}>
                        Bäsleşik
                      </Link>
                      <Link
                        href={'/vote'}
                        className="block text-2xl text-white transition-all font-roboto font-bold "
                        style={path.includes('vote') ? { color: '#FFAB48' } : {}}
                        onClick={() => {
                          setDropDownOpened(false);
                          onClickCloseBurgerHandler();
                        }}>
                        Ses bermek
                      </Link>
                      <Link
                        href={'https://shop.turkmentv.gov.tm/'}
                        className="block text-2xl text-white transition-all font-roboto font-bold"
                        onClick={() => {
                          setDropDownOpened(false);
                          onClickCloseBurgerHandler();
                        }}>
                        TV market
                      </Link>
                      <Link
                        href={'/prizes/auth'}
                        className="block text-2xl text-white transition-all font-roboto font-bold"
                        style={path.includes('prizes') ? { color: '#FFAB48' } : {}}
                        onClick={() => {
                          setDropDownOpened(false);
                          onClickCloseBurgerHandler();
                        }}>
                        Sowgatlar
                      </Link>
                      <Link
                        href={'/lottery/auth'}
                        className="block text-2xl text-white transition-all font-roboto font-bold"
                        style={path.includes('lottery') ? { color: '#FFAB48' } : {}}
                        onClick={() => {
                          setDropDownOpened(false);
                          onClickCloseBurgerHandler();
                        }}>
                        Bije
                      </Link>
                    </div>
                  </div>
                </li>
                <li>
                  <Link
                    target="_blank"
                    href={'https://turkmentv.gov.tm/mahabat/admin/user/login'}
                    onClick={() => onClickCloseBurgerHandler()}
                    className="font-roboto font-bold text-white text-3xl dark:text-white transition-all p-2 bg-red-500 rounded-lg ">
                    Ýaýlym tertibi
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileMenu;
