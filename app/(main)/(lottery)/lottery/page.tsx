import Image from 'next/image';
import React from 'react';

const page = () => {
  return (
    <div className="flex flex-col gap-[128px]">
      <section className="py-[64px]">
        <div className="container">
          <div className="flex flex-col gap-[32px]">
            <h1 className="font-display-1-regular text-center">Bije</h1>
            <div>
              <Image
                src="/banner-lottery.jpg"
                width={1416}
                height={177}
                alt="banner"
                className="rounded-[12px]"
              />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div></div>
        </div>
      </section>
    </div>
  );
};

export default page;
