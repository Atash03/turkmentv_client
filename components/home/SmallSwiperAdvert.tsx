'use client';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import { v4 } from 'uuid';
import Link from 'next/link';
import { Queries } from '@/api/queries';
import { useQuery } from '@tanstack/react-query';
import Loader from '../Loader';

interface IProps {
  sliderNumber: number;
}

const SmallSwiperAdvert = ({ sliderNumber }: IProps) => {
  const { data, isFetching, error } = useQuery({
    queryKey: [sliderNumber === 3 ? 'small_slider3' : sliderNumber === 4 ? 'small_slider4' : ''],
    queryFn: () =>
      sliderNumber === 3
        ? Queries.getSmallSlider3()
        : sliderNumber === 4
        ? Queries.getSmallSlider4()
        : null,
  });

  if (isFetching) return <Loader height={'100%'} />;
  if (error) return <h1>{JSON.stringify(error)}</h1>;

  return (
    <div className="small-swiper overflow-hidden">
      <Swiper
        className="h-full overflow-hidden"
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        slidesPerView={1}
        spaceBetween={0}
        navigation
        autoplay={{ delay: 4200 }}
        speed={700}
        loop
        pagination={{
          clickable: true,
        }}>
        {/* PAY ATTENTION [data] is wrapped in an array */}
        {data?.data.map((item) => (
          <SwiperSlide key={v4()} className="overflow-hidden">
            {item.url || item.page_id ? (
              <Link
                // href={item.url ? item.url : `advertisment_page/${item.page_id}`}
                href={item.url ? item.url : item.page_id ? `/${item.page_id}` : ''}
                className="overflow-hidden w-full lg:h-full h-[200px] flex">
                <Image
                  src={item.image}
                  alt="small_banner"
                  fill
                  unoptimized
                  unselectable="off"
                  className={` pointer-events-none  overflow-hidden`}
                />
              </Link>
            ) : (
              <div className="overflow-hidden w-full h-full">
                <Image
                  src={item.image}
                  alt="small_banner"
                  fill
                  unoptimized
                  unselectable="off"
                  className={` pointer-events-none  overflow-hidden`}
                />
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SmallSwiperAdvert;
