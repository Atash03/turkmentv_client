'use client';

import { Queries } from '@/api/queries';
import Loader from '@/components/Loader';
import { useContext, useEffect, useState } from 'react';
import Option from '../Option';
import { v4 } from 'uuid';
import Button from '@/components/Button';
import StepsContext from '@/context/StepsContext';
import PresenceAnimator from '@/components/hox/PresenceAnimator';
import { PlansModel } from '@/models/plans.model';
// import PlanOne from "../plans/PlanOne";
// import PlanTwo from "../plans/PlanTwo";
// import PlanThree from "../plans/PlanThree";
// import PlanFour from "../plans/PlanFour";
import { AnimatePresence } from 'framer-motion';
import Plan from '../plans/Plan';

const WindowTwo = () => {
  const planTypes = [
    {
      id: 1,
      name: 'TV',
      property: 'on_tv',
    },
    {
      id: 2,
      name: 'Radio',
      property: 'on_radio',
    },
    {
      id: 3,
      name: 'Air ticket flyer',
      property: 'on_sub',
    },
    {
      id: 4,
      name: 'Website',
      property: 'on_web',
    },
    {
      id: 5,
      name: 'Outdoor LED',
      property: 'on_outside_monitors',
    },
  ];
  const ctx = useContext(StepsContext);
  const { stepContext, propertyContext, data } = ctx;
  const { plans } = data;
  const { plan, setPlan } = useContext(StepsContext).plansContext;

  useEffect(() => {
    Queries.getPlans(propertyContext.property!).then((data) => plans.setPlans(data));
  }, [propertyContext.property]);

  useEffect(() => {}, []);

  // console.log('Plans', plans);
  // console.log('Plan', plan);

  if (!plans.plans) return <Loader height={200} />;
  return (
    <PresenceAnimator
      initial={{ x: '100%', opacity: '0%' }}
      animate={{
        x: '0%',
        opacity: '100%',
        transition: { duration: 0.5, delay: 0.6 },
      }}
      exit={{ x: '-100%', opacity: '0%', transition: { duration: 0.5 } }}>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-[24px] mt-[36px]">
          <h2 className="font-mw_sans font-bold md:text-[22px] text-lg leading-[24px]">
            Mahabat görnüşini we bukjasyny saýlaň!
          </h2>
          <div className="md:grid md:grid-cols-5 flex flex-col gap-[8px]">
            {planTypes.map((option) => (
              <Option
                onClick={(id) => setPlan(id)}
                activeId={plan}
                id={option.id}
                title={option.name}
                key={v4()}
              />
              // <Option
              //   onClick={() => setPlan(option.id)}
              //   activeId={plan}
              //   id={option.id}
              //   title={option.name}
              //   key={v4()}
              // />
            ))}
          </div>
        </div>
        <Plan />
      </div>
    </PresenceAnimator>
  );
};

export default WindowTwo;
