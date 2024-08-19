import { Queries } from "@/api/queries";
import PageTitle from "@/components/PageTitle";
import MainNews from "@/components/news/MainNews";
import NewsGrid from "@/components/news/NewsGrid";
import Item from "@/components/news/NewsItem";
import Hydrate from "@/utils/HydrateClient";
import getQueryClient from "@/utils/getQueryClient";
import { dehydrate } from "@tanstack/react-query";

export async function generateStaticParams() {
  const news = await Queries.getNews(1, { perPage: 20 });

  return news.data.map((item) => ({
    slug: item.id.toString(),
  }));
}

interface IParams {
  params: {
    slug: string;
  };
}

const NewsItem = async ({ params }: IParams) => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["news_item", params.slug],
    queryFn: () => Queries.getNewsItem(params.slug),
  });
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["news", "infinite"],
    queryFn: ({ pageParam = 1 }) => Queries.getNews(pageParam, {}),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="news-item">
      <div className="container">
        <Hydrate state={{ dehydratedState }}>
          <div className="news-body py-11">
            <Item id={params.slug} />
            <div className="pt-8">
              <NewsGrid isSlides perPage={20} title="Habarlar" />
            </div>
          </div>
        </Hydrate>
      </div>
    </div>
  );
};

export default NewsItem;
