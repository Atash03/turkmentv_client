"use client";
// NextJs components
import Image from "next/image";
import Link from "next/link";
// React query
import { useQuery } from "@tanstack/react-query";
import { Queries } from "@/api/queries";
// Components
import Loader from "./Loader";
import VideoPlayer from "./VideoPlayer";
import SectionTitle from "./SectionTitle";
// Images and cions
import { SlEye } from "react-icons/sl";
import aydym from "@/public/aydym-com.webp";
import horjun from "@/public/horjun.png";
import belet from "@/public/belet.jpg";

import ReactionsBlock from "./treasury/ReactionsBlock";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

interface IProps {
  video_id: number;
}

const InfoBlock = ({ video_id }: IProps) => {
  const { data, isFetching, error } = useQuery({
    queryKey: ["video", `video:${video_id}`],
    queryFn: () => Queries.getVideo(video_id),
  });
  const [view, setView] = useState(data?.data?.view || 0);

  const addView = useCallback(async () => {
    const materials = localStorage.getItem('MHB_MATERIALS_ID');
    if (materials) {
      const materialsArray = materials.split(',');
      if (!materialsArray.includes(video_id.toString())) {
        const res = await axios.post(`https://turkmentv.gov.tm/v2/api/material/${video_id}/views/increment`);
        if (res.status === 200) {
          materialsArray.push(video_id.toString());
          setView(view + 1);
        }
      }
      localStorage.setItem('MHB_MATERIALS_ID', materialsArray.join(','));
    } else {
      const res = await axios.post(`https://turkmentv.gov.tm/v2/api/material/${video_id}/views/increment`);
      if (res.status === 200) {
        localStorage.setItem('MHB_MATERIALS_ID', [video_id.toString()].join(','));
        setView(view + 1);
      }
    }

  }, [video_id])

  useEffect(() => {
    addView();
  }, []);


  if (isFetching)
    return (
      <div className="w-full h-[500px] sm:h-[667px] md:h-[600px] l flex items-center justify-center">
        <Loader height={700} />
      </div>
    );
  if (error) return <h1>{JSON.stringify(error)}</h1>;

  return (
    <div className="flex gap-6 max-w-[1220px] w-full justify-between h-full">
      <div className="flex flex-col gap-6 w-full h-full">
        <div className="flex justify-between gap-[32px] w-full h-full">
          <div className="w-full flex flex-col gap-6 h-full">
            <div className=" flex flex-col gap-2">
              <SectionTitle title={data!.data.title} />
              <div className="flex gap-2 items-center">
                <SlEye
                  style={{
                    transition: "150ms all cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                  width={30}
                  height={18}
                  className="w-[30px] h-[18px]"
                />
                <span className="font-roboto text-lg font-normal text-[#494949] transition-all dark:text-white">
                  {view}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-[40px] h-full  w-full">
              <div className="flex gap-[40px] md:flex-row flex-col  h-full  w-full">
                <div>
                  <VideoPlayer
                    video_id={video_id}
                    maxHeight="700px"
                    maxWidth="100%"
                  />
                </div>

                <div className="flex flex-col gap-6">
                  {data?.data.desc ? (
                    <p className="font-roboto text-lg w-full text-black">
                      {data!.data.desc}
                    </p>
                  ) : null}

                  <ReactionsBlock video_id={video_id} />

                  {data?.data.aydym_com_url ||
                    data?.data.horjun_content_url ||
                    data?.data.belet_url ? (
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
                            href={data.data.belet_url}
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

export default InfoBlock;
