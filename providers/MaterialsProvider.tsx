'use client';

import MaterialsContext from '@/context/MaterialsContext';
import { IParam } from '@/typings/params.type';
import { PropsWithChildren, useEffect, useMemo, useState } from 'react';

const MaterialsProvider = ({ children }: PropsWithChildren) => {
  const [params, setParams] = useState({ per_page: '8' } as any);

  const paramsContext = useMemo(() => ({ params, setParams }), [params, setParams]);
  return (
    <MaterialsContext.Provider
      value={{
        params: paramsContext.params,
        setParams: paramsContext.setParams,
      }}>
      {children}
    </MaterialsContext.Provider>
  );
};

export default MaterialsProvider;
