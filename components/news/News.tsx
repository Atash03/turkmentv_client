import baseUrl from '@/baseUrl';
import { NewsModel } from '@/models/news.model';
import Image from 'next/image';
import Link from 'next/link';

interface IProps {
  news: NewsModel['data'][0];
}

const News = ({ news }: IProps) => {
  return (
    <Link
      href={`/news/${news.id}`}
      className="news flex flex-col gap-2 h-fit lg:max-w-[350px] md:max-w-[300px] sm:max-w-[200px]  max-w-[300px] w-full">
      <div className=" w-full md:h-[200px] sm:h-[150px] h-[200px] rounded-five overflow-hidden relative">
        {news.featured_images && news.featured_images[0].path ? (
          <Image
            src={news.featured_images[0].path}
            alt={news.slug ? news.slug : news.title}
            unoptimized
            unselectable="off"
            fill
            className="w-full object-cover h-full"
          />
        ) : null}
      </div>
      <p className="font-roboto text-sm text-black font-normal clamped">{news.published_at}</p>
      <p className="font-roboto text-lg leading-6 text-black font-bold clamped">{news.title}</p>
    </Link>
  );
};

export default News;
