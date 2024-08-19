import { ICategoryContext } from './category.type';
import { ITheme } from './theme.type';
import {
  AddPostState,
  CalculatorContext,
  PlanDataState,
  PlanState,
  PropertyDataState,
  PropertyState,
  StepState,
} from './advert.type';
import { IParam } from './params.type';
import { Dispatch, SetStateAction } from 'react';
import { IBurger } from './burger.type';
import { IAdvertismentContext } from './advertisment.type';
import { IQuizSearch } from './quizSearch.type';
import { IQuizId } from './quizId.type';
import { IQuizSearchActive } from './quizSearchActive.type';
import { IQuizQuestions } from './quizQuestions.type';
import { IVoteDescription } from './vote/voteDescription';

export interface IGlobalContext {
  themeContext: ITheme;
  categoryContext: ICategoryContext;
  burgerContext: IBurger;
}

export interface IQuizContext {
  quizSearchContext: IQuizSearch;
  quizSearchActiveContext: IQuizSearchActive;
  quizQuestionsContext: IQuizQuestions;
}

export interface IVoteContext {
  voteDescriptionContext: IVoteDescription;
}

export interface IStepsContext {
  addPostContext: AddPostState;
  propertyContext: PropertyState;
  stepContext: StepState;
  plansContext: PlanState;
  calculatorContext: CalculatorContext;
  data: {
    properties: PropertyDataState;
    plans: PlanDataState;
  };
}

export interface IMaterialsContext {
  params: { [keys: string]: string };
  setParams: Dispatch<SetStateAction<IMaterialsContext['params']>>;
}
