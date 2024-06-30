import { GitMerge, Plus } from 'lucide-react'
import React from 'react'

export default function LaptopScreen() {
    return (
        <div className="border-2 overflow-hidden border-gray-500 rounded-t-md mt-6 w-full h-[50rem]">
            <div className="w-full text-white px-4 rounded-t-md flex items-center justify-between bg-[#202020] h-[2.55rem]">
                <div className="flex items-center gap-2">
                    <div className="w-[0.8rem] h-[0.8rem] rounded-full bg-red-500"></div>
                    <div className="w-[0.8rem] h-[0.8rem] rounded-full bg-yellow-500"></div>
                    <div className="w-[0.8rem] h-[0.8rem] rounded-full bg-green-500"></div>
                </div>
                <div><Plus /></div>
            </div>
            <div className="bg-[#151414] flex justify-center  h-full">
                <div className="w-full mx-2 sm:w-[40%] h-[8rem] rounded-xl bg-[#202020] p-2 mt-[4rem]">
                    <div className="flex relative items-center gap-2">
                        <div className="!w-[2rem] !h-[2rem] bg-[#161515] rounded-full"></div>
                        <div className="w-full h-[1.5rem] bg-[#161515] rounded-full"></div>
                        <div className="w-[4rem] h-[4rem] flex items-center justify-center p-2 top-[5.8rem] translate-x-[50%] right-[50%] text-white absolute bg-[#8957e5] rounded-full">
                            <GitMerge size='30' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
