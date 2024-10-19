'use client';
import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { UsersAvatar } from '@/components/users-avatars';
import { Code, GitBranch, GitMerge, GitPullRequest, Globe } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { DesktopScreen } from './desktop-screen';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { motion } from 'framer-motion';
import HeroButtons from './hero-buttons';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
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
        ease: 'easeInOut',
      },
    },
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: 'easeOut',
      },
    },
  };

  const createFloatingAnimation = (delay: number) => ({
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
      delay: delay,
    },
  });

  const desktopScreenVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        delay: 1.5, // Delay to make it appear last
      },
    },
  };
  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative"
    >
      <motion.div
        variants={containerVariants}
        className="z-0 my-20 flex h-fit flex-col items-center justify-center"
      >
        <motion.div
          variants={containerVariants}
          className="flex h-fit flex-col items-center justify-center gap-6"
        >
          <motion.div
            variants={itemVariants}
            className="z-20 w-fit items-center justify-center text-center font-secondary text-3xl font-bold sm:text-5xl md:w-[80%]"
          >
            Showcase your open source contributions as{' '}
            <span className="clip-text h-fit w-fit bg-gradient-to-r from-yellow-500 to-yellow-200 bg-clip-text font-[900] text-transparent transition-all duration-200">
              Proof of Work
            </span>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="text-center font-paragraph text-xs md:w-[40%] md:text-base"
          >
            Highlight your merged pull requests and share your impact on the
            open source community with the world.
          </motion.div>

          <motion.div variants={itemVariants} className="mb-6">
            <UsersAvatar />
          </motion.div>
        </motion.div>

        <motion.div className="mt-4 flex w-full flex-col items-center justify-center gap-4 md:flex-row">
          <HeroButtons />
        </motion.div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        className="flex items-center justify-center gap-8"
      >
        <motion.section
          animate={createFloatingAnimation(0)}
          variants={iconVariants}
          className="left-[12rem] top-[18rem] mb-24 flex -rotate-12 items-center justify-center drop-shadow-[0_10px_60px_#facc15] md:absolute md:m-0 md:drop-shadow-[0_60px_50px_#facc15]"
        >
          <motion.div
            className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-600 md:h-16 md:w-16"
            style={{
              boxShadow:
                '0 10px 30px -10px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.2)',
              transform: 'rotate(-12deg)',
            }}
          >
            <motion.div className="borer-2 w-fit rounded-3xl px-4 py-4">
              <GitMerge className="h-44 w-16 text-black md:w-10" />
            </motion.div>
            <motion.div className="absolute inset-0 bg-gradient-to-br from-transparent to-yellow-900 opacity-30" />

            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-yellow-100 to-transparent opacity-90"
              style={{
                mixBlendMode: 'soft-light',
              }}
            />

            <motion.div
              className="bg-gradient-radial absolute inset-0 from-yellow-100 to-transparent opacity-50"
              style={{
                background:
                  'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8) 0%, transparent 60%)',
              }}
            />

            <motion.div
              className="absolute inset-0 animate-pulse opacity-30"
              style={{
                background:
                  'linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
                backgroundSize: '200% 200%',
                animation: 'gradient 3s ease infinite',
              }}
            />

            <motion.div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-yellow-400 to-transparent opacity-30" />
          </motion.div>
        </motion.section>

        <motion.section
          animate={createFloatingAnimation(0.5)}
          variants={iconVariants}
          className="right-[12rem] top-[18rem] mb-24 flex rotate-12 items-center justify-center drop-shadow-[0_10px_60px_#facc15] md:absolute md:m-0 md:drop-shadow-[0_60px_50px_#facc15]"
        >
          <motion.div
            className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-600 md:h-16 md:w-16"
            style={{
              boxShadow:
                '0 10px 30px -10px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.2)',
              transform: 'rotate(12deg)',
            }}
          >
            <motion.div className="borer-2 w-fit rounded-3xl px-4 py-4">
              <GitHubLogoIcon className="h-44 w-16 text-black md:w-10" />
            </motion.div>
            <motion.div className="absolute inset-0 bg-gradient-to-br from-transparent to-yellow-900 opacity-30" />

            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-yellow-100 to-transparent opacity-90"
              style={{
                mixBlendMode: 'soft-light',
              }}
            />

            <motion.div
              className="bg-gradient-radial absolute inset-0 from-yellow-100 to-transparent opacity-50"
              style={{
                background:
                  'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8) 0%, transparent 60%)',
              }}
            />

            <motion.div
              className="absolute inset-0 animate-pulse opacity-30"
              style={{
                background:
                  'linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
                backgroundSize: '200% 200%',
                animation: 'gradient 3s ease infinite',
              }}
            />

            <motion.div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-yellow-400 to-transparent opacity-30" />
          </motion.div>
        </motion.section>
      </motion.div>

      <motion.div variants={desktopScreenVariants}>
        <DesktopScreen />
      </motion.div>

      <motion.section
        animate={createFloatingAnimation(1)}
        variants={iconVariants}
        className="absolute right-[20rem] top-[11rem] hidden rotate-12 items-center justify-center opacity-40 drop-shadow-[0_60px_50px_#facc15] lg:flex"
      >
        <motion.div
          className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-600 md:h-14 md:w-14"
          style={{
            boxShadow:
              '0 10px 30px -10px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.2)',
            transform: 'rotate(12deg)',
          }}
        >
          <motion.div className="borer-2 w-fit rounded-3xl px-4 py-4">
            <Globe className="h-44 w-16 text-black md:w-8" />
          </motion.div>
          <motion.div className="absolute inset-0 bg-gradient-to-br from-transparent to-yellow-900 opacity-30" />

          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-yellow-100 to-transparent opacity-90"
            style={{
              mixBlendMode: 'soft-light',
            }}
          />

          <motion.div
            className="bg-gradient-radial absolute inset-0 from-yellow-100 to-transparent opacity-50"
            style={{
              background:
                'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8) 0%, transparent 60%)',
            }}
          />

          <motion.div
            className="absolute inset-0 animate-pulse opacity-30"
            style={{
              background:
                'linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
              backgroundSize: '200% 200%',
              animation: 'gradient 3s ease infinite',
            }}
          />

          <motion.div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-yellow-400 to-transparent opacity-30" />
        </motion.div>
      </motion.section>

      <motion.section
        animate={createFloatingAnimation(1.5)}
        variants={iconVariants}
        className="absolute left-[18rem] top-[11rem] hidden -rotate-12 items-center justify-center opacity-40 drop-shadow-[0_60px_50px_#facc15] lg:flex"
      >
        <motion.div
          className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-600 md:h-14 md:w-14"
          style={{
            boxShadow:
              '0 10px 30px -10px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.2)',
            transform: 'rotate(-12deg)',
          }}
        >
          <motion.div className="borer-2 w-fit rounded-3xl px-4 py-4">
            <Code className="h-44 w-16 text-black md:w-8" />
          </motion.div>
          <motion.div className="absolute inset-0 bg-gradient-to-br from-transparent to-yellow-900 opacity-30" />

          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-yellow-100 to-transparent opacity-90"
            style={{
              mixBlendMode: 'soft-light',
            }}
          />

          <motion.div
            className="bg-gradient-radial absolute inset-0 from-yellow-100 to-transparent opacity-50"
            style={{
              background:
                'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8) 0%, transparent 60%)',
            }}
          />

          <motion.div
            className="absolute inset-0 animate-pulse opacity-30"
            style={{
              background:
                'linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
              backgroundSize: '200% 200%',
              animation: 'gradient 3s ease infinite',
            }}
          />

          <motion.div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-yellow-400 to-transparent opacity-30" />
        </motion.div>
      </motion.section>
    </motion.section>
  );
}
