"use client";
import { Queries } from "@/api/queries";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import Loader from "./Loader";
import Image from "next/image";
import axios from "axios";

interface IProps {
  maxWidth?: string;
  maxHeight?: string;
  video_id: number;
}

const VideoPlayer = ({ maxHeight, maxWidth, video_id }: IProps) => {
  const [hasWindow, setHasWindow] = useState<boolean>(false);
  const [hasStartedPlaying, setHasStartedPlaying] = useState<boolean>(false);
  const [canDownload, setCanDownload] = useState<boolean>(false); // State to store canDownload

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
  }, []);

  const { data, isFetching, error } = useQuery({
    queryKey: ["video", `video:${video_id}`],
    queryFn: async () => {
      const response = await Queries.getVideo(video_id);
      // setCanDownload(response.data.canDownload); // Set canDownload from API
      return response;
    },
  });

  async function addViews() {
    return axios.post(
      `https://turkmentv.gov.tm/v2/api/material/${video_id}/views/increment`
    );
  }

  const mutation = useMutation(() => addViews());

  const onPlayHandler = () => {
    if (!hasStartedPlaying) {
      mutation.mutate();
      setHasStartedPlaying(true);
    }
  };

  if (isFetching) return <Loader height={700} />;
  if (error) return <h1>{JSON.stringify(error)}</h1>;

  return (
    <div className="w-full h-full">
      {hasWindow ? (
        data?.data.content_url.endsWith(".mp4") ? (
          <div className="lg:w-[700px] md:w-[550px] w-full h-[200px] sm:h-[250px] md:h-[350px] lg:h-[420px]">
            <video
              controls
              controlsList={canDownload ? "" : "nodownload"} // Conditionally enable/disable download
              src={data!.data.video_stream_url}
              poster={data?.data.banner_url}
              playsInline
              itemType="video/mp4"
              onPlay={() => onPlayHandler()}
            ></video>
          </div>
        ) : (
          <div className="flex flex-col gap-4 h-fit">
            <div className="relative lg:w-[700px] md:w-[550px] w-full h-[200px] sm:h-[400px]  md:h-[420px]">
              {data?.data.banner_url ? (
                <Image
                  src={data?.data.banner_url}
                  width={700}
                  height={420}
                  alt={"image"}
                />
              ) : null}
            </div>
            <audio
              controls
              controlsList={canDownload ? "" : "nodownload"} // Conditionally enable/disable download
              className="w-full rounded bg-white"
              onPlay={() => onPlayHandler()}
            >
              <source src={data?.data.content_url} />
            </audio>
          </div>
        )
      ) : null}
    </div>
  );
};

export default VideoPlayer;
