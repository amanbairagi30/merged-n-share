'use client';
import React, { useState } from 'react';
import TitleCard from './title-card';
import {
  MessageSquareQuote,
  Star,
  ChevronLeft,
  ChevronRight,
  Quote,
} from 'lucide-react';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import X from './svgs/x';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Harkirat Singh',
    role: 'Founder @100xdevs and Full Stack Developer',
    avatar: 'https://avatars.githubusercontent.com/u/8079861',
    quote: 'Oh! That looks good !',
    x: 'https://x.com/kirat_tw',
    github: 'https://github.com/hkirat',
    rating: 4,
  },
  {
    name: 'Manu Arora',
    role: 'Founder @AceternityLabs',
    avatar: 'https://avatars.githubusercontent.com/u/23276437',
    quote: 'Looks superclean and good',
    x: 'https://x.com/mannupaaji',
    github: 'https://github.com/manuarora700',
    rating: 4,
  },
  {
    name: 'Sargam Poudel',
    role: 'SWE @DropStation',
    avatar: 'https://avatars.githubusercontent.com/u/76874341',
    quote: 'Wow bro , looks decent , great project must say!',
    x: 'https://x.com/sargampoudel',
    github: 'https://github.com/devsargam',
    rating: 4,
  },
  {
    name: 'Nimit Haria',
    role: 'SDE @Browserstack',
    avatar: 'https://avatars.githubusercontent.com/u/37402791',
    quote: 'Looking Super Cool 🔥🔥🔥 , Good Work',
    x: 'https://x.com/devnimit',
    github: 'https://github.com/nimit9',
    rating: 4,
  },
  {
    name: 'Vineet Agarwal',
    role: 'SWE @ConcertPal',
    avatar: 'https://avatars.githubusercontent.com/u/91052168',
    quote: 'Looks cool + feature is also good',
    x: 'https://x.com/vineetwts',
    github: 'https://github.com/vineeTagarwaL-code',
    rating: 4,
  },
  {
    name: 'Ankur Sharma',
    role: 'SDE Intern @Thinkit Club',
    avatar: 'https://avatars.githubusercontent.com/u/97390674',
    quote: 'Looks cool + feature is also good',
    x: 'https://x.com/ankursharma1493',
    github: 'https://github.com/ankur1493',
    rating: 4,
  },
  {
    name: 'Tanmay Dhobale',
    role: 'Full Stack Developer',
    avatar: 'https://avatars.githubusercontent.com/u/89733575',
    quote: 'Damn bro looks good , UI also looks fire 🔥',
    x: 'https://x.com/tanmayy4l',
    github: 'https://github.com/TanmayDhobale',
    rating: 4,
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + testimonials.length) % testimonials.length,
    );
  };

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
    <>
      <motion.section
        id="testimonials"
        className="my-[10rem] flex h-fit flex-col items-center py-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <TitleCard icon={MessageSquareQuote} title={'Testimonials'} />
        </motion.div>

        <motion.div
          className="mt-10 flex items-center justify-center font-secondary text-2xl font-bold md:text-4xl"
          variants={itemVariants}
        >
          <div className="w-full text-center md:w-[80%]">
            <div>Still confused ?</div>
            <div>See what existing developers have to say about us.</div>
          </div>
        </motion.div>

        <motion.div
          className="relative mb-2 mt-8 h-fit w-full lg:h-[24rem] lg:w-[70%]"
          variants={itemVariants}
        >
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {testimonials.map((testimonial, index) => (
              <div key={index} className="w-full flex-shrink-0 px-4">
                <div className="grid grid-cols-1 gap-4 rounded-xl border-2 p-4 lg:grid-cols-5">
                  <div className="relative col-span-1 flex max-h-fit min-h-[20rem] flex-col overflow-hidden rounded-xl bg-accent/30 p-4 md:col-span-3 lg:h-auto">
                    <div className="mb-4 flex items-center">
                      <Avatar className="mr-4 h-12 w-12">
                        <AvatarImage
                          src={testimonial.avatar}
                          alt={testimonial.name}
                        />
                        <AvatarFallback>
                          {testimonial.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-xl font-semibold">
                          {testimonial.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                    <div className="my-4 flex-grow px-2">
                      <p className="text-xl">{testimonial.quote}</p>
                    </div>
                    <Quote className="absolute -bottom-10 right-0 h-40 w-40 fill-primary/50 text-primary opacity-10" />
                    <div className="flex justify-start space-x-4">
                      <Link href={testimonial.x} target="_blank">
                        <X className="h-6 w-6 cursor-pointer dark:invert" />
                      </Link>
                      <Link href={testimonial.github} target="_blank">
                        <GitHubLogoIcon className="h-6 w-6 cursor-pointer" />
                      </Link>
                    </div>
                  </div>
                  <div className="drop col-span-1 flex h-[10rem] flex-col items-center justify-center gap-1 rounded-xl border-2 border-primary bg-primary/5 p-4 drop-shadow-2xl md:col-span-2 md:gap-4 lg:h-auto">
                    <div>Rated this project</div>
                    <div className="flex items-center gap-2">
                      <p className="flex items-center gap-4 font-secondary text-6xl font-extrabold lg:text-8xl">
                        {testimonial.rating}{' '}
                      </p>
                      <Star className="h-12 w-12 fill-yellow-500 text-yellow-500 lg:h-16 lg:w-16" />
                    </div>
                    <div>stars</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
        <div className="flex justify-center space-x-4">
          <Button
            onClick={prevTestimonial}
            variant="outline"
            size="lg"
            className="rounded-full"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            onClick={nextTestimonial}
            variant="outline"
            size="lg"
            className="rounded-full"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-20 flex flex-col items-center justify-center gap-6">
          <h3 className="text-center font-secondary text-2xl font-extrabold md:text-3xl">
            Just try it by yourself and you won&apos;t regret.
          </h3>
          <Button
            onClick={async () => await signIn()}
            className="rounded-full font-secondary font-extrabold transition-all duration-200 ease-in-out hover:shadow-xl hover:shadow-primary/60 md:h-12 md:px-10 md:text-xl"
          >
            Get Started
          </Button>
        </div>
      </motion.section>
    </>
  );
}
