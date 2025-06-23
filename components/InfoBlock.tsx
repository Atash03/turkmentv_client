// NextJs components
import Image from "next/image";
import Link from "next/link";
// React query
import { Queries } from "@/api/queries";
// Components
import VideoPlayer from "./VideoPlayer";
import SectionTitle from "./SectionTitle";
// Images and cions
import aydym from "@/public/aydym-com.webp";
import horjun from "@/public/horjun.png";
import belet from "@/public/belet.jpg";

import ReactionsBlock from "./treasury/ReactionsBlock";
import ViewCount from "./view-count";

interface IProps {
  video_id: number;
}

const InfoBlock = async ({ video_id }: IProps) => {
  const {data} = await Queries.getVideo(video_id);

  return (
    <div className="flex gap-6 max-w-[1220px] w-full justify-between h-full">
      <div className="flex flex-col gap-6 w-full h-full">
        <div className="flex justify-between gap-[32px] w-full h-full">
          <div className="w-full flex flex-col gap-6 h-full">
            <div className=" flex flex-col gap-2">
              <SectionTitle title={data.title} />
              <ViewCount video_id={video_id} viewCount={data.view} />
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
                  {data.desc ? (
                    <p className="font-roboto text-lg w-full text-black">
                      {data.desc}
                    </p>
                  ) : null}

                  <ReactionsBlock video_id={video_id} />

                  {data.aydym_com_url ||
                    data.horjun_content_url ||
                    data.belet_url ? (
                    <div className="flex flex-col gap-6">
                      <h2 className="text-2xl font-semibold">
                        Beýleki platformalarda seret:
                      </h2>
                      <div className="flex gap-11 items-center">
                        {data.aydym_com_url ? (
                          <Link
                            href={data.aydym_com_url}
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
                        {data.horjun_content_url ? (
                          <Link
                            href={data.horjun_content_url}
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
                        {data.belet_url ? (
                          <Link
                            href={data.belet_url}
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
