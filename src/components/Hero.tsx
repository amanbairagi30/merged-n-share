"use client";
import React from 'react';
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { UsersAvatar } from "@/components/users-avatars";
import { Code, GitBranch, GitMerge, GitPullRequest, Globe } from "lucide-react";
import { signIn } from 'next-auth/react';
import { DesktopScreen } from './desktop-screen';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { motion } from "framer-motion";

export default function Hero() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.5,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeInOut",
            },
        },
    }

    const iconVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 1,
                ease: "easeOut",
            },
        },
    }


    const createFloatingAnimation = (delay: number) => ({
        y: [0, -10, 0],
        transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay,
        },
    })

    const desktopScreenVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut",
                delay: 1.5, // Delay to make it appear last
            },
        },
    }
    return (
        <motion.section
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className='relative'
        >
    
            <motion.div variants={containerVariants} className="my-20 z-0 flex flex-col h-fit  items-center justify-center">
              
                <motion.div variants={containerVariants} className="flex flex-col gap-6 h-fit  items-center justify-center">

                    <motion.div
                        variants={itemVariants}
                        className="text-3xl font-secondary font-bold sm:text-5xl w-fit md:w-[80%] text-center z-20 justify-center items-center"
                    >
                        Showcase your open source contributions as <span className="transition-all font-[900] duration-200 bg-clip-text clip-text  text-transparent bg-gradient-to-r from-yellow-500 to-yellow-200 w-fit h-fit">Proof of Work</span>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className="text-xs md:text-base text-center font-paragraph md:w-[40%]"
                    >
                        Highlight your merged pull requests and share your impact on the open source community with the world.
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className="mb-6"
                    >
                        <UsersAvatar />
                    </motion.div>

                </motion.div>
                <motion.div className="flex flex-col w-full md:flex-row items-center justify-center gap-4 mt-4 ">
                    <Button onClick={async () => await signIn()} className="font-bold h-8 font-paragraph w-full md:w-fit">Sign Up</Button>
                    <Button variant={'ghost'} className="font-bold font-paragraph border-primary hover:bg-accent h-8 w-full md:w-fit">What&apos;s more ?</Button>
                </motion.div>
            </motion.div>

            <motion.div variants={containerVariants} className='flex items-center justify-center gap-8'>
                <motion.section animate={createFloatingAnimation(0)} variants={iconVariants} className="flex mb-24 md:m-0 md:absolute drop-shadow-[0_10px_60px_#facc15] md:drop-shadow-[0_60px_50px_#facc15] top-[18rem] left-[12rem] -rotate-12 items-center justify-center">
                    <motion.div
                        className="relative flex items-center justify-center w-24 md:w-16 h-24 md:h-16 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-600 overflow-hidden"
                        style={{
                            boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.2)',
                            transform: 'rotate(-12deg)'
                        }}
                    >
                        <motion.div className="borer-2 px-4 py-4 w-fit rounded-3xl">
                            <GitMerge className="w-16  md:w-10 text-black h-44" />
                        </motion.div>
                        <motion.div className="absolute inset-0 bg-gradient-to-br from-transparent to-yellow-900 opacity-30" />

                        <motion.div
                            className="absolute inset-0 bg-gradient-to-br from-yellow-100 to-transparent opacity-90"
                            style={{
                                mixBlendMode: 'soft-light',
                            }}
                        />

                        <motion.div
                            className="absolute inset-0 bg-gradient-radial from-yellow-100 to-transparent opacity-50"
                            style={{
                                background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8) 0%, transparent 60%)',
                            }}
                        />

                        <motion.div
                            className="absolute inset-0 opacity-30 animate-pulse"
                            style={{
                                background: 'linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
                                backgroundSize: '200% 200%',
                                animation: 'gradient 3s ease infinite',
                            }}
                        />

                        <motion.div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-transparent opacity-30 rounded-3xl" />
                    </motion.div>
                </motion.section>

                <motion.section animate={createFloatingAnimation(0.5)} variants={iconVariants} className="flex mb-24 md:m-0 md:absolute drop-shadow-[0_10px_60px_#facc15] md:drop-shadow-[0_60px_50px_#facc15] top-[18rem] right-[12rem] rotate-12 items-center justify-center">
                    <motion.div
                        className="relative flex items-center justify-center w-24 md:w-16 h-24 md:h-16 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-600 overflow-hidden"
                        style={{
                            boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.2)',
                            transform: 'rotate(12deg)'
                        }}
                    >
                        <motion.div className="borer-2 px-4 py-4 w-fit rounded-3xl">
                            <GitHubLogoIcon className="w-16  md:w-10 text-black h-44" />
                        </motion.div>
                        <motion.div className="absolute inset-0 bg-gradient-to-br from-transparent to-yellow-900 opacity-30" />

                        <motion.div
                            className="absolute inset-0 bg-gradient-to-br from-yellow-100 to-transparent opacity-90"
                            style={{
                                mixBlendMode: 'soft-light',
                            }}
                        />

                        <motion.div
                            className="absolute inset-0 bg-gradient-radial from-yellow-100 to-transparent opacity-50"
                            style={{
                                background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8) 0%, transparent 60%)',
                            }}
                        />

                        <motion.div
                            className="absolute inset-0 opacity-30 animate-pulse"
                            style={{
                                background: 'linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
                                backgroundSize: '200% 200%',
                                animation: 'gradient 3s ease infinite',
                            }}
                        />

                        <motion.div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-transparent opacity-30 rounded-3xl" />
                    </motion.div>
                </motion.section>
            </motion.div>


            <motion.div variants={desktopScreenVariants}>
                <DesktopScreen />
            </motion.div>


            <motion.section animate={createFloatingAnimation(1)} variants={iconVariants} className="hidden lg:flex absolute drop-shadow-[0_60px_50px_#facc15] top-[11rem] opacity-40 right-[20rem] rotate-12 items-center justify-center">
                <motion.div
                    className="relative flex items-center justify-center w-24 md:w-14 h-24 md:h-14 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-600 overflow-hidden"
                    style={{
                        boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.2)',
                        transform: 'rotate(12deg)'
                    }}
                >
                    <motion.div className="borer-2 px-4 py-4 w-fit rounded-3xl">
                        <Globe className="w-16 md:w-8 text-black h-44" />
                    </motion.div>
                    <motion.div className="absolute inset-0 bg-gradient-to-br from-transparent to-yellow-900 opacity-30" />

                    <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-yellow-100 to-transparent opacity-90"
                        style={{
                            mixBlendMode: 'soft-light',
                        }}
                    />

                    <motion.div
                        className="absolute inset-0 bg-gradient-radial from-yellow-100 to-transparent opacity-50"
                        style={{
                            background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8) 0%, transparent 60%)',
                        }}
                    />

                    <motion.div
                        className="absolute inset-0 opacity-30 animate-pulse"
                        style={{
                            background: 'linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
                            backgroundSize: '200% 200%',
                            animation: 'gradient 3s ease infinite',
                        }}
                    />

                    <motion.div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-transparent opacity-30 rounded-3xl" />
                </motion.div>
            </motion.section>

            <motion.section animate={createFloatingAnimation(1.5)} variants={iconVariants} className="hidden lg:flex absolute drop-shadow-[0_60px_50px_#facc15] top-[11rem] opacity-40 left-[18rem] -rotate-12 items-center justify-center">
                <motion.div
                    className="relative flex items-center justify-center w-24 md:w-14 h-24 md:h-14 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-600 overflow-hidden"
                    style={{
                        boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.2)',
                        transform: 'rotate(-12deg)'
                    }}
                >
                    <motion.div className="borer-2 px-4 py-4 w-fit rounded-3xl">
                        <Code className="w-16  md:w-8 text-black h-44" />
                    </motion.div>
                    <motion.div className="absolute inset-0 bg-gradient-to-br from-transparent to-yellow-900 opacity-30" />

                    <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-yellow-100 to-transparent opacity-90"
                        style={{
                            mixBlendMode: 'soft-light',
                        }}
                    />

                    <motion.div
                        className="absolute inset-0 bg-gradient-radial from-yellow-100 to-transparent opacity-50"
                        style={{
                            background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8) 0%, transparent 60%)',
                        }}
                    />

                    <motion.div
                        className="absolute inset-0 opacity-30 animate-pulse"
                        style={{
                            background: 'linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
                            backgroundSize: '200% 200%',
                            animation: 'gradient 3s ease infinite',
                        }}
                    />

                    <motion.div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-transparent opacity-30 rounded-3xl" />
                </motion.div>
            </motion.section>

        </motion.section>
    )
}
