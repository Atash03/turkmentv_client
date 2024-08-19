'use client';
import { v4 } from 'uuid';
import { useQuery } from '@tanstack/react-query';
import { Queries } from '@/api/queries';
import Image from 'next/image';
import Loader from './Loader';
import closeIcon from '@/public/close-outline.svg';
import { useContext, useState } from 'react';
import MaterialsContext from '@/context/MaterialsContext';
import { motion } from 'framer-motion';

interface IProps {
  line: boolean;
}

const Aside = ({ line = true }: IProps) => {
  const { data, error, isFetching } = useQuery({
    queryKey: ['channels'],
    queryFn: () => Queries.getChannels(),
  });
  const { params, setParams } = useContext(MaterialsContext);

  const [channelActive, setChannelActive] = useState(false);
  const channelHandler = (id: number, state: boolean) => {
    setChannelActive(state);
    setParams({ ...params, channel_id: String(id) });
  };

  if (isFetching) return <Loader />;
  if (error) return <h1>{JSON.stringify(error)}</h1>;

  return (
    <aside
      className={`aside flex flex-wrap md:flex-col md:gap-3 gap-3 md:pr-7 h-fit w-fit pb-5 sticky top-5 justify-between  ${
        line &&
        'md:border md:border-t-0 md:border-l-0 md:border-b-0 md:border-r-gray-400 md:transition-all md:dark:border-r-black'
      }`}>
      {data
        ? data.data.map((image) => (
            <motion.div
              onClick={() => channelHandler(image.id, true)}
              className="aside-img w-14 h-14 rounded-full overflow-hidden border  bg-white border-gray-500 cursor-pointer"
              key={v4()}
              initial={{ border: 'solid 1px rgb(107, 114, 128)' }}
              animate={
                params.channel_id === String(image.id) ? { border: 'solid 3px #FFAB48' } : {}
              }>
              <Image
                src={image.image}
                alt={image.name}
                unoptimized
                unselectable="off"
                className="h-full w-full object-contain rounded-full"
                width={44}
                height={44}
              />
            </motion.div>
          ))
        : null}
      {channelActive && (
        <motion.div
          onClick={() => channelHandler(0, false)}
          className="aside-img w-14 h-14 rounded-full overflow-hidden border  bg-white border-gray-500 cursor-pointer p-2"
          key={v4()}
          initial={{ border: 'solid 1px rgb(107, 114, 128)' }}
          animate={params.channel_id === String(0) ? { border: 'solid 3px #FFAB48' } : {}}>
          <Image
            src={closeIcon}
            alt="close"
            unoptimized
            unselectable="off"
            className="h-full w-full object-contain rounded-full"
            width={44}
            height={44}
          />
        </motion.div>
      )}
    </aside>
  );
};

export default Aside;
// export default Aside;
