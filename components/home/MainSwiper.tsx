'use client';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import { Queries } from '@/api/queries';
import { useQuery } from '@tanstack/react-query';
import Loader from '../Loader';
import { v4 } from 'uuid';
import Link from 'next/link';

const MainSwiper = () => {
  const { data, isFetching, error } = useQuery({
    queryKey: ['home'],
    queryFn: () => Queries.getHome(),
  });

  if (isFetching) return <Loader height={'100%'} />;
  if (error) return <h1>{JSON.stringify(error)}</h1>;

  return (
    <div className="big-swiper ">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        navigation
        autoplay={{ delay: 3200 }}
        speed={700}
        loop
        pagination={{ clickable: true }}
        className="h-full w-full">
        {data!.data.map((item) => (
          <SwiperSlide key={v4()} className="w-full h-full">
            <Link
              href={item.url ? item.url : ''}
              className="flex justify-center items-center relative w-full lg:h-full h-[400px]">
              <Image
                src={item.image}
                alt={item.title}
                fill
                unoptimized
                unselectable="off"
                className="pointer-events-none "
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MainSwiper;
