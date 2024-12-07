'use client';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import { v4 } from 'uuid';
import Link from 'next/link';
import { Queries } from '@/api/queries';
import { useQuery } from '@tanstack/react-query';
import Loader from '../Loader';
import LinkBlock from './LinkBlock';
import { VideoItemModel } from '@/models/videoItem.model';

const SmallSwiperVideos = () => {
  const { data, isFetching, error } = useQuery({
    queryKey: ['small_slider_videos'],
    queryFn: () => Queries.getLastVideos(),
  });

  if (isFetching) return <Loader height={'100%'} />;
  if (error) return <h1>{JSON.stringify(error)}</h1>;

  function chooseRandomItems(inputArray: VideoItemModel[]) {
    // Check if the input array has at least 5 items
    if (inputArray.length < 5) {
      throw new Error('Input array must have at least 5 items');
    }

    // Use the Fisher-Yates (Knuth) shuffle algorithm to shuffle the array
    for (let i = inputArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [inputArray[i], inputArray[j]] = [inputArray[j], inputArray[i]];
    }

    // Return the first 5 items from the shuffled array
    return inputArray.slice(0, 5);
  }

  return (
    <div className="small-swiper">
      <Swiper
        className="h-full"
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        slidesPerView={1}
        spaceBetween={0}
        navigation
        autoplay={{ delay: 4000 }}
        speed={700}
        loop
        pagination={{
          clickable: true,
        }}>
        {/* PAY ATTENTION [data] is wrapped in an array */}
        <SwiperSlide>
          <LinkBlock href="/vote/36" content="Hazyna" color="#c56540" />
        </SwiperSlide>
        {data?.data
          ? chooseRandomItems(data.data).map((item, index) => (
              <SwiperSlide key={v4()}>
                <Link href={item ? `treasury/${item.id}` : ''}>
                  {item.banner_url ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={item.banner_url}
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
                  ) : null}
                </Link>
              </SwiperSlide>
            ))
          : null}
      </Swiper>
    </div>
  );
};

export default SmallSwiperVideos;
