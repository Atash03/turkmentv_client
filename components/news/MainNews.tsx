"use client";
import { Queries } from "@/api/queries";
import { useInfiniteQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import Loader from "../Loader";
import baseUrl from "@/baseUrl";

const MainNews = () => {
  const { data, isLoading, error } = useInfiniteQuery({
    queryKey: ["news", "infinite"],
    queryFn: ({ pageParam = 1 }) => Queries.getNews(pageParam, {}),
    getNextPageParam: (prevData) =>
      prevData.meta.last_page > prevData.meta.current_page
        ? prevData.meta.current_page + 1
        : null,
  });

  const news = data!.pages.flatMap((data) => data.data)[0];

  if (isLoading) return <Loader />;
  if (error) return <h1>{JSON.stringify(error)}</h1>;

  return (
    <Link href={`/news/${news.id}`} className="main-news flex flex-col gap-6">
      <div className="w-full max-h-[250px] h-full">
        <Image
          src={news.featured_images[0].path}
          alt={news.title}
          unoptimized
          unselectable="off"
          width={1000}
          height={250}
          className="w-full object-cover h-[250px]"
        />
      </div>
      <div className="flex flex-col gap-3 text-black text-lg">
        <h2 className="font-mw_sans font-bold">{news.title}</h2>
      </div>
    </Link>
  );
};

export default MainNews;
