'use client';
import { Queries } from '@/api/queries';
import splitter from '@/public/splitter.svg';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Loader from '../Loader';
import { v4 } from 'uuid';
import { Note } from '@/models/quizQuestions.model';

interface IProps {
  rules: Note[];
  notes: Note[];
}

const QuizTable = ({ rules, notes }: IProps) => {
  // const { data, error, isFetching } = useQuery({
  //   queryKey: ['quiz_questions'],
  //   queryFn: () => Queries.getQuizQuestions(),
  //   keepPreviousData: true,
  // });

  // if (isFetching) return <Loader />;
  // if (error) return <h1>{JSON.stringify(error)}</h1>;

  return (
    <div className="flex flex-col gap-[40px] ">
      {/* <div className="p-[6px] md:p-5  flex flex-col gap-[40px] md:gap-[60px] rounded-lg "> */}
      <h2 className="text-textBlack text-[28px] md:text-[40px] leading-[125%] font-semibold text-center md:text-left">
        SMS bäsleşiginiň düzgünleri:
      </h2>
      <div className="flex flex-col md:flex-row gap-[40px] justify-between">
        <div className="flex w-full flex-col gap-[15px] md:gap-[20px] py-[20px] px-[10px] md:p-[30px] bg-fillLightBgLightContr rounded-[25px] shadow-quizButton">
          {/* <h3 className="text-textBlack text-[18px] md:text-[24px] leading-[125%] font-bold md:font-semibold text-center md:text-left">
            Umumy duzgunleri:
          </h3> */}
          <ul className="flex flex-col gap-[8px] md:gap-3">
            {rules.map((rule) =>
              rule.title ? (
                <li className="flex items-start gap-2" key={v4()}>
                  <div className="flex w-fit h-5 md:h-8 justify-center items-center">
                    <span className="block w-1.5 h-1.5 md:w-2 md:h-2 bg-textDarkt rounded-full"></span>
                  </div>
                  <span className="text-textDarkt text-[16px] md:text-xl leading-[120%]">
                    {rule.title}
                  </span>
                </li>
              ) : null,
            )}
          </ul>
        </div>

        <div className="flex flex-col w-full gap-[15px] md:gap-[20px] py-[20px] px-[10px] md:p-[30px] bg-fillLightBgHightContr rounded-[25px] max-w-[500px] shadow-quizButton">
          <h3 className="text-textBlack text-[18px] md:text-[24px] leading-[125%] font-bold md:font-semibold text-center md:text-left">
            Üns beriň!
          </h3>
          <ul className="flex flex-col gap-3 ">
            {notes.map((note) =>
              note.title ? (
                <li className="flex items-start gap-2" key={v4()}>
                  <div className="flex w-fit h-5 md:h-6 justify-center items-center">
                    <span className="block w-1.5 h-1.5 md:w-2 md:h-2 bg-textDarkt rounded-full"></span>
                  </div>
                  <span className="text-textDarkt text-[16px] md:text-xl leading-[120%]">
                    {note.title}
                  </span>
                </li>
              ) : null,
            )}
          </ul>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default QuizTable;
