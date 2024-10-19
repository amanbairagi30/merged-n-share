'use client';
import { Code, Crown, Globe, LineChart, Share2, Trophy } from 'lucide-react';
import React, { useState } from 'react';
import TitleCard from './title-card';
import { motion } from 'framer-motion';

const Card = ({
  icon: Icon,
  title,
  description,
  svgPaths,
  isComingSoon,
}: any) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`group relative h-[20rem] hover:-translate-y-3 bg-background cursor-pointer overflow-hidden rounded-xl border-2 p-4 duration-500 hover:border-primary`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative z-10 h-20 w-20 transition-all duration-500 ease-in-out left-0 top-0 translate-x-[0%] translate-y-[0%]">
        <div className="absolute flex h-full w-full items-center justify-center rounded-xl bg-gradient-to-tl from-primary to-transparent">
          <Icon className="h-10 w-10 text-black" />
        </div>
        <div
          className="absolute inset-0 rounded-xl bg-gradient-to-br from-yellow-100 to-transparent opacity-90"
          style={{
            mixBlendMode: 'soft-light',
          }}
        />
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-yellow-400 to-transparent opacity-30" />
      </div>

      <div
        className={`absolute right-4 top-4 border-2 font-normal ${!isComingSoon ? 'border-green-500 bg-green-500/40 text-green-800 dark:text-green-300' : 'border-primary bg-primary/40 dark:text-yellow-300'} rounded-full px-2 text-sm`}
      >
        {isComingSoon ? 'Coming Soon' : 'Live now'}
      </div>

      <div className="relative z-10 mt-4 flex flex-col gap-2 transition-all duration-500 translate-y-0 opacity-100">
        <h1 className="font-secondary text-3xl font-bold">{title}</h1>
        <p className="w-[70%] font-paragraph text-sm dark:text-gray-400">
          {description}
        </p>
      </div>

      {/* Bottom SVGs */}
      <div className="absolute bottom-0 left-0 h-32 w-full overflow-hidden">
        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 400 100"
          preserveAspectRatio="none"
        >
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
              <linearGradient
                key={index}
                id={`grad${index + 1}`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop
                  offset="0%"
                  stopColor="#EAB308"
                  stopOpacity={0.7 - index * 0.1}
                />
                <stop
                  offset="100%"
                  stopColor="#CA8A04"
                  stopOpacity={0.7 - index * 0.1}
                />
              </linearGradient>
            ))}
          </defs>
        </svg>
      </div>

      {/* Right side SVG */}
      <svg
        className="absolute right-0 top-0 h-full w-1/3 opacity-25"
        viewBox="0 0 100 400"
        preserveAspectRatio="none"
      >
        <path
          d="M100,0 C70,50 30,100 0,150 C30,200 70,250 100,300 C70,350 30,400 0,400 L100,400 Z"
          fill="url(#gradRight)"
          className="transition-all duration-500 ease-in-out"
          style={{
            transform: isHovered ? 'translateX(15px)' : 'translateX(0)',
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
  );
};
export default function Features() {
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
  const cards = [
    {
      icon: Share2,
      title: 'Share',
      isComingSoon: false,
      description:
        'Instantly showcase merged PRs with a single public link. No more searching for URLs—just copy, paste, and share.',
      svgPaths: [
        'M0,100 C100,50 200,90 400,60 L400,100 L0,100 Z',
        'M0,100 C150,80 300,90 400,70 L400,100 L0,100 Z',
      ],
    },
    {
      icon: Trophy,
      title: 'Leaderboard',
      isComingSoon: true,
      description:
        'Track top contributors with a community-driven leaderboard. Get recognized for your open-source contributions and win bounties.',
      svgPaths: [
        'M0,100 C50,70 150,90 400,50 L400,100 L0,100 Z',
        'M0,100 C200,80 350,95 400,60 L400,100 L0,100 Z',
      ],
    },
    {
      icon: Globe,
      title: 'Cross-org',
      isComingSoon: false,
      description:
        'Display merged PRs from multiple organizations. Share contributions from any open-source organisation at just one click',
      svgPaths: [
        'M0,100 C100,60 300,80 400,40 L400,100 L0,100 Z',
        'M0,100 C250,85 350,75 400,50 L400,100 L0,100 Z',
      ],
    },
    {
      icon: Code,
      title: 'Embed',
      isComingSoon: false,
      description:
        'Seamlessly integrate your contributions into your portfolio or personal website. Make your open-source impact visible anywhere, just like testimonials.',
      svgPaths: [
        'M0,100 C150,40 250,70 400,30 L400,100 L0,100 Z',
        'M0,100 C100,80 300,60 400,40 L400,100 L0,100 Z',
      ],
    },
    {
      icon: LineChart,
      title: 'Analytics',
      isComingSoon: false,
      description:
        'Gain insights on who’s viewing and engaging with your public profile. Track your impact and reach with detailed stats and analytics.',
      svgPaths: [
        'M0,100 C150,40 250,70 400,30 L400,100 L0,100 Z',
        'M0,100 C100,80 300,60 400,40 L400,100 L0,100 Z',
      ],
    },
  ];
  return (
    <motion.section
      id="features"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      className="my-[10rem] relative flex h-fit flex-col items-center py-4"
    >
      <motion.div variants={itemVariants}>
        <TitleCard icon={Crown} title={'Features'} />
      </motion.div>

      {/* <div className='rounded-full w-[30rem] h-[30rem] absolute top-[30%] drop-shadow-[0_10px_20px_#facc15] blur-[80px] opacity-10 dark:opacity-30 bg-primary'></div> */}


      <motion.div
        className="mt-10 flex items-center justify-center font-secondary text-2xl font-bold md:text-4xl"
        variants={itemVariants}
      >
        <h3 className="w-full text-center md:w-[70%]">
          Streamline Your Open-Source Journey, with some of our{' '}
          <span className="text-primary">cool</span> features.
        </h3>
      </motion.div>

      <motion.div
        className="my-16 grid w-full grid-cols-1 gap-6 md:grid-cols-2"
        variants={containerVariants}
      >
        {cards.map((card, index) => (
          <React.Fragment key={index}>
            {index === cards.length - 1 && cards.length % 2 !== 0 ? (
              <motion.div
                className="flex justify-center md:col-span-2"
                variants={itemVariants}
              >
                <div className="w-full md:w-1/2">
                  <Card {...card} index={index} length={cards.length} />
                </div>
              </motion.div>
            ) : (
              <motion.div variants={itemVariants}>
                <Card {...card} index={index} length={cards.length} />
              </motion.div>
            )}
          </React.Fragment>
        ))}
      </motion.div>
    </motion.section>
  );
}
