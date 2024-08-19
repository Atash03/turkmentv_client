import AdvertWindow from '@/components/advert/AdvertWindow';
import StepsProvider from '@/providers/StepsProvider';

const Advert = () => {
  return (
    <div className="advert-add">
      <div className="container">
        <div className="inner flex justify-center w-full">
          <StepsProvider>
            <AdvertWindow />
          </StepsProvider>
        </div>
      </div>
    </div>
  );
};

export default Advert;
