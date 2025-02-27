import { getPlaylistById } from "@/api/queries";
import PlaylistVideos from "@/components/playlist";

interface IParams {
  params: {
    id: string;
  };
}

const Page = async ({ params }: IParams) => {
  const { id } = await params;

  const videos = await getPlaylistById(id);

  return (
    <div className="video-item mt-6">
      <div className="container">
        <PlaylistVideos id={id} data={videos} />
      </div>
    </div>
  );
};

export default Page;
