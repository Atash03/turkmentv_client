'use client';
import { PlansModel } from '@/models/plans.model';
import Table from '../Table';
import { v4 } from 'uuid';
import PresenceAnimator from '../../hox/PresenceAnimator';
import Option from '../Option';
import { useState } from 'react';

interface IProps {
  plans: PlansModel;
}

const PlanFour = ({ plans }: IProps) => {
  const [planItem, setPlanItem] = useState<number | null>(null);
  return (
    <div className="flex flex-col gap-6">
      <PresenceAnimator
        initial={{ x: '100%', opacity: '0%' }}
        animate={{
          x: '0%',
          opacity: '100%',
          transition: { duration: 0.5 },
        }}
        exit={{ x: '-100%', opacity: '0%', transition: { duration: 0.5 } }}>
        <h4 className="text-black text-[22px] font-roboto font-bold pt-6 border-t border-solid border-[#E7E7E7]">
          Mahabat görnüşini we bukjasyny saýlaň!
        </h4>
        <div className="grid grid-cols-4 gap-4">
          {plans.data.map((item) =>
            item.on_web ? (
              <Option
                activeId={planItem}
                id={item.id}
                onClick={(id) => setPlanItem(id)}
                title={item.title}
                description={item.description}
                key={v4()}
              />
            ) : null,
          )}
        </div>
        {/* {plans.data.map((plan) =>
          plan.on_web ? (
            <Table
              columns={plan.folder_table[0]}
              data={plan.folder_table}
              description={plan.description}
              title={plan.title}
              key={v4()}
            />
          ) : null
        )} */}
      </PresenceAnimator>
    </div>
  );
};

export default PlanFour;
