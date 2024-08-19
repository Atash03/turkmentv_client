'use client';
import { Queries } from '@/api/queries';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import Loader from './Loader';
import Image from 'next/image';
import axios from 'axios';
interface IProps {
  maxWidth?: string;
  maxHeight?: string;
  video_id: number;
}

const VideoPlayer = ({ maxHeight, maxWidth, video_id }: IProps) => {
  const [hasWindow, setHasWindow] = useState<boolean>(false);
  const [hasStartedPlaying, setHasStartedPlaying] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHasWindow(true);
    }
  }, []);

  const { data, isFetching, error } = useQuery({
    queryKey: ['video', `video:${video_id}`],
    queryFn: () => Queries.getVideo(video_id),
  });

  async function addViews() {
    return axios.post(`https://turkmentv.gov.tm/v2/api/material/${video_id}/views/increment`);
  }

  const mutation = useMutation(() => addViews());

  const onPlayHandler = () => {
    // Check if the video has not started playing before
    if (!hasStartedPlaying) {
      // Send a POST request to the server
      mutation.mutate();

      // Update the state to indicate that the video has started playing
      setHasStartedPlaying(true);
    }
  };

  if (isFetching) return <Loader height={700} />;
  if (error) return <h1>{JSON.stringify(error)}</h1>;

  return (
    <div className="w-full h-full ">
      {hasWindow ? (
        data?.data.content_url.endsWith('.mp4') ? (
          <div className="lg:w-[700px] md:w-[550px] w-full h-[200px] sm:h-[250px] md:h-[350px] lg:h-[420px]">
            {/* <ReactPlayer
              height={'100%'}
              width={'100%'}
              controls
              playsInline
              playing={true}
              light={data?.data.banner_url}
              url={data!.data.video_stream_url}
              onStart={() => onPlayHandler()}
            /> */}
            <video
              controls
              src={data!.data.video_stream_url}
              poster={data?.data.banner_url}
              playsInline
              itemType="video/mp4"
              onPlay={() => onPlayHandler()}></video>
          </div>
        ) : (
          <div className="flex flex-col gap-4 h-fit">
            <div className="relative lg:w-[700px] md:w-[550px] w-full h-[200px] sm:h-[400px]  md:h-[420px]">
              {data?.data.banner_url ? (
                <Image src={data?.data.banner_url} fill alt={'image'} />
              ) : null}
            </div>
            <audio controls className="w-full rounded bg-white" onLoadStart={() => onPlayHandler()}>
              <source src={data?.data.content_url} />
            </audio>
          </div>
        )
      ) : null}
    </div>
  );
};

export default VideoPlayer;
