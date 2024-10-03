import { Eye, MessageCircleHeart, Telescope, Users } from 'lucide-react'
import React from 'react'

export default function Statistics() {
    return (
        <section className='flex flex-col items-center justify-center gap-4 my-[10rem]'>
            <div className='h-fit p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 w-full gap-8'>
                <div className='border-2 rounded-xl flex py-8 px-4 flex-col gap-4 items-center justify-center'>
                    <Eye className='w-12 h-12' />
                    <div className='flex flex-col gap-2 items-center'>
                        <div className='text-3xl font-bold font-secondary'>700+</div>
                        <div className='font-semibold font-paragraph text-sm dark:text-gray-400'>
                            Visitors
                        </div>
                    </div>
                </div>
                <div className='border-2 rounded-xl flex p-4 flex-col gap-4 items-center justify-center'>
                    <Users className='w-12 h-12' />
                    <div className='flex flex-col gap-2 items-center'>
                        <div className='text-3xl font-bold font-secondary'>100+</div>
                        <div className='font-semibold font-paragraph text-sm dark:text-gray-400'>
                            Users
                        </div>
                    </div>
                </div>
                <div className='border-2 rounded-xl flex p-4 flex-col gap-4 items-center justify-center'>
                    <Telescope className='w-12 h-12' />
                    <div className='flex flex-col gap-2 items-center'>
                        <div className='text-3xl font-bold font-secondary'>3500+</div>
                        <div className='font-semibold font-paragraph text-sm dark:text-gray-400'>
                            Page Views
                        </div>
                    </div>
                </div>
                <div className='border-2 rounded-xl flex p-4 flex-col gap-4 items-center justify-center'>
                    <MessageCircleHeart className='w-12 h-12' />
                    <div className='flex flex-col gap-2 items-center'>
                        <div className='text-3xl font-bold font-secondary'>5+</div>
                        <div className='font-semibold font-paragraph text-sm dark:text-gray-400'>
                            Testimonials
                        </div>
                    </div>
                </div>
            </div>
            <p className='font-paragraph'>and counting...</p>
        </section>
    )
}