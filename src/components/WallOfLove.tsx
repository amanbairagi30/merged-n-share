import React from 'react';
import TitleCard from './title-card';
import { MessageCircle } from 'lucide-react';

const WallOfLove = () => {
  return (
    <section className="mb-20 h-full">
      <TitleCard icon={MessageCircle} title={'Tweets'} />

      {/* <div className='rounded-full w-[30rem] h-[30rem] absolute top-[30%] drop-shadow-[0_10px_20px_#facc15] blur-[80px] opacity-10 dark:opacity-30 bg-primary'></div> */}

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
        src="https://embed.viewus.in/?animated=on&slug=merged-and-share&columns=3&tagText=000000&tag=FFFFFF&star=FFD700&text=FFFFFF&cardBorderColor=FFD700&cardBackground=0c0a09&background=0c0a09&theme=dark&outerRadius=low"
        width="100%"
        className="rounded-none"
        height="100%"
      ></iframe>
    </section>
  );
};

export default WallOfLove;
