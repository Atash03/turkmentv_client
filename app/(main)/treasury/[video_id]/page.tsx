import VideoList from '@/components/VideoList';
import VideoPlayer from '@/components/VideoPlayer';
import InfoBlock from '@/components/InfoBlock';
import getQueryClient from '@/utils/getQueryClient';
import { Queries } from '@/api/queries';
import Hydrate from '@/utils/HydrateClient';
import { dehydrate, useMutation } from '@tanstack/react-query';
import SectionTitle from '@/components/SectionTitle';

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
  // queryClient.prefetchQuery({
  //   queryKey: ['video', `video:${params.video_id}`],
  //   queryFn: () => Queries.getVideo(params.video_id),
  // });

  // queryClient.prefetchQuery({
  //   queryKey: ['video', 'all'],
  //   queryFn: () => Queries.getVideos(''),
  // });
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
              <InfoBlock video_id={params.video_id} />

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
