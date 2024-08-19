'use client';

import { Queries } from '@/api/queries';
import { useQuery } from '@tanstack/react-query';
import Marquee from 'react-fast-marquee';
import Loader from '../Loader';
import { v4 } from 'uuid';
import channels from '@/channels';

const Marque = () => {
  const { data, isFetching, error } = useQuery({
    queryKey: ['marquee'],
    queryFn: () => Queries.getMarquee(),
  });

  if (isFetching) return <Loader height={'100%'} />;
  if (error) return <h1>{JSON.stringify(error)}</h1>;

  return data?.data ? (
    <div className="flex w-full items-center z-50 lg:fixed lg:bottom-0 lg:left-0">
      {data.data.length === 0 ? null : (
        <div className="relative w-full flex">
          <div className="w-fit absolute top-[50%] translate-y-[-50%] left-0 bg-mred font-roboto text-white font-bold text-base z-20">
            <span className=" py-1 px-4 block">Gysga Habarlar</span>
          </div>
          <Marquee
            direction="left"
            loop={0}
            speed={30}
            pauseOnHover
            className="w-full flex gap-4 bg-[#BBBB] z-10 lg:my-[11px]"
            gradient={false}>
            {data?.data.map((item) => (
              <div className="mr-10 py-1" key={v4()}>
                {item.content}
              </div>
            ))}
          </Marquee>
        </div>
      )}
    </div>
  ) : null;
};

export default Marque;
