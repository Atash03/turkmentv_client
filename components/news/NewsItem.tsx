'use client';
import { Queries } from '@/api/queries';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Loader from '../Loader';
import baseUrl from '@/baseUrl';
import PageTitle from '../PageTitle';
import { NextSeo } from 'next-seo';

interface IProps {
  id: string;
}

const Item = ({ id }: IProps) => {
  const { data, error, isFetching } = useQuery({
    queryKey: ['news_item', id],
    queryFn: () => Queries.getNewsItem(id),
  });

  const { data: bannerData } = useQuery({
    queryKey: ['banner_item', id],
    queryFn: () => Queries.getHomeBannerSingle3(id),
  });

  if (isFetching) return <Loader />;
  if (error) return <h1>{JSON.stringify(error)}</h1>;

  return (
    <div className="flex flex-col gap-8">
      {/* <NextSeo title={data!.data.title} description={data!.data.excerpt} />
      <div className="flex flex-col gap-2">
        <PageTitle title={data!.data.title} />
        <p className="text-lg">{data?.data.published_at}</p>
      </div>

      <div className="main-news flex flex-col gap-6">
        <div className="w-full lg:h-[600px] md:h-[400px] h-[250px] relative">
          {data?.data.featured_images && data.data.featured_images[0].path ? (
            <Image
              src={data!.data.featured_images[0].path}
              alt={data!.data.slug ? data!.data.slug : data!.data.title}
              unoptimized
              unselectable="off"
              fill
              priority
              className="w-full object-contain h-[600px]"
            />
          ) : null}
        </div>
        <div className="flex flex-col gap-3 text-black text-lg">
          {/* <h2 className="font-mw_sans font-bold">{data!.data.title}</h2> */}
      {/* <p
            className="font-roboto font-normal flex flex-col gap-4"
            dangerouslySetInnerHTML={{ __html: data!.data.content_html }}></p>
        </div>
      </div> */}
      <NextSeo
        title={bannerData?.data[0] ? bannerData?.data[0].title : ''}
        description={data!.data.excerpt}
      />
      <div className="flex flex-col gap-2">
        <PageTitle title={bannerData?.data[0] ? bannerData?.data[0].title : ''} />
        <p className="text-lg">{data?.data.published_at}</p>
      </div>

      <div className="main-news flex flex-col gap-6">
        <div className="w-full lg:h-[600px] md:h-[400px] h-[250px] relative">
          {data?.data.featured_images && data.data.featured_images[0].path ? (
            <Image
              src={data!.data.featured_images[0].path}
              alt={data!.data.slug ? data!.data.slug : data!.data.title}
              unoptimized
              unselectable="off"
              fill
              priority
              className="w-full object-contain h-[600px]"
            />
          ) : null}
        </div>
        <div className="flex flex-col gap-3 text-black text-lg">
          {/* <h2 className="font-mw_sans font-bold">{data!.data.title}</h2> */}
          <p
            className="font-roboto font-normal flex flex-col gap-4"
            dangerouslySetInnerHTML={{ __html: data!.data.content_html }}></p>
        </div>
      </div>
    </div>
  );
};

export default Item;
