'use client';

import { FolderTable, PlansModel } from '@/models/plans.model';
import { v4 } from 'uuid';

export interface IColumn {
  name: string;
  propertyId: string;
}

interface IProps {
  columns: FolderTable;
  data: FolderTable[];
  plan: number;
}

const columnName = {
  time: 'Wagt aralygy',
  price: 'Bahasy',
  set_tv: 'TV',
  set_aydym: 'aydym.com',
  set_radio: 'Radio',
  set_belet: 'Belet',
  set_sub: 'Subtitle',
  set_web: 'Website',
  set_outside_monitors: 'LED',
};

const Table = ({ columns, data, plan }: IProps) => {
  const cols = Object.keys(columns);
  const gridCols = cols.length;

  return (
    <div
      className="advert-table max-w-[700px] md:w-fit w-full flex flex-col gap-8 rounded-[5px] overflow-hidden border border-solid border-gray-400 pt-6"
      style={{
        boxShadow: '0px 4.176356792449951px 3.341085195541382px 0px rgba(0, 0, 0, 0.15)',
      }}>
      <div className="table-inner px-2 pb-2 overflow-auto ">
        <div
          className="table-cols w-full grid gap-4 border-b border-solid border-black pb-2 content-center items-center"
          style={{ gridTemplateColumns: `repeat(${gridCols}, 1fr)` }}>
          {cols.map((col, id) => (
            <span
              className={`font-mw_sans text-[14px] font-bold text-black flex justify-center items-center ${
                id === 0 ? 'w-[100px]' : ''
              }`}
              key={v4()}>
              {plan == 3 && columnName[col as keyof typeof columnName] === 'Subtitle'
                ? 'Flyer'
                : columnName[col as keyof typeof columnName]}
            </span>
          ))}
        </div>
        <div className="flex flex-col w-full gap-2 max-h-[480px] overflow-y-auto">
          {data.map((item, index) => {
            const keys = Object.keys(item);
            return index % 2 === 0 ? (
              <div
                key={v4()}
                className="table-data grid gap-4 pt-2 border-b border-solid border-[#DAD8D8] pb-2 content-center items-center bg-[#f9f9f9]"
                style={{ gridTemplateColumns: `repeat(${gridCols}, 1fr)` }}>
                {keys.map((key, id) => (
                  <span
                    className={`font-mw_sans text-[14px] font-light text-black flex justify-center items-center ${
                      id === 0 ? 'w-[100px]' : ''
                    }`}
                    key={v4()}>
                    {item[key as keyof typeof item]}
                  </span>
                ))}
              </div>
            ) : (
              <div
                key={v4()}
                className="table-data grid gap-4 pt-2 border-b border-solid border-[#DAD8D8] pb-2 content-center items-center"
                style={{ gridTemplateColumns: `repeat(${gridCols}, 1fr)` }}>
                {keys.map((key, id) => (
                  <span
                    className={`font-mw_sans text-[14px] font-light text-black flex justify-center items-center ${
                      id === 0 ? 'w-[100px]' : ''
                    }`}
                    key={v4()}>
                    {item[key as keyof typeof item]}
                  </span>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Table;
