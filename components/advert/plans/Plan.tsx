'use client';
import Table from '../Table';
import { v4 } from 'uuid';
import PresenceAnimator from '../../hox/PresenceAnimator';
import Option from '../Option';
import { useContext, useEffect, useState } from 'react';
import StepsContext from '@/context/StepsContext';
import { AnimatePresence } from 'framer-motion';
import { FormActionType } from '@/providers/StepsProvider';
import { PlansModel } from '@/models/plans.model';
import Button from '@/components/Button';
import Link from 'next/link';

const Plan = () => {
  const { data, plansContext, addPostContext, calculatorContext } = useContext(StepsContext);
  const { plan } = plansContext;
  const { plans } = data.plans;
  const { dispatch, form } = addPostContext;
  const [folder, setFolder] = useState<PlansModel['data'][any]>();

  useEffect(() => {
    if (form.folder_id !== '' && plans) {
      const newFolder = plans.data.find((item) => String(item.id) === form.folder_id);
      if (newFolder) {
        setFolder(newFolder);
      }
    }
  }, [form.folder_id, plans]);

  // useEffect(() => {
  //   calculatorOpen
  //     ? (window.document.body.style.overflowY = 'hidden')
  //     : (window.document.body.style.overflowY = 'auto');
  // }, [calculatorOpen]);

  const definePlan = (plan: number | null) => {
    if (!plan) return;
    switch (plan) {
      case 1:
        return 'on_tv';
      case 2:
        return 'on_radio';
      case 3:
        return 'on_subtitle';
      case 4:
        return 'on_web';
      case 5:
        return 'on_outside_monitors';
      default:
        return '';
    }
  };

  if (!plans) return null;
  if (!plan) return null;

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
        <div className="flex flex-col gap-6">
          <h4 className="text-black text-[22px] font-redhat font-bold pt-6 border-t border-solid border-[#E7E7E7]">
            Mahabat görnüşini we bukjasyny saýlaň!
          </h4>
          <div className="md:grid md:grid-cols-4 flex flex-col gap-4">
            {/* {plans.data.map((item) =>
              item[definePlan(plan) as keyof (typeof plans)['data'][any]] ? (
                <Option
                  activeId={Number(form.folder_id)}
                  id={item.id}
                  onClick={(id) =>
                    dispatch({
                      type: FormActionType.FOLDER,
                      payload: String(id),
                    })
                  }
                  title={item.title}
                  description={item.description}
                  key={v4()}
                />
              ) : null,
            )} */}

            {plans.data.map((item) =>
              item.usage_name === definePlan(plan) ? (
                <Option
                  activeId={Number(form.folder_id)}
                  id={item.id}
                  onClick={(id) =>
                    dispatch({
                      type: FormActionType.FOLDER,
                      payload: String(id),
                    })
                  }
                  title={item.title}
                  description={item.description}
                  key={v4()}
                />
              ) : null,
            )}
          </div>

          {definePlan(plan) === 'on_outside_monitors' ? (
            <Link
              className="text-lg text-blue-500 font-bold underline"
              href={
                'https://www.google.com/maps/d/viewer?mid=1h-OonWMZ0EPNKYHMNvC5IPLMTERL_Gc&ll=37.94468794917295%2C58.377513099999994&z=12'
              }
              target="_blank">
              LED monitorlaryň kartasy
            </Link>
          ) : null}

          {form.folder_id !== '' && folder ? (
            <PresenceAnimator
              initial={{ x: '100%', opacity: '0%' }}
              animate={{
                x: '0%',
                opacity: '100%',
                transition: { duration: 0.5 },
              }}
              exit={{
                x: '-100%',
                opacity: '0%',
                transition: { duration: 0.5 },
              }}>
              <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-6">
                  <Table
                    columns={folder.folder_table[0]}
                    plan={plan}
                    data={folder.folder_table}
                    key={v4()}
                  />
                </div>
                <Button
                  onClick={() => calculatorContext.setCalculatorOpen(true)}
                  name="Indiki"
                  type="button"
                  disabled={calculatorContext.calculatorOpen ? true : false}
                />
              </div>
            </PresenceAnimator>
          ) : null}
        </div>
      </PresenceAnimator>
    </div>
  );
};

export default Plan;
