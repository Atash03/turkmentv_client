import { Queries } from '@/api/queries';
import Aside from '@/components/Aside';
import Categories from '@/components/Categories';
import SearchBar from '@/components/SearchBar';
import VideoList from '@/components/VideoList';
import Hydrate from '@/utils/HydrateClient';
import getQueryClient from '@/utils/getQueryClient';
import { dehydrate } from '@tanstack/react-query';

export async function generateStaticParams() {
  const categories = await Queries.getCategories();

  return categories.data.map((category) => ({
    category_id: String(category.id),
  }));
}

const Treasury = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['categories'],
    queryFn: () => Queries.getCategories(),
  });
  await queryClient.prefetchQuery({
    queryKey: ['channels'],
    queryFn: () => Queries.getChannels(),
  });

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['videos', 'infinite', ''],
    queryFn: ({ pageParam = 1 }) =>
      Queries.getVideos(
        '?' +
          String(
            new URLSearchParams({
              page: pageParam,
              per_page: '8',
            }),
          ),
      ),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="treasury relative">
      <div className="container">
        <div className="treasury-inner pt-8 pb-14">
          <h1 className="hidden">Treasury</h1>
          <Hydrate state={dehydratedState}>
            <div className="treasury-wrapper flex md:flex-row gap-x-8 flex-col ">
              <Aside line />
              <div className="treasury-top flex flex-col gap-6 w-full">
                <SearchBar />
                <Categories />
                <VideoList isExtendable />
              </div>
            </div>
          </Hydrate>
        </div>
      </div>
    </div>
  );
};

export default Treasury;
