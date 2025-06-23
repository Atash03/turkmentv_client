import VideoList from '@/components/VideoList';
import VideoPlayer from '@/components/VideoPlayer';
import InfoBlock from '@/components/InfoBlock';
import getQueryClient from '@/utils/getQueryClient';
import { Queries } from '@/api/queries';
import Hydrate from '@/utils/HydrateClient';
import { dehydrate, useMutation } from '@tanstack/react-query';
import SectionTitle from '@/components/SectionTitle';
import { Suspense } from 'react';
import Loader from '@/components/Loader';

interface IParams {
  params: {
    video_id: number;
    category_id: string;
    content_url: string;
    banner_url: string;
  };
}

const VideoItem = async ({ params }: IParams) => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['video', `video:${params.video_id}`],
    queryFn: () => Queries.getVideo(params.video_id),
  });
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['video', 'all'],
    queryFn: () => Queries.getVideos(''),
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
    <div className="video-item mt-6">
      <div className="container">
        <Hydrate state={dehydratedState}>
          <div className="video-item-inner">
            <div className="video-item-wrapper flex flex-col gap-10  relative pb-14">
              <Suspense fallback={
                <div className="w-full h-[500px] sm:h-[667px] md:h-[600px] lg:h-[700px] flex items-center justify-center">
                  <Loader height={700} />
                </div>
              }>
                <InfoBlock video_id={params.video_id} />
              </Suspense>

              <div className="video-item-inner w-full flex flex-col gap-4">
                <SectionTitle title={'Beylekiler'} />
                <VideoList isSlides />
              </div>
            </div>
          </div>
        </Hydrate>
      </div>
    </div>
  );
};

export default VideoItem;
