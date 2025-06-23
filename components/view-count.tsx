'use client';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { SlEye } from 'react-icons/sl'

function ViewCount({ video_id, viewCount }: { video_id: number, viewCount: number }) {
    const [view, setView] = useState(viewCount);

    const addView = useCallback(async () => {
      const materials = localStorage.getItem('MHB_MATERIALS_ID');
      if (materials) {
        const materialsArray = materials.split(',');
        if (!materialsArray.includes(video_id.toString())) {
          const res = await axios.post(`https://turkmentv.gov.tm/v2/api/material/${video_id}/views/increment`);
          if (res.status === 200) {
            materialsArray.push(video_id.toString());
            setView(res.data.view);
          }
        }
        localStorage.setItem('MHB_MATERIALS_ID', materialsArray.join(','));
      } else {
        const res = await axios.post(`https://turkmentv.gov.tm/v2/api/material/${video_id}/views/increment`);
        if (res.status === 200) {
          localStorage.setItem('MHB_MATERIALS_ID', [video_id.toString()].join(','));
          setView(res.data.view);
        }
      }
  
    }, [video_id])
  
    useEffect(() => {
      addView();
    }, []);
  
    return (
        <div className="flex gap-2 items-center">
            <SlEye
                style={{
                    transition: "150ms all cubic-bezier(0.4, 0, 0.2, 1)",
                }}
                width={30}
                height={18}
                className="w-[30px] h-[18px]"
            />
            <span className="font-roboto text-lg font-normal text-[#494949] transition-all dark:text-white">
                {view}
            </span>
        </div>
    )
}

export default ViewCount