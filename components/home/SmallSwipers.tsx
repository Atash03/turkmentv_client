import SmallSwiper from './SmallSwiperVideos';
import LinkBlock from './LinkBlock';
import { HomeModel } from '@/models/home.model';
import { Queries } from '@/api/queries';
import { useQuery } from '@tanstack/react-query';
import Loader from '../Loader';
import SmallSwiperNews from './SmallSwiperNews';
import SmallSwiperVideos from './SmallSwiperVideos';
import SmallSwiperAdvert from './SmallSwiperAdvert';

const SmallSwipers = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-rows-full3 lg:h-home h-max overflow-hidden">
      <LinkBlock href="/advert" content="Mahabat" color="#5461F0" />
      <LinkBlock href="/live" content="Göni Ýaýlym" color="#EB4765" />
      {/* Is not  yet in API, static for now */}
      <SmallSwiperNews />
      <SmallSwiperVideos />
      <SmallSwiperAdvert sliderNumber={3} />
      <SmallSwiperAdvert sliderNumber={4} />

      {/* <SmallSwiper data={data} /> */}
    </div>
  );
};

export default SmallSwipers;
