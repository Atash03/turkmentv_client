'use client';
import StepsContext from '@/context/StepsContext';
import { AddPostModel } from '@/models/add.post.model';
import { PlansModel } from '@/models/plans.model';
import { PropertiesModel } from '@/models/properties.model';
import { StepState } from '@/typings/advert.type';
import { PropsWithChildren, useMemo, useReducer, useState } from 'react';

export enum FormActionType {
  FOLDER = 'FOLDER',
  DAY = 'DAY',
  SECOND = 'SECOND',
  TOTAL = 'TOTAL',
  NAME = 'NAME',
  EMAIL = 'EMAIL',
  PHONE = 'PHONE',
  NOTES = 'NOTES',
}

export interface FormAction {
  type: FormActionType;
  payload: string;
}

const formReducer = (state: AddPostModel, action: FormAction) => {
  const { type, payload } = action;

  switch (type) {
    case FormActionType.FOLDER:
      return {
        ...state,
        folder_id: payload,
      };
    case FormActionType.DAY:
      return {
        ...state,
        day: payload,
      };
    case FormActionType.EMAIL:
      return {
        ...state,
        customer_email: payload,
      };
    case FormActionType.NAME:
      return {
        ...state,
        customer_name: payload,
      };
    case FormActionType.NOTES:
      return {
        ...state,
        customer_notes: payload,
      };
    case FormActionType.PHONE:
      return {
        ...state,
        customer_phone: payload,
      };
    case FormActionType.SECOND:
      return {
        ...state,
        second: payload,
      };
    case FormActionType.TOTAL:
      return {
        ...state,
        total: payload,
      };
  }
};

const StepsProvider = ({ children }: PropsWithChildren) => {
  const [steps, setSteps] = useState([
    {
      name: 'Eýeçiligiň görnüşini saýlaň!',
      number: 1,
      onClick: () => null,
      state: 'active',
      last: false,
    },
    {
      name: 'Mahabat görnüşini we bukjasyny saýlaň!',
      number: 2,
      onClick: () => null,
      state: 'uncompleted',
      last: false,
    },
    {
      name: 'Bukjany sargyt ediň!',
      number: 3,
      onClick: () => null,
      state: 'uncompleted',
      last: true,
    },
  ]);

  const [step, setStep] = useState<StepState['step']>(1);
  const [plans, setPlans] = useState<PlansModel>();
  const [properties, setProperties] = useState<PropertiesModel>();
  const [property, setProperty] = useState<number | null>(null);
  const [plan, setPlan] = useState<number | null>(null);
  const [form, dispatch] = useReducer(formReducer, {
    folder_id: '',
    day: '',
    second: '',
    total: '',
    customer_name: '',
    customer_notes: '',
    customer_email: '',
    customer_phone: '',
  });

  const [calculatorOpen, setCalculatorOpen] = useState<boolean>(false);

  const propertyContext = useMemo(() => ({ property, setProperty }), [property, setProperty]);
  const plansData = useMemo(() => ({ plans, setPlans }), [plans, setPlans]);
  const propertiesData = useMemo(
    () => ({ properties, setProperties }),
    [properties, setProperties],
  );
  const stepContext = useMemo(() => ({ step, setStep }), [step, setStep]);
  const stepsContext = useMemo(() => ({ steps, setSteps }), [steps, setSteps]);
  const plansContext = useMemo(() => ({ plan, setPlan }), [plan, setPlan]);
  const calculatorContext = useMemo(
    () => ({ calculatorOpen, setCalculatorOpen }),
    [calculatorOpen, setCalculatorOpen],
  );

  return (
    <StepsContext.Provider
      value={{
        addPostContext: { form, dispatch },
        propertyContext,
        stepContext,
        plansContext,
        calculatorContext,
        data: {
          plans: plansData,
          properties: propertiesData,
        },
      }}>
      {children}
    </StepsContext.Provider>
  );
};

export default StepsProvider;
