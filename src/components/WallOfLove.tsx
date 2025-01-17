'use client';
import React from 'react';
import TitleCard from './title-card';
import { MessageCircle } from 'lucide-react';
import { useTheme } from 'next-themes';

const WallOfLove = () => {
  const { theme } = useTheme();

  const textColor = theme === 'dark' ? 'FFFFFF' : '000000';

  return (
    <section className="mb-20 h-full">
      <TitleCard icon={MessageCircle} title={'Tweets'} />

      <div className="my-10 flex items-center justify-center font-secondary text-2xl font-bold md:text-4xl">
        <h3 className="flex w-full flex-col items-center text-center md:w-[70%]">
          <span className="flex">
            People are loving Merged
            <p className="font-secondary text-primary">&</p>Share
          </span>
          <span>out there.</span>
        </h3>
      </div>
      <iframe
        src={`https://embed.viewus.in/?animated=on&slug=merged-and-share&columns=3&tagText=${textColor}&tag=FFFFFF&star=FFD700&text=${textColor}&theme=${theme}&outerRadius=low`}
        width="100%"
        className="rounded-none"
        height="100%"
      ></iframe>
    </section>
  );
};

export default WallOfLove;
