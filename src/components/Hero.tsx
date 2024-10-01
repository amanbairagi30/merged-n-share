import React from 'react'
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { UsersAvatar } from "@/components/users-avatars";
import { GitMerge } from "lucide-react";
import Image from "next/image";
import dashboard from "../../public/dashboard.png";

export default function Hero() {
    return (
        <section>
            {/* <div className="bg-blue-500/5 p-4 text-center font-light text-white">
       Crafted for <strong>100xdevs</strong> community , More features are on their way , Stay Tuned!
      </div> */}
            <div className="w-full h-[100vh] py-8 relative " >
                <div className='absolute left-[50%] translate-x-[-50%] -top-[2rem] md:-top-[6rem] size-[12rem] md:size-[14rem] rounded-full bg-gradient-to-t from-yellow-400 to-yellow-700 blur-[8em]'>
                </div>
                <div className=" max-w-[1080px]  px-8 mx-auto">
                    <Navbar />
                    <div className="my-20 z-0 flex flex-col h-fit  items-center justify-center">
                        {/* <div className="w-fit border-2 items-center justify-center rounded-full text-center text-sm py-1 inline-flex h-fit animate-shimmer border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
              Let the world know about your skills

            </div> */}
                        <div className="flex flex-col gap-6 h-fit  items-center justify-center">

                            <div className="text-3xl font-secondary font-[600] sm:text-5xl w-fit md:w-[80%] text-center z-20 justify-center items-center">
                                Showcase your open source contributions as <span className="transition-all font-[900] duration-200 bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-yellow-200 w-fit h-fit">Proof of Work</span>
                            </div>

                            <div className="text-xs md:text-base text-center font-paragraph md:w-[60%]">
                                Highlight your merged pull requests and share your impact on the open source community with the world.
                            </div>

                            <div className="mb-6">
                                <UsersAvatar />
                            </div>

                        </div>
                        <div className="flex items-center gap-4">
                            <Button className="font-bold h-10 font-paragraph">Explore the arena</Button>
                            <Button variant={'ghost'} className="font-bold font-paragraph border-primary hover:bg-primary/10 h-10">What's more ?</Button>
                        </div>
                    </div>


                    <section className="flex items-center justify-center">

                        <div
                            className="relative flex items-center justify-center w-24 md:w-64 h-24 md:h-64 rounded-3xl bg-gradient-to-br from-yellow-400 to-yellow-600 overflow-hidden"
                            style={{
                                boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.2)',
                            }}
                        >
                            <div className="borer-2 px-4 py-4 w-fit rounded-3xl">
                                <GitMerge className="w-16  md:w-44 text-black h-44" />
                            </div>
                            {/* Base gradient and inner shadow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-yellow-900 opacity-30" />

                            {/* Enhanced shine effect */}
                            <div
                                className="absolute inset-0 bg-gradient-to-br from-yellow-100 to-transparent opacity-90"
                                style={{
                                    mixBlendMode: 'soft-light',
                                }}
                            />

                            {/* Static reflection */}
                            <div
                                className="absolute inset-0 bg-gradient-radial from-yellow-100 to-transparent opacity-50"
                                style={{
                                    background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8) 0%, transparent 60%)',
                                }}
                            />

                            {/* Animated shine */}
                            <div
                                className="absolute inset-0 opacity-30 animate-pulse"
                                style={{
                                    background: 'linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
                                    backgroundSize: '200% 200%',
                                    animation: 'gradient 3s ease infinite',
                                }}
                            />

                            {/* Edge highlight */}
                            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-transparent opacity-30 rounded-3xl" />
                        </div>
                    </section>

                    <div className="shadow-xl shadow-primary rounded-xl my-6">
                        <Image
                            className="aspect-video rounded-xl"
                            alt="dashboard"
                            src={dashboard}
                        />
                    </div>

                </div>
            </div>

        </section>
    )
}
