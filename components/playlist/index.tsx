"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import aydym from "@/public/aydym-com.webp";
import horjun from "@/public/horjun.png";
import belet from "@/public/belet.jpg";
import { v4 } from "uuid";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Queries } from "@/api/queries";
import Loader from "../Loader";
import { Button } from "../ui/button";

const PlaylistVideos = ({ id, data }: { id: string; data: any }) => {
  const searchParams = useSearchParams();
  const videoId = searchParams.get("video");
  const nextVideo = (Number(videoId) + 1) % data?.data?.length;

  return (
    <div className="video-item-inner">
      <div className="video-item-wrapper flex flex-col md:flex-row md:items-start items-center gap-10 relative pb-14 w-full">
        <InfoBlock
          video_id={data?.data[Number(videoId)].id}
          nextId={nextVideo}
        />

        <div className="video-item-inner flex flex-col gap-4 grow-0">
          {data?.data.map(
            (item: any, i: number) =>
              i !== Number(videoId) && (
                <Link href={`/playlist/${id}?video=${i}`} key={v4()}>
                  <VideoItem
                    id={item.id}
                    img={item.banner_url}
                    title={item.title}
                  />
                </Link>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaylistVideos;

const InfoBlock = ({
  video_id,
  nextId,
}: {
  video_id: number;
  nextId: number;
}) => {
  const { data, isFetching, error } = useQuery({
    queryKey: ["video", video_id],
    queryFn: () => Queries.getVideo(video_id),
  });
  const router = useRouter();
  const pathName = usePathname();

  if (isFetching)
    return (
      <div className="w-full h-[500px] sm:h-[667px] md:h-[600px] l flex items-center justify-center">
        <Loader height={700} />
      </div>
    );
  if (error) return <h1>{JSON.stringify(error)}</h1>;

  return (
    <div className="flex gap-6 flex-1 w-full justify-between h-full">
      <div className="flex flex-col gap-6 w-full h-full">
        <div className="flex justify-between gap-[32px] w-full h-full">
          <div className="w-full flex flex-col gap-6 h-full">
            <div className="flex flex-col gap-[40px] h-full  w-full">
              <div className="flex gap-[40px] flex-col  h-full  w-full">
                <div className="w-full">
                  <VideoPlayer content={data?.data} nextId={nextId} />
                </div>

                <div className="flex flex-col gap-6">
                  {data?.data?.desc ? (
                    <p className="font-roboto text-lg w-full text-black">
                      {data?.data.desc}
                    </p>
                  ) : null}
                  <Button
                    onClick={() => router.push(`${pathName}?video=${nextId}`)}
                    className="w-fit bg-blue-500 text-white flex gap-[5px] items-center"
                  >
                    <span>Indiki</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="lucide lucide-play"
                    >
                      <polygon points="6 3 20 12 6 21 6 3" />
                    </svg>
                  </Button>

                  {data?.data?.aydym_com_url ||
                  data?.data?.horjun_content_url ||
                  data?.data?.belet_url ? (
                    <div className="flex flex-col gap-6">
                      <h2 className="text-2xl font-semibold">
                        Beýleki platformalarda seret:
                      </h2>
                      <div className="flex gap-11 items-center">
                        {data?.data.aydym_com_url ? (
                          <Link
                            href={data?.data.aydym_com_url}
                            target="_blank"
                            className="flex flex-col items-center justify-center gap-2"
                          >
                            <div className="relative h-16 w-16 flex items-center justify-center overflow-hidden border-[#00AEFF] border-[1.5px] p-2 rounded-full">
                              <Image
                                src={aydym}
                                alt="Aydym.com"
                                className="rounded-full"
                              />
                            </div>
                            <h3>Aydym.com</h3>
                          </Link>
                        ) : null}
                        {data?.data.horjun_content_url ? (
                          <Link
                            href={data?.data.horjun_content_url}
                            target="_blank"
                            className="flex flex-col items-center justify-center gap-2"
                          >
                            <div className="relative h-16 w-16 flex items-center justify-center overflow-hidden border-[#00AEFF] border-[1.5px] p-2 rounded-full">
                              <Image
                                src={horjun}
                                alt="HorjunTv"
                                className="rounded-full"
                              />
                            </div>
                            <h3>HorjunTv</h3>
                          </Link>
                        ) : null}
                        {data?.data.belet_url ? (
                          <Link
                            href={data?.data.belet_url}
                            target="_blank"
                            className="flex flex-col items-center justify-center gap-2"
                          >
                            <div className="relative h-16 w-16 flex items-center justify-center overflow-hidden border-[#00AEFF] border-[1.5px] p-2 rounded-full">
                              <Image
                                src={belet}
                                alt="BeletTv"
                                className="rounded-full"
                              />
                            </div>
                            <h3>BeletFilm</h3>
                          </Link>
                        ) : null}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const VideoPlayer = ({ content, nextId }: { content: any; nextId: number }) => {
  const [hasWindow, setHasWindow] = useState<boolean>(false);
  const [data, setData] = useState<any>(content);
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
  }, []);

  useEffect(() => {
    setData(content);
  }, [content]);

  return (
    <div className="w-full h-full">
      {hasWindow ? (
        data?.content_url.endsWith(".mp4") ? (
          <div className="lg:w-full md:w-[550px] w-full h-[200px] sm:h-[250px] md:h-[350px] lg:h-[620px]">
            <video
              controls
              controlsList={data?.is_downloadable === 0 ? "nodownload" : ""} // Conditionally enable/disable download
              poster={data?.banner_url}
              playsInline
              onEnded={() => router.push(`${pathName}?video=${nextId}`)}
            >
              <source src={data?.video_stream_url} type="video/mp4" />
            </video>
          </div>
        ) : (
          <div className="flex flex-col gap-4 h-fit">
            <div className="relative w-full h-[200px] sm:h-[400px] md:h-[420px]">
              {data?.banner_url ? (
                <Image
                  src={data.banner_url}
                  fill
                  alt={"image"}
                  className="object-cover"
                />
              ) : null}
            </div>
            <audio
              controls
              controlsList={data?.is_downloadable === 0 ? "nodownload" : ""} // Conditionally enable/disable download
              className="w-full rounded bg-white"
              onEnded={() => router.push(`${pathName}?video=${nextId}`)}
            >
              <source src={data?.content_url} />
            </audio>
          </div>
        )
      ) : null}
    </div>
  );
};

const VideoItem = ({
  img,
  title,
  id,
}: {
  img: any;
  title: string;
  id: number;
}) => {
  return (
    <div className="video-list-item flex flex-col gap-2 lg:w-[250px] md:w-[200px] sm:w-[200px] w-[300px] ">
      {img ? (
        <>
          <div className="relative sm:h-[150px] h-[200px] w-full overflow-hidden rounded-five">
            <Image
              src={img}
              alt={title}
              unoptimized
              unselectable="off"
              className="top-0 left-0 w-full h-full object-cover z-0 absolute pointer-events-none"
              width={280}
              height={160}
            />
            <Image
              src={"/play.svg"}
              alt={"play icon"}
              unoptimized
              unselectable="off"
              className="top-[50%] left-[50%] w-[52px] h-[52px] object-cover z-10 -translate-x-[50%] -translate-y-[50%] absolute"
              width={52}
              height={52}
            />
          </div>
        </>
      ) : null}

      {/* {premium ? <Premium /> : null} */}
      <div className="flex gap-3 justify-start items-center">
        <div className="flex flex-col">
          <h3 className="clamped font-mw_sans font-bold text-lg text-black transition-all dark:text-white overflow-hidden w-full">
            {title}
          </h3>
          {/* <span className="font-roboto text-lg font-normal text-black transition-all dark:text-white">{`${views} Views`}</span> */}
        </div>
      </div>
    </div>
  );
};
