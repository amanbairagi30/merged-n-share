"use client";
import { Eye, MessageCircleHeart, Telescope, TrendingUp, Users } from 'lucide-react';
import React from 'react';
import TitleCard from './title-card';
import { motion } from "framer-motion";

const statisticsData = [
    { icon: Eye, value: '700+', label: 'Visitors' },
    { icon: Users, value: '100+', label: 'Users' },
    { icon: Telescope, value: '3500+', label: 'Page Views' },
    { icon: MessageCircleHeart, value: '5+', label: 'Testimonials' },
]

export default function Statistics() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
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
                ease: "easeOut",
            },
        },
    }

    return (
        <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className='flex flex-col items-center justify-center gap-4 my-[10rem]'
        >
            <motion.div variants={itemVariants}>
                <TitleCard icon={TrendingUp} title={'Statistics'} />
            </motion.div>

            <motion.div
                className='mt-2 mb-8 text-2xl md:text-4xl font-secondary flex items-center justify-center font-bold'
                variants={itemVariants}
            >
                <h3 className='w-full md:w-[70%] text-center'>
                    Let&apos;s see some <span className='text-primary'>numbers</span> which we&apos;ve got so far.
                </h3>
            </motion.div>

            <motion.div
                className='h-fit p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 w-full gap-8'
                variants={containerVariants}
            >
                {statisticsData.map((stat, index) => (
                    <motion.div
                        key={index}
                        className='border-2 rounded-xl flex py-8 px-4 flex-col gap-4 items-center justify-center'
                        variants={itemVariants}
                    >
                        <stat.icon className='w-12 h-12' />
                        <div className='flex flex-col gap-2 items-center'>
                            <motion.div
                                className='text-3xl font-bold font-secondary'
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                {stat.value}
                            </motion.div>
                            <div className='font-semibold font-paragraph text-sm dark:text-gray-400'>
                                {stat.label}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            <motion.p
                className='font-paragraph'
                variants={itemVariants}
            >
                and counting...
            </motion.p>
        </motion.section>
    )
}
