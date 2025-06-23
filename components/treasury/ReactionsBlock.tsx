import { Queries } from '@/api/queries';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { BiSolidLike, BiLike, BiSolidDislike, BiDislike } from 'react-icons/bi';
import { useLocalStorage } from 'usehooks-ts';

interface IProps {
  video_id: number;
}

const ReactionsBlock = ({ video_id }: IProps) => {
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

  const { data, error } = useQuery({
    queryKey: ['video', video_id, mutationLikes, mutationDisLikes],
    queryFn: () => Queries.getVideo(video_id),
    keepPreviousData: true,
  });

  if (error) return <h1>{JSON.stringify(error)}</h1>;

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

  return (
    <div className="flex items-center  bg-slate-50  rounded-full overflow-hidden w-fit">
      <div
        className="flex items-center gap-4 cursor-pointer py-4 px-6 hover:bg-slate-100"
        onClick={() => onLikeHandler()}>
        <button>
          {isLikedId.includes(video_id) ? <BiSolidLike size={30} /> : <BiLike size={30} />}
        </button>
        <span className="block text-xl ">{data?.data.likes}</span>
      </div>
      <div
        className="flex items-center gap-4 cursor-pointer py-4 px-6 hover:bg-slate-100"
        onClick={() => onDisLikeHandler()}>
        <button>
          {isDisLikedId.includes(video_id) ? <BiSolidDislike size={30} /> : <BiDislike size={30} />}
        </button>
        <span className="block text-xl ">{data?.data.dislikes}</span>
      </div>
    </div>
  );
};

export default ReactionsBlock;
