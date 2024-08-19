'use client';
import { Queries } from '@/api/queries';
import Loader from '@/components/Loader';
import { useContext, useEffect } from 'react';
import Option from '../Option';
import { v4 } from 'uuid';
import Button from '@/components/Button';
import StepsContext from '@/context/StepsContext';
import PresenceAnimator from '@/components/hox/PresenceAnimator';

const WindowOne = () => {
  const ctx = useContext(StepsContext);
  const { stepContext, propertyContext, data } = ctx;
  const { properties } = data;

  useEffect(() => {
    Queries.getProperties().then((data) => properties.setProperties(data));
  }, []);

  if (!properties.properties) return <Loader height={200} />;
  return (
    <PresenceAnimator
      initial={{ x: '100%', opacity: '0%' }}
      animate={{ x: '0%', opacity: '100%', transition: { duration: 0.5 } }}
      exit={{ x: '-100%', opacity: '0%', transition: { duration: 0.5 } }}>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-[24px] mt-[36px]">
          <h2 className="font-mw_sans font-bold md:text-[22px] text-lg leading-[24px]">
            Eýeçiligiň görnüşini saýlaň!
          </h2>
          <div className="flex md:flex-row flex-col gap-[16px]">
            {properties.properties.data.map((option) => (
              <Option
                onClick={(id) => propertyContext.setProperty(id)}
                activeId={propertyContext.property}
                id={option.id}
                title={option.title}
                description={option.description}
                key={v4()}
              />
            ))}
          </div>
        </div>
        <Button
          onClick={() => stepContext.setStep(2)}
          name="Indiki"
          type="button"
          disabled={!propertyContext.property ? true : false}
        />
      </div>
    </PresenceAnimator>
  );
};

export default WindowOne;
