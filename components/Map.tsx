import Image from 'next/image';

import map from '@/public/mahabat-map.png';

const Map = () => {
  return (
    <div className="w-full h-full border-2 border-black rounded-five p-4">
      <Image
        src={map}
        width={600}
        height={200}
        unoptimized
        unselectable="off"
        alt="map"
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export default Map;
