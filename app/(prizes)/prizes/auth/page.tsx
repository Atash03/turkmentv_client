import SmsForm from '@/components/prizes/SmsForm';
import React from 'react';

const page = () => {
  return (
    <div className="container">
      <div className="mt-[64px] mb-[128px] w-full">
        <div className="flex justify-center items-center min-h-[50vh]">
          <SmsForm />
        </div>
      </div>
    </div>
  );
};

export default page;
