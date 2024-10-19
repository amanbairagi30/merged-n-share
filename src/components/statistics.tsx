'use client';
import {
  Eye,
  MessageCircleHeart,
  Telescope,
  TrendingUp,
  Users,
} from 'lucide-react';
import React from 'react';
import TitleCard from './title-card';
import { motion } from 'framer-motion';

const statisticsData = [
  { icon: Eye, value: '700+', label: 'Visitors' },
  { icon: Users, value: '100+', label: 'Users' },
  { icon: Telescope, value: '3500+', label: 'Page Views' },
  { icon: MessageCircleHeart, value: '5+', label: 'Testimonials' },
];

export default function Statistics() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      className="my-[10rem] flex flex-col items-center justify-center gap-4"
    >
      <motion.div variants={itemVariants}>
        <TitleCard icon={TrendingUp} title={'Statistics'} />
      </motion.div>

      <motion.div
        className="mb-8 mt-2 flex items-center justify-center font-secondary text-2xl font-bold md:text-4xl"
        variants={itemVariants}
      >
        <h3 className="w-full text-center md:w-[70%]">
          Let&apos;s see some <span className="text-primary">numbers</span>{' '}
          which we&apos;ve got so far.
        </h3>
      </motion.div>

      <motion.div
        className="grid h-fit w-full grid-cols-1 gap-8 p-4 sm:grid-cols-2 md:grid-cols-4"
        variants={containerVariants}
      >
        {statisticsData.map((stat, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center justify-center gap-4 rounded-xl border-2 px-4 py-8"
            variants={itemVariants}
          >
            <stat.icon className="h-12 w-12" />
            <div className="flex flex-col items-center gap-2">
              <motion.div
                className="font-secondary text-3xl font-bold"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {stat.value}
              </motion.div>
              <div className="font-paragraph text-sm font-semibold dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.p className="font-paragraph" variants={itemVariants}>
        and counting...
      </motion.p>
    </motion.section>
  );
}
