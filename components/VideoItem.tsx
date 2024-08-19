import { IVideo } from '@/typings/video.type';
import Image from 'next/image';
import Link from 'next/link';

const VideoItem = ({ img, title, id, slides }: IVideo) => {
  return (
    <Link
      href={`${slides ? '' : 'treasury/'}${id}`}
      className="video-list-item flex flex-col gap-2 lg:w-[250px] md:w-[200px] sm:w-[200px] w-[300px] ">
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
              src={'/play.svg'}
              alt={'play icon'}
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
    </Link>
  );
};

export default VideoItem;
