'use client';
import Image from 'next/image';

import Link from 'next/link';
import ReactPlayer from 'react-player';
import { v4 } from 'uuid';
import { Queries } from '@/api/queries';
import Loader from '@/components/Loader';
import { useQuery } from '@tanstack/react-query';
import channels from '@/channels';
import { useLocalStorage } from 'usehooks-ts';
import { ParseString } from '@/utils/parseString';
import Banner from '@/components/live/Banner';

const page = () => {
  const [activeChannel, setActiveChanell] = useLocalStorage('activeChannel', {
    channelName: 'Arkadag',
    channelNumber: 1,
  });

  const { data, isFetching, error } = useQuery({
    queryKey: ['channel_description', activeChannel],
    queryFn: () => Queries.getLiveDescription(activeChannel.channelNumber),
  });

  // if (isFetching) return <Loader height={'100%'} />;
  // if (error) return <h1>{JSON.stringify(error)}</h1>;

  return (
    <div className="live">
      <div className="container w-full">
        <div className="live-wrapper wrapper flex gap-8 pt-8 pb-14">
          <div className="live-main flex flex-col mb-14 w-full h-fit ">
            <div className="live-player relative md:h-[550px] sm:h-full h-[250px] w-full border-black border-2">
              {channels.map((channel) =>
                channel.name === activeChannel.channelName ? (
                  <ReactPlayer
                    height={'100%'}
                    width={'100%'}
                    controls
                    url={channel.source}
                    playing={true}
                    key={v4()}
                  />
                ) : null,
              )}
            </div>

            <div className="bg-black flex flex-col">
              <div className="live-cahnnels flex flex-wrap md:justify-between gap-6 p-5">
                {channels
                  ? channels.map((channel) => {
                      return (
                        <Link
                          key={channel.id}
                          onClick={() =>
                            setActiveChanell({
                              channelName: channel.name,
                              channelNumber: channel.channel,
                            })
                          }
                          className={`channels-img  flex flex-col justify-center items-center gap-2 hover:brightness-100 transition-all  ${
                            channel.name === activeChannel.channelName
                              ? 'brightness-100'
                              : 'brightness-50'
                          }`}
                          href={''}>
                          <div className="relative py-3 px-3 md:w-20 md:h-20 w-16 h-16 rounded-full bg-white overflow-hidden flex flex-col items-center justify-center">
                            <Image
                              src={channel.img}
                              unoptimized
                              alt={channel.name}
                              fill
                              priority
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <h3 className="text-white md:text-base text-xs">{channel.name}</h3>
                        </Link>
                      );
                    })
                  : null}
              </div>

              {data?.data.length ? (
                <div className="flex items-center gap-10 pt-5 w-full text-white border-t-[1px] border-[#7f7f7f] p-5">
                  {/* <h3 className="font-bold text-base">
                    {`${ParseString.parseTime(data.data[0].start)} - ${ParseString.parseTime(
                      data.data[0].end,
                    )}`}
                  </h3> */}
                  <h4 className="text-base">{data.data[0].content}</h4>
                </div>
              ) : null}
            </div>
          </div>

          <Banner />
        </div>
      </div>
    </div>
  );
};

export default page;
