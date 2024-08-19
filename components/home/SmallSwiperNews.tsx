'use client';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import { v4 } from 'uuid';
import Link from 'next/link';
import { HomeModel } from '@/models/home.model';
import { Queries } from '@/api/queries';
import { useQuery } from '@tanstack/react-query';
import Loader from '../Loader';
import LinkBlock from './LinkBlock';

const SmallSwiperNews = () => {
  const { data, isFetching, error } = useQuery({
    queryKey: ['small_slider_news'],
    queryFn: () => Queries.getlastNews(),
  });

  if (isFetching) return <Loader height={'100%'} />;
  if (error) return <h1>{JSON.stringify(error)}</h1>;

  return (
    <div className="small-swiper flex-1">
      <Swiper
        className="h-full"
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        slidesPerView={1}
        spaceBetween={0}
        navigation
        autoplay={{ delay: 4100 }}
        speed={700}
        loop
        pagination={{
          clickable: true,
        }}>
        {/* PAY ATTENTION [data] is wrapped in an array */}
        <SwiperSlide>
          <LinkBlock href="/news" content="Habarlar" color="#a554f0" />
        </SwiperSlide>
        {data?.data.map((item, index) => (
          <SwiperSlide key={v4()} className="">
            <Link href={item ? `news/${item.id}` : ''} className="relative ">
              <div className="relative w-full h-full">
                <Image
                  src={item.featured_images[0].path}
                  alt="small_banner"
                  fill
                  unoptimized
                  unselectable="off"
                  className={`w-full object-fill pointer-events-none h-full absolute top-0 left-0`}
                />
                <div className="w-full h-full flex justify-start items-end p-4 pb-8 absolute top-0 left-0 z-30">
                  <h2 className="text-lg text-white font-bold">{item.title}</h2>
                </div>
                <div className="w-full h-full z-20  absolute top-0 left-0 bg-black opacity-40"></div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SmallSwiperNews;
