"use client";
import { Code, Globe, Layout, LucideShare2, Share2, Sparkles, Trophy } from 'lucide-react'
import React, { useState } from 'react'

const Card = ({ icon: Icon, title, description, svgPaths }: any) => {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <div
            className="h-[20rem] group p-4 cursor-pointer hover:border-primary duration-500 relative rounded-xl border-2 overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative transition-all duration-500 ease-in-out h-20 w-20 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] group-hover:translate-x-[0%] group-hover:translate-y-[0%] group-hover:top-0 group-hover:left-0 z-10">
                <div className="absolute bg-gradient-to-tl from-primary to-transparent h-full w-full flex items-center justify-center rounded-xl">
                    <Icon className="text-black" />
                </div>
                <div
                    className="absolute inset-0 rounded-xl bg-gradient-to-br from-yellow-100 to-transparent opacity-90"
                    style={{
                        mixBlendMode: "soft-light",
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-transparent opacity-30 rounded-3xl" />
            </div>

            <div
                className="flex flex-col gap-2 mt-4 opacity-0 translate-y-20 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-10 relative"
            >
                <h1 className="text-3xl font-secondary font-bold ">{title}</h1>
                <p className="font-paragraph w-[70%] text-sm dark:text-gray-400">{description}</p>
            </div>

            {/* Bottom SVGs */}
            <div className="absolute bottom-0 left-0 w-full h-32 overflow-hidden">
                <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 400 100" preserveAspectRatio="none">
                    {svgPaths.map((path: any, index: any) => (
                        <path
                            key={index}
                            d={path}
                            fill={`url(#grad${index + 1})`}
                            className="transition-all duration-300 ease-in-out"
                            // style={{
                            //     transform: isHovered ? `translateY(-${5 + index * 3}px)` : "translateY(0)",
                            // }}
                        />
                    ))}
                    <defs>
                        {[...Array(svgPaths.length)].map((_, index) => (
                            <linearGradient key={index} id={`grad${index + 1}`} x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#EAB308" stopOpacity={0.7 - index * 0.1} />
                                <stop offset="100%" stopColor="#CA8A04" stopOpacity={0.7 - index * 0.1} />
                            </linearGradient>
                        ))}
                    </defs>
                </svg>
            </div>

            {/* Right side SVG */}
            <svg
                className="absolute opacity-25 right-0 top-0 h-full w-1/3"
                viewBox="0 0 100 400"
                preserveAspectRatio="none"
            >
                <path
                    d="M100,0 C70,50 30,100 0,150 C30,200 70,250 100,300 C70,350 30,400 0,400 L100,400 Z"
                    fill="url(#gradRight)"
                    className="transition-all duration-500 ease-in-out"
                    style={{
                        transform: isHovered ? "translateX(15px)" : "translateX(0)",
                    }}
                />
                <defs>
                    <linearGradient id="gradRight" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#EAB308" stopOpacity="0.1" />
                        <stop offset="100%" stopColor="#CA8A04" stopOpacity="0.3" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    )
}
export default function Features() {
    const cards = [
        {
            icon: Share2,
            title: "Share",
            description: "Instantly showcase merged PRs with a single public link. No more searching for URLs—just copy, paste, and share.",
            svgPaths: [
                "M0,100 C100,50 200,90 400,60 L400,100 L0,100 Z",
                "M0,100 C150,80 300,90 400,70 L400,100 L0,100 Z",
            ],
        },
        {
            icon: Trophy,
            title: "Leaderboard",
            description: "Track top contributors with a community-driven leaderboard. Get recognized for your open-source contributions and win bounties.",
            svgPaths: [
                "M0,100 C50,70 150,90 400,50 L400,100 L0,100 Z",
                "M0,100 C200,80 350,95 400,60 L400,100 L0,100 Z",
            ],
        },
        {
            icon: Globe,
            title: "Cross-org",
            description: "Display merged PRs from multiple organizations. Share contributions from any open-source organisation at just one click",
            svgPaths: [
                "M0,100 C100,60 300,80 400,40 L400,100 L0,100 Z",
                "M0,100 C250,85 350,75 400,50 L400,100 L0,100 Z",
            ],
        },
        {
            icon: Code,
            title: "Embed",
            description: "Seamlessly integrate your contributions into your portfolio or personal website. Make your open-source impact visible anywhere, just like testimonials.",
            svgPaths: [
                "M0,100 C150,40 250,70 400,30 L400,100 L0,100 Z",
                "M0,100 C100,80 300,60 400,40 L400,100 L0,100 Z",
            ],
        },
    ]
    return (
        <section className='h-fit flex flex-col my-[10rem] py-4'>
            <div className=' group mx-auto cursor-pointer rounded-full overflow-hidden relative h-fit hover: gap-2 flex items-center justify-between w-fit'>
                <div className=' border-2 mx-[2px] flex items-center gap-4 justify-center rounded-full bg-ye-500 py-2 px-4 z-[20] bg-background top-0 h-full w-full'>
                    <Sparkles className='w-6 h-6 duration-1000 group-hover:text-primary' />
                    <p className='font-secondary'>Features</p>
                </div>
                <div className='absolute transition-all duration-1000 ease-in-out translate-y-[6.5rem] group-hover:translate-y-0 bg-primary w-full h-[6rem]'>
                </div>
            </div>

            {/* <div className='grid grid-cols-2 gap-4 w-full my-16'>
                <div className='h-[20rem] group p-4 cursor-pointer hover:border-primary duration-500 relative rounded-xl border-2'>
                    <div className='relative transition-all duration-500 ease-in-out h-20 w-20 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] group-hover:translate-x-[0%] group-hover:translate-y-[0%] group-hover:top-0 group-hover:left-0'>

                        <div className='absolute bg-gradient-to-tl from-primary to-transparent h-full w-full flex items-center justify-center rounded-xl '>
                            <LucideShare2 className='text-black' />
                        </div>
                        <div
                            className="absolute inset-0 rounded-xl bg-gradient-to-br from-yellow-100 to-transparent opacity-90"
                            style={{
                                mixBlendMode: 'soft-light',
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-transparent opacity-30 rounded-3xl" />

                    </div>

                    <div className='flex flex-col gap-2 mt-4'>
                        <h1 className='text-3xl font-secondary font-bold'>Share</h1>
                        <p className='font-paragraph w-[70%] text-sm '>Instantly showcase merged PRs with a single public link. No more searching for URLs—just copy, paste, and share.</p>
                    </div>
                </div>

            </div> */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full my-16">
                {cards.map((card, index) => (
                    <Card key={index} {...card} />
                ))}
            </div>
        </section>
    )
}
