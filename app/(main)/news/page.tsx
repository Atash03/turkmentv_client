import { Queries } from '@/api/queries';
import NewsGrid from '@/components/news/NewsGrid';
import Hydrate from '@/utils/HydrateClient';
import getQueryClient from '@/utils/getQueryClient';
import { dehydrate } from '@tanstack/react-query';

const News = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['news', 'infinite'],
    queryFn: ({ pageParam = 1 }) => Queries.getNews(pageParam, {}),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="">
      <div className="container">
        <div className="inner flex flex-col gap-14 py-11">
          <Hydrate state={dehydratedState}>
            <NewsGrid isExtendable />
          </Hydrate>
        </div>
      </div>
    </div>
  );
};

export default News;
