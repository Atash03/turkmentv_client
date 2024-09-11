'use client';
import { Queries } from '@/api/queries';
import Loader from '@/components/Loader';
import PageTitle from '@/components/PageTitle';
import MainNews from '@/components/news/MainNews';
import NewsGrid from '@/components/news/NewsGrid';
import Item from '@/components/news/NewsItem';
import GlobalContext from '@/context/GlobalContext';
import MainProvider from '@/providers/MainProvider';
import Hydrate from '@/utils/HydrateClient';
import getQueryClient from '@/utils/getQueryClient';
import { dehydrate, useQuery } from '@tanstack/react-query';
import { data } from 'autoprefixer';
import { NextSeo } from 'next-seo';
import Image from 'next/image';
import { useContext } from 'react';
import { useMediaQuery } from 'usehooks-ts';

interface IParams {
  params: {
    page_id: string;
  };
}

const PageItem = ({ params }: IParams) => {
  const responsive = useMediaQuery('(max-width: 768px)');

  const { data, isFetching, error } = useQuery({
    queryKey: ['page_item'],
    queryFn: () => Queries.getPage(params.page_id),
  });

  if (isFetching) return <Loader height={'100%'} />;
  if (error) return <h1>{JSON.stringify(error)}</h1>;

  return (
    <div className="container">
      <div className="flex flex-col gap-8 py-6">
        <NextSeo title={data!.data.title} description={data!.data.content} />
        <div className="flex flex-col gap-2">
          {data?.data.title ? <PageTitle title={data?.data.title} /> : <Loader />}
        </div>

        <div className="main-news flex md:flex-row flex-col gap-6">
          {data?.data.image && data.data.title ? (
            responsive && data.data.mobile_image ? (
              <div className="relative">
                <Image
                  src={data?.data.mobile_image}
                  alt={data?.data.title}
                  width={700}
                  height={400}
                  // unoptimized
                  // unselectable="off"
                  // fill
                  // priority
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-full lg:h-[800px] md:h-[650px] h-[350px] relative lg:max-w-[500px] md:max-w-[300px]">
                <Image
                  src={data?.data.image}
                  alt={data?.data.title}
                  unoptimized
                  unselectable="off"
                  fill
                  priority
                  className="w-full h-full object-cover"
                />
              </div>
            )
          ) : (
            <Loader />
          )}
          <div className="flex flex-col gap-3 text-black text-lg">
            {data?.data.content ? (
              <p
                className="font-roboto font-normal flex flex-col gap-4"
                dangerouslySetInnerHTML={{ __html: data?.data.content }}></p>
            ) : (
              <Loader />
            )}
            {/* <p
            className="font-roboto font-normal flex flex-col gap-4"
            dangerouslySetInnerHTML={{ __html: data!.data.content_html }}></p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageItem;
