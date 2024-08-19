'use client';
import { v4 } from 'uuid';
import News from './News';
import MoreBtn from '../MoreBtn';
import SectionTitle from '../SectionTitle';
import { Queries } from '@/api/queries';
import { useInfiniteQuery } from '@tanstack/react-query';
import NewsSlider from './NewsSlider';
import Loader from '../Loader';

interface IProps {
  title?: string;
  isExtendable?: boolean;
  isSlides?: boolean;
  perPage?: number;
}
const NewsGrid = ({ title, isExtendable, isSlides, perPage = 8 }: IProps) => {
  const { data, isLoading, isFetchingNextPage, error, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ['news', 'infinite'],
      queryFn: ({ pageParam = 1 }) => Queries.getNews(pageParam, { perPage }),
      getNextPageParam: (prevData) =>
        prevData.meta.last_page > prevData.meta.current_page
          ? prevData.meta.current_page + 1
          : null,
      keepPreviousData: true,
    });
  // const { data, isLoading, isFetchingNextPage, error, hasNextPage, fetchNextPage } =
  //   useInfiniteQuery({
  //     queryKey: ['news', 'infinite'],
  //     queryFn: ({ pageParam = 1 }) => Queries.getNews(pageParam, { perPage }),

  //     keepPreviousData: true,
  //   });

  if (isLoading) return <Loader />;
  if (error) return <h1>{JSON.stringify(error)}</h1>;

  return (
    <div className="flex flex-col gap-8">
      {title ? <SectionTitle title={title} /> : null}
      {isSlides ? (
        <NewsSlider data={data} />
      ) : (
        <div className="news-grid sm:grid gap-[10px] sm:grid-rows-1 sm:items-start lg:grid-cols-4 sm:grid-cols-3 flex flex-col items-center content-center  sm gap-y-6">
          {data!.pages
            .flatMap((data) => data.data)
            .map((novelty) => (
              <News news={novelty} key={v4()} />
            ))}
        </div>
      )}

      {isExtendable ? (
        <div className="flex justify-center">
          <MoreBtn
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage}
            isFetching={isFetchingNextPage}
          />
        </div>
      ) : null}
    </div>
  );
};

export default NewsGrid;
