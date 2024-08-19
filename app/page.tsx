import { Queries } from '@/api/queries';
import MainSwiper from '@/components/home/MainSwiper';
import Marque from '@/components/home/Marque';
import SmallSwipers from '@/components/home/SmallSwipers';
import Toolbar from '@/components/home/Toolbar';
import Hydrate from '@/utils/HydrateClient';
import getQueryClient from '@/utils/getQueryClient';
import { dehydrate } from '@tanstack/react-query';

const Home = async () => {
  const queryClient = getQueryClient();
  queryClient.prefetchQuery({
    queryKey: ['home'],
    queryFn: () => Queries.getHome(),
  });

  const dehydratedState = dehydrate(queryClient);
  return (
    <main className="main">
      <Hydrate state={dehydratedState}>
        <div className="grid lg:grid-cols-home_custom grid-cols-1">
          {/* <Toolbar /> */}
          <MainSwiper />
          <SmallSwipers />
          <Marque />
        </div>
      </Hydrate>
    </main>
  );
};

export default Home;
