import React from 'react'

export default function TitleCard({ icon: Icon, title }: any) {
    return (
        <div className=' group mx-auto cursor-pointer rounded-full overflow-hidden relative h-fit hover: gap-2 flex items-center justify-between w-fit'>
            <div className=' border-2 mx-[2px] flex items-center gap-2 justify-center rounded-full bg-ye-500 py-2 px-4 z-[20] bg-background top-0 h-full w-[10rem]'>
                <Icon className='w-5 h-5 duration-1000 group-hover:text-primary' />
                <p className='font-secondary'>{title}</p>
            </div>
            <div className='absolute transition-all duration-1000 ease-in-out translate-y-[6.5rem] group-hover:translate-y-0 bg-primary w-full h-[6rem]'>
            </div>
        </div>
    )
}
