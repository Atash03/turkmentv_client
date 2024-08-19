'use client';
// NextJs components
import Image from 'next/image';
import Link from 'next/link';
// React query
import { useMutation, useQuery } from '@tanstack/react-query';
import { Queries } from '@/api/queries';
// Components
import Loader from './Loader';
import VideoPlayer from './VideoPlayer';
import SectionTitle from './SectionTitle';
// Images and cions
import { BiLike, BiSolidDislike, BiSolidLike, BiDislike } from 'react-icons/bi';
import { SlEye } from 'react-icons/sl';
import aydym from '@/public/aydym-com.webp';
import horjun from '@/public/horjun.png';
import belet from '@/public/belet.jpg';
import { useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import axios from 'axios';

interface IProps {
  video_id: number;
}

const InfoBlock = ({ video_id }: IProps) => {
  const [isLikedId, setIsLikedId] = useLocalStorage<number[]>('isLiked', []) || [];
  const [isDisLikedId, setIsDisLikedId] = useLocalStorage<number[]>('isDisliked', []) || [];

  async function addLikes() {
    return axios.post(`https://turkmentv.gov.tm/v2/api/material/${video_id}/likes`, {
      like: isLikedId.includes(video_id) ? true : false,
    });
  }
  async function addDisLikes() {
    return axios.post(`https://turkmentv.gov.tm/v2/api/material/${video_id}/dislikes`, {
      dislike: isDisLikedId.includes(video_id) ? true : false,
    });
  }

  const mutationLikes = useMutation(() => addLikes());
  const mutationDisLikes = useMutation(() => addDisLikes());

  const onLikeHandler = () => {
    if (isLikedId.includes(video_id)) {
      setIsLikedId(isLikedId.filter((id) => id !== video_id));
    } else {
      if (isDisLikedId.includes(video_id)) {
        setIsDisLikedId(isDisLikedId.filter((id) => id !== video_id));
        mutationDisLikes.mutate();
      }
      setIsLikedId([...isLikedId, video_id]);
    }

    mutationLikes.mutate();
  };

  const onDisLikeHandler = () => {
    if (isDisLikedId.includes(video_id)) {
      setIsDisLikedId(isDisLikedId.filter((id) => id !== video_id));
    } else {
      if (isLikedId.includes(video_id)) {
        setIsLikedId(isLikedId.filter((id) => id !== video_id));
        mutationLikes.mutate();
      }
      setIsDisLikedId([...isDisLikedId, video_id]);
    }

    mutationDisLikes.mutate();
  };

  const { data, isFetching, error } = useQuery({
    queryKey: ['video', video_id, mutationLikes, mutationDisLikes],
    queryFn: () => Queries.getVideo(video_id),
  });

  if (isFetching) return <Loader height={200} />;
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
                  style={{ transition: '150ms all cubic-bezier(0.4, 0, 0.2, 1)' }}
                  width={30}
                  height={18}
                  className="w-[30px] h-[18px]"
                />
                <span className="font-roboto text-lg font-normal text-[#494949] transition-all dark:text-white">
                  {data!.data.view}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-[40px] h-full  w-full">
              <div className="flex gap-[40px] md:flex-row flex-col  h-full  w-full">
                <div>
                  <VideoPlayer video_id={video_id} maxHeight="700px" maxWidth="100%" />
                </div>

                <div className="flex flex-col gap-6">
                  {data?.data.desc ? (
                    <p className="font-roboto text-lg w-full text-black">{data!.data.desc}</p>
                  ) : null}
                  <div className="flex items-center  bg-slate-50  rounded-full overflow-hidden w-fit">
                    <div
                      className="flex items-center gap-4 cursor-pointer py-4 px-6 hover:bg-slate-100"
                      onClick={() => onLikeHandler()}>
                      <button>
                        {isLikedId.includes(video_id) ? (
                          <BiSolidLike size={30} />
                        ) : (
                          <BiLike size={30} />
                        )}
                      </button>
                      <span className="block text-xl ">{data?.data.likes}</span>
                    </div>
                    <div
                      className="flex items-center gap-4 cursor-pointer py-4 px-6 hover:bg-slate-100"
                      onClick={() => onDisLikeHandler()}>
                      <button>
                        {isDisLikedId.includes(video_id) ? (
                          <BiSolidDislike size={30} />
                        ) : (
                          <BiDislike size={30} />
                        )}
                      </button>
                      <span className="block text-xl ">{data?.data.dislikes}</span>
                    </div>
                  </div>
                  {data?.data.aydym_com_url ||
                  data?.data.horjun_content_url ||
                  data?.data.belet_url ? (
                    <div className="flex flex-col gap-6">
                      <h2 className="text-2xl font-semibold">Beýleki platformalarda seret:</h2>
                      <div className="flex gap-11 items-center">
                        {data?.data.aydym_com_url ? (
                          <Link
                            href={data?.data.aydym_com_url}
                            target="_blank"
                            className="flex flex-col items-center justify-center gap-2">
                            <div className="relative h-16 w-16 flex items-center justify-center overflow-hidden border-[#00AEFF] border-[1.5px] p-2 rounded-full">
                              <Image src={aydym} alt="Aydym.com" className="rounded-full" />
                            </div>
                            <h3>Aydym.com</h3>
                          </Link>
                        ) : null}
                        {data?.data.horjun_content_url ? (
                          <Link
                            href={data?.data.horjun_content_url}
                            target="_blank"
                            className="flex flex-col items-center justify-center gap-2">
                            <div className="relative h-16 w-16 flex items-center justify-center overflow-hidden border-[#00AEFF] border-[1.5px] p-2 rounded-full">
                              <Image src={horjun} alt="HorjunTv" className="rounded-full" />
                            </div>
                            <h3>HorjunTv</h3>
                          </Link>
                        ) : null}
                        {data?.data.belet_url ? (
                          <Link
                            href={data.data.belet_url}
                            target="_blank"
                            className="flex flex-col items-center justify-center gap-2">
                            <div className="relative h-16 w-16 flex items-center justify-center overflow-hidden border-[#00AEFF] border-[1.5px] p-2 rounded-full">
                              <Image src={belet} alt="BeletTv" className="rounded-full" />
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
