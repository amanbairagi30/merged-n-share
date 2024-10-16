"use client";
import React from 'react';
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { UsersAvatar } from "@/components/users-avatars";
import { Code, GitBranch, GitMerge, GitPullRequest, Globe } from "lucide-react";
import { signIn } from 'next-auth/react';
import { DesktopScreen } from './desktop-screen';
import { GitHubLogoIcon } from '@radix-ui/react-icons';


export default function Hero() {
    return (
        <section className='relative mt-28'>
            {/* <div className='absolute left-[50%] translate-x-[-50%] md:opacity-25 -bottom-[10rem] md:bottom-[15rem] size-[12rem] md:size-[40rem] rounded-full bg-gradient-to-t from-yellow-400 to-yellow-700 blur-[8em]'></div> */}
            {/* <div className="bg-blue-500/5 p-4 text-center font-light text-white">
       Crafted for <strong>100xdevs</strong> community , More features are on their way , Stay Tuned!
      </div> */}

            <div className="my-20 z-0 flex flex-col h-fit  items-center justify-center">
                {/* <div className="w-fit border-2 items-center justify-center rounded-full text-center text-sm py-1 inline-flex h-fit animate-shimmer border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
              Let the world know about your skills

            </div> */}
                <div className="flex flex-col gap-6 h-fit  items-center justify-center">

                    <div className="text-3xl font-secondary font-bold sm:text-5xl w-fit md:w-[80%] text-center z-20 justify-center items-center">
                        Showcase your open source contributions as <span className="transition-all font-[900] duration-200 bg-clip-text clip-text  text-transparent bg-gradient-to-r from-yellow-500 to-yellow-200 w-fit h-fit">Proof of Work</span>
                    </div>

                    <div className="text-xs md:text-base text-center font-paragraph md:w-[40%]">
                        Highlight your merged pull requests and share your impact on the open source community with the world.
                    </div>

                    <div className="mb-6">
                        <UsersAvatar />
                    </div>

                </div>
                <div className="flex flex-col w-full md:flex-row items-center justify-center gap-4 mt-4 ">
                    <Button onClick={async () => await signIn()} className="font-bold h-8 font-paragraph w-full md:w-fit">Sign Up</Button>
                    <Button variant={'ghost'} className="font-bold font-paragraph border-primary hover:bg-accent h-8 w-full md:w-fit">What&apos;s more ?</Button>
                </div>
            </div>

            <div className='flex items-center justify-center gap-8'>
                <section className="flex mb-24 md:m-0 md:absolute drop-shadow-[0_10px_60px_#facc15] md:drop-shadow-[0_60px_50px_#facc15] top-[18rem] left-[12rem] -rotate-12 items-center justify-center">
                    <div
                        className="relative flex items-center justify-center w-24 md:w-16 h-24 md:h-16 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-600 overflow-hidden"
                        style={{
                            boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.2)',
                        }}
                    >
                        <div className="borer-2 px-4 py-4 w-fit rounded-3xl">
                            <GitMerge className="w-16  md:w-10 text-black h-44" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-yellow-900 opacity-30" />

                        <div
                            className="absolute inset-0 bg-gradient-to-br from-yellow-100 to-transparent opacity-90"
                            style={{
                                mixBlendMode: 'soft-light',
                            }}
                        />

                        <div
                            className="absolute inset-0 bg-gradient-radial from-yellow-100 to-transparent opacity-50"
                            style={{
                                background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8) 0%, transparent 60%)',
                            }}
                        />

                        <div
                            className="absolute inset-0 opacity-30 animate-pulse"
                            style={{
                                background: 'linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
                                backgroundSize: '200% 200%',
                                animation: 'gradient 3s ease infinite',
                            }}
                        />

                        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-transparent opacity-30 rounded-3xl" />
                    </div>
                </section>

                <section className="flex mb-24 md:m-0 md:absolute drop-shadow-[0_10px_60px_#facc15] md:drop-shadow-[0_60px_50px_#facc15] top-[18rem] right-[12rem] rotate-12 items-center justify-center">
                    <div
                        className="relative flex items-center justify-center w-24 md:w-16 h-24 md:h-16 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-600 overflow-hidden"
                        style={{
                            boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.2)',
                        }}
                    >
                        <div className="borer-2 px-4 py-4 w-fit rounded-3xl">
                            <GitHubLogoIcon className="w-16  md:w-10 text-black h-44" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-yellow-900 opacity-30" />

                        <div
                            className="absolute inset-0 bg-gradient-to-br from-yellow-100 to-transparent opacity-90"
                            style={{
                                mixBlendMode: 'soft-light',
                            }}
                        />

                        <div
                            className="absolute inset-0 bg-gradient-radial from-yellow-100 to-transparent opacity-50"
                            style={{
                                background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8) 0%, transparent 60%)',
                            }}
                        />

                        <div
                            className="absolute inset-0 opacity-30 animate-pulse"
                            style={{
                                background: 'linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
                                backgroundSize: '200% 200%',
                                animation: 'gradient 3s ease infinite',
                            }}
                        />

                        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-transparent opacity-30 rounded-3xl" />
                    </div>
                </section>
            </div>


            <DesktopScreen />



            <section className="hidden lg:flex absolute drop-shadow-[0_60px_50px_#facc15] top-[11rem] opacity-40 right-[20rem] rotate-12 items-center justify-center">
                <div
                    className="relative flex items-center justify-center w-24 md:w-14 h-24 md:h-14 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-600 overflow-hidden"
                    style={{
                        boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.2)',
                    }}
                >
                    <div className="borer-2 px-4 py-4 w-fit rounded-3xl">
                        <Globe className="w-16 md:w-8 text-black h-44" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-yellow-900 opacity-30" />

                    <div
                        className="absolute inset-0 bg-gradient-to-br from-yellow-100 to-transparent opacity-90"
                        style={{
                            mixBlendMode: 'soft-light',
                        }}
                    />

                    <div
                        className="absolute inset-0 bg-gradient-radial from-yellow-100 to-transparent opacity-50"
                        style={{
                            background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8) 0%, transparent 60%)',
                        }}
                    />

                    <div
                        className="absolute inset-0 opacity-30 animate-pulse"
                        style={{
                            background: 'linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
                            backgroundSize: '200% 200%',
                            animation: 'gradient 3s ease infinite',
                        }}
                    />

                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-transparent opacity-30 rounded-3xl" />
                </div>
            </section>

            <section className="hidden lg:flex absolute drop-shadow-[0_60px_50px_#facc15] top-[11rem] opacity-40 left-[18rem] -rotate-12 items-center justify-center">
                <div
                    className="relative flex items-center justify-center w-24 md:w-14 h-24 md:h-14 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-600 overflow-hidden"
                    style={{
                        boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.2)',
                    }}
                >
                    <div className="borer-2 px-4 py-4 w-fit rounded-3xl">
                        <Code className="w-16  md:w-8 text-black h-44" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-yellow-900 opacity-30" />

                    <div
                        className="absolute inset-0 bg-gradient-to-br from-yellow-100 to-transparent opacity-90"
                        style={{
                            mixBlendMode: 'soft-light',
                        }}
                    />

                    <div
                        className="absolute inset-0 bg-gradient-radial from-yellow-100 to-transparent opacity-50"
                        style={{
                            background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8) 0%, transparent 60%)',
                        }}
                    />

                    <div
                        className="absolute inset-0 opacity-30 animate-pulse"
                        style={{
                            background: 'linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
                            backgroundSize: '200% 200%',
                            animation: 'gradient 3s ease infinite',
                        }}
                    />

                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-transparent opacity-30 rounded-3xl" />
                </div>
            </section>
        </section>
    )
}
