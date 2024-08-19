'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper';
import { InfiniteData } from '@tanstack/react-query';
import { NewsModel } from '@/models/news.model';
import { v4 } from 'uuid';
import News from './News';

interface IProps {
  data: InfiniteData<NewsModel> | undefined;
}

const NewsSlider = ({ data }: IProps) => {
  return (
    <div className="big-swiper w-full">
      <Swiper
        speed={1000}
        modules={[Navigation, Autoplay]}
        spaceBetween={10}
        slidesPerGroup={1}
        slidesPerGroupAuto
        slidesPerView={'auto'}
        navigation
        autoplay={{ delay: 3000 }}
        loop>
        {data!.pages
          .flatMap((data) => data.data)
          .map((novelty) => (
            <SwiperSlide key={v4()} className="w-fit">
              <News news={novelty} key={v4()} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default NewsSlider;
