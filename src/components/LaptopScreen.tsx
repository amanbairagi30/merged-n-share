import { GitMerge, Plus } from 'lucide-react';
import React from 'react';

export default function LaptopScreen() {
  return (
    <div className="mt-6 h-[630px] w-full overflow-hidden rounded-t-md border-[3px] border-gray-500">
      <div className="flex h-[2.55rem] w-full items-center justify-between rounded-t-md bg-[#202020] px-4 text-white">
        <div className="flex items-center gap-2">
          <div className="h-[0.8rem] w-[0.8rem] rounded-full bg-red-500"></div>
          <div className="h-[0.8rem] w-[0.8rem] rounded-full bg-yellow-500"></div>
          <div className="h-[0.8rem] w-[0.8rem] rounded-full bg-green-500"></div>
        </div>
        {/* <div><Plus /></div> */}
        <div className="font-secondary text-xl text-primary">&</div>
      </div>
      {/* <div className="bg-[#151414] flex justify-center  h-full">
                <div className="w-full mx-2 sm:w-[40%] h-[8rem] rounded-xl bg-[#202020] p-2 mt-[4rem]">
                    <div className="flex relative items-center gap-2">
                        <div className="!w-[2rem] !h-[2rem] bg-[#161515] rounded-full"></div>
                        <div className="w-full h-[1.5rem] bg-[#161515] rounded-full"></div>
                        <div className="w-[4rem] h-[4rem] flex items-center justify-center p-2 top-[5.8rem] translate-x-[50%] right-[50%] text-white absolute bg-[#8957e5] rounded-full">
                            <GitMerge size='30' />
                        </div>
                    </div>
                </div>
            </div> */}
    </div>
  );
}
