import React from 'react';
import Image from 'next/image';
import { Queries } from '@/api/queries';
import { useQuery } from '@tanstack/react-query';
import Loader from '../Loader';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import { v4 } from 'uuid';

const Banner = () => {
  const { data, isFetching, error } = useQuery({
    queryKey: ['channel_description'],
    queryFn: () => Queries.getBanner(),
  });

  // if (isFetching) return <Loader height={'100%'} />;
  if (error) return <h1>{JSON.stringify(error)}</h1>;

  return (
    <aside className="live-aside max-w-[200px] w-full lg:block hidden relative">
      {data?.data ? (
        <Swiper
          modules={[Pagination, Autoplay]}
          slidesPerView={1}
          autoplay={{ delay: 3200 }}
          speed={700}
          loop
          pagination={{ clickable: true }}
          className="w-full">
          {data!.data.map((item) => (
            <SwiperSlide key={v4()} className="w-[200px] h-[400px]">
              <Link href={item.url} className="w-full h-full" target="_blank">
                <Image src={item.img_url} unoptimized alt={item.alt} fill priority className="" />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : null}
    </aside>
  );
};

export default Banner;
