import { AddPostModel } from '@/models/add.post.model';
import { PlansModel } from '@/models/plans.model';
import { PropertiesModel } from '@/models/properties.model';
import { FormAction } from '@/providers/StepsProvider';
import { Dispatch, HTMLInputTypeAttribute, SetStateAction } from 'react';

export interface IAdvertFormVariant {
  name: string;
  type?: HTMLInputTypeAttribute;
  isTextArea?: boolean;
  description?: string;
  onClick?: () => void;
}

export interface IAdvertForm {
  title: string;
  type: 'variants' | 'inputs';
  variants: IAdvertFormVariant[];
}

export interface IAdvertFormState {
  forms: IAdvertForm[];
  setForms: Dispatch<SetStateAction<IAdvertForm[]>>;
}

export interface AddPostState {
  form: AddPostModel;
  dispatch: Dispatch<FormAction>;
}

export interface PropertyState {
  property: number | null;
  setProperty: Dispatch<SetStateAction<number | null>>;
}

export interface StepState {
  step: 1 | 2 | 3;
  setStep: Dispatch<SetStateAction<1 | 2 | 3>>;
}
export interface CalculatorContext {
  calculatorOpen: boolean;
  setCalculatorOpen: Dispatch<SetStateAction<boolean>>;
}

export interface PlanState {
  plan: number | null;
  setPlan: Dispatch<SetStateAction<number | null>>;
}

export interface PropertyDataState {
  properties: PropertiesModel | undefined;
  setProperties: Dispatch<SetStateAction<PropertiesModel | undefined>>;
}

export interface PlanDataState {
  plans: PlansModel | undefined;
  setPlans: Dispatch<SetStateAction<PlansModel | undefined>>;
}
