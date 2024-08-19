'use client';

import { Swiper, SwiperSlide } from 'swiper/react';

import Loader from './Loader';
import MaterialsContext from '@/context/MaterialsContext';
import MoreBtn from './MoreBtn';
import { Autoplay, Navigation } from 'swiper';
import { Queries } from '@/api/queries';
import VideoItem from './VideoItem';
import { useContext } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { v4 } from 'uuid';

interface IProps {
  isSlides?: boolean;
  isExtendable?: boolean;
}

const VideoList = ({ isSlides }: IProps) => {
  const { params } = useContext(MaterialsContext);
  const { search, ...noSearchParams } = params;
  const { data, isLoading, isFetchingNextPage, error, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ['videos', 'infinite', params ? params : ''],
      queryFn: ({ pageParam = 1 }) =>
        params.search !== ''
          ? Queries.getVideos('?' + String(new URLSearchParams({ ...params, page: pageParam })))
          : Queries.getVideos(
              '?' + String(new URLSearchParams({ ...noSearchParams, page: pageParam })),
            ),
      getNextPageParam: (prevData) =>
        prevData.meta.last_page > prevData.meta.current_page
          ? prevData.meta.current_page + 1
          : null,
      keepPreviousData: true,
    });

  if (isLoading) return <Loader height={250} />;
  if (error) return <h1>{JSON.stringify(error)}</h1>;

  return (
    <div className="video-list flex flex-col gap-8 w-full">
      {isSlides ? (
        <div className="w-full">
          <Swiper
            autoHeight
            speed={1000}
            modules={[Navigation, Autoplay]}
            spaceBetween={10}
            slidesPerGroup={1}
            slidesPerGroupAuto
            slidesPerView={'auto'}
            navigation
            autoplay={{ delay: 3000 }}
            loop>
            {data ? (
              data.pages.flatMap((data) => data.data).length > 0 ? (
                data.pages
                  .flatMap((data) => data.data)
                  .map((item) => (
                    <SwiperSlide key={v4()} className="w-fit">
                      <VideoItem
                        id={item.id}
                        img={item.banner_url}
                        title={item.title}
                        slides={true}
                      />
                    </SwiperSlide>
                  ))
              ) : (
                <p className="text-lg text-center my-10">No news for the given filters</p>
              )
            ) : null}
          </Swiper>
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          <div className="grid lg:grid-cols-four gap-x-2 gap-y-6 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
            {data ? (
              data.pages.flatMap((data) => data.data).length > 0 ? (
                data.pages
                  .flatMap((data) => data.data)
                  .map((item) => (
                    <VideoItem
                      id={item.id}
                      img={item.banner_url}
                      title={item.title}
                      key={v4()}
                      slides={false}
                    />
                  ))
              ) : (
                <p className="text-lg text-center my-10">No news for the given filters</p>
              )
            ) : null}
          </div>
          <div className="flex justify-center">
            <MoreBtn
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage}
              isFetching={isFetchingNextPage}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoList;
