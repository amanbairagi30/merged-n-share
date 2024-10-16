"use client";
import React, { useState } from 'react';
import TitleCard from './title-card';
import { MessageSquareQuote, Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import X from './svgs/x';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { motion } from "framer-motion";

const testimonials = [
    {
        name: "Harkirat Singh",
        role: "Founder @100xdevs and Full Stack Developer",
        avatar: "https://avatars.githubusercontent.com/u/8079861",
        quote: "Oh! That looks good !",
        x: "https://x.com/kirat_tw",
        github: "https://github.com/hkirat",
        rating: 4
    },
    {
        name: "Sargam Poudel",
        role: "SWE Intern at DropStation",
        avatar: "https://avatars.githubusercontent.com/u/76874341",
        quote: "Wow bro , looks decent , great project must say!",
        x: "https://x.com/sargampoudel",
        github: "https://github.com/devsargam",
        rating: 4
    },
    {
        name: "Nimit Haria",
        role: "SDE at Browserstack",
        avatar: "https://avatars.githubusercontent.com/u/37402791",
        quote: "Looking Super Cool 🔥🔥🔥 , Good Work",
        x: "https://x.com/devnimit",
        github: "https://github.com/nimit9",
        rating: 4
    },
    {
        name: "Vineet Agarwal",
        role: "SWE Intern at ConcertPal",
        avatar: "https://avatars.githubusercontent.com/u/91052168",
        quote: "Looks cool + feature is also good",
        x: "https://x.com/vineetwts",
        github: "https://github.com/vineeTagarwaL-code",
        rating: 4
    }
]

export default function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0)

    const nextTestimonial = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }

    const prevTestimonial = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
    }

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
        <>
            <motion.section
                id='testimonials'
                className='h-fit flex flex-col items-center my-[10rem] py-4'
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={containerVariants}
            >
                <motion.div variants={itemVariants}>
                    <TitleCard icon={MessageSquareQuote} title={'Testimonials'} />
                </motion.div>

                <motion.div
                    className='mt-10 text-2xl md:text-4xl font-secondary flex items-center justify-center font-bold'
                    variants={itemVariants}
                >
                    <div className='w-full md:w-[80%] text-center'>
                        <div>
                            Still confused ?
                        </div>
                        <div>See what existing developers have to say about us.</div>
                    </div>
                </motion.div>

                <motion.div
                    className='mt-8 mb-2 relative w-full lg:w-[70%] h-fit lg:h-[24rem]'
                    variants={itemVariants}
                >
                    <div className='flex transition-transform duration-500 ease-in-out'
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className='w-full flex-shrink-0 px-4'>
                                <div className='grid grid-cols-1 lg:grid-cols-5 gap-4 border-2 p-4 rounded-xl'>
                                    <div className='col-span-1 overflow-hidden relative md:col-span-3 bg-accent/30 flex flex-col rounded-xl p-4 min-h-[20rem] max-h-fit lg:h-auto'>
                                        <div className='flex items-center mb-4'>
                                            <Avatar className="h-12 w-12 mr-4">
                                                <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                                                <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h3 className="text-xl font-semibold">{testimonial.name}</h3>
                                                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                            </div>
                                        </div>
                                        <div className='flex-grow my-4 px-2'>
                                            <p className="text-xl">
                                                {testimonial.quote}
                                            </p>
                                        </div>
                                        <Quote className='absolute right-0 opacity-10 -bottom-10 fill-primary/50 text-primary w-40 h-40' />
                                        <div className='flex justify-start space-x-4'>
                                            <Link href={testimonial.x} target='_blank'>
                                                <X className="w-6 h-6 dark:invert cursor-pointer" />
                                            </Link>
                                            <Link href={testimonial.github} target='_blank'>
                                                <GitHubLogoIcon className="w-6 h-6  cursor-pointer" />
                                            </Link>
                                        </div>
                                    </div>
                                    <div className='col-span-1 md:col-span-2  drop-shadow-2xl drop flex flex-col border-primary gap-1 md:gap-4 items-center justify-center border-2 bg-primary/5 rounded-xl p-4 h-[10rem] lg:h-auto'>
                                        <div>Rated this project</div>
                                        <div className='flex items-center gap-2'>
                                            <p className='font-secondary flex items-center gap-4 text-6xl lg:text-8xl font-extrabold'>{testimonial.rating} </p>
                                            <Star className='fill-yellow-500 w-12 h-12 lg:w-16 lg:h-16 text-yellow-500' />
                                        </div>
                                        <div>stars</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
                <div className=' flex justify-center space-x-4'>
                    <Button onClick={prevTestimonial} variant="outline" size="lg" className="rounded-full">
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button onClick={nextTestimonial} variant="outline" size="lg" className="rounded-full">
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>

                <div className='mt-20 flex flex-col items-center gap-6 justify-center'>
                    <h3 className='text-2xl md:text-3xl font-secondary font-extrabold text-center'>Just try it by yourself and you won&apos;t regret.</h3>
                    <Button onClick={async () => await signIn()} className='rounded-full md:text-xl md:h-12 md:px-10 font-secondary font-extrabold hover:shadow-xl transition-all ease-in-out duration-200 hover:shadow-primary/60'>Get Started</Button>
                </div>
            </motion.section>
        </>
    )
}