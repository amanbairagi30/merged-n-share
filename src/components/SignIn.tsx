'use client';
import GoogleIcon from '../app/assets/google.svg';
import GithubIcon from '../app/assets/github.svg';
import { signIn, useSession } from 'next-auth/react';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Star } from 'lucide-react';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
const SignIn = () => {
  const session = useSession();
  const router = useRouter();

  const redirected = useRef(false);
  useEffect(() => {
    if (redirected.current === false && session.data?.user) {
      const redirectUrl = localStorage.getItem('loginRedirectUrl');
      localStorage.removeItem('loginRedirectUrl');
      router.replace(redirectUrl || '/');
      redirected.current = true;
    }
  }, [redirected, session, router]);

  const testimonials = [
    {
      name: 'Harkirat Singh',
      role: 'Founder @100xdevs and Full Stack Developer',
      avatar: 'https://avatars.githubusercontent.com/u/8079861',
      quote: 'Oh! That looks good !',
      rating: 4,
    },
    {
      name: 'Sargam Poudel',
      role: 'SWE Intern at DropStation',
      avatar: 'https://avatars.githubusercontent.com/u/76874341',
      quote: 'Wow bro , looks decent , great project must say!',
      rating: 4,
    },
    {
      name: 'Nimit Haria',
      role: 'SDE at Browserstack',
      avatar: 'https://avatars.githubusercontent.com/u/37402791',
      quote: 'Looking Super Cool 🔥🔥🔥 , Good Work',
      rating: 4,
    },
    {
      name: 'Vineet Agarwal',
      role: 'SWE Intern at ConcertPal',
      avatar: 'https://avatars.githubusercontent.com/u/91052168',
      quote: 'Looks cool + feature is also good',
      rating: 4,
    },
  ];

  return (
    <>
      <section className="h-screen px-4">
        <div className="absolute -bottom-[2rem] left-[50%] -z-0 size-[4rem] translate-x-[-50%] rounded-full border-2 border-white bg-gradient-to-t from-yellow-400 to-yellow-700 opacity-100 blur-[8em] md:bottom-[0rem] md:size-[10rem]"></div>
        <div className="mx-auto flex h-full max-w-[1180px] items-center justify-center">
          <div className="flex w-full max-w-2xl flex-col gap-10">
            <div className="h-fit p-4 lg:h-[30rem]">
              <h6 className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                Hi there and Welcome to,
              </h6>

              <aside className="flex flex-col gap-[10px]">
                <h1 className="font-secondary text-4xl font-extrabold">
                  Merged<span className="text-primary">&</span>Share .
                </h1>
                <p className="w-full text-xs dark:text-gray-300 lg:text-sm">
                  A platform to showcase your{' '}
                  <span className="text-primary">
                    open source contributions
                  </span>{' '}
                  to the world with a{' '}
                  <span className="text-primary">single click.</span>{' '}
                </p>
              </aside>

              <aside className="relative mt-6 h-[20rem] lg:h-[20rem]">
                {testimonials.map((testimonial, index, arr) => (
                  <div
                    key={index}
                    className={`absolute left-1/2 w-full -translate-x-1/2 rounded-xl border-2 p-4 shadow-lg transition-all duration-300 ease-in-out ${index === arr.length - 1 ? 'opacity-10' : null} ${
                      index === 0
                        ? 'bg-background shadow-primary/5'
                        : 'bg-background'
                    }`}
                    style={{
                      top: `${index * 2}rem`,
                      zIndex: testimonials.length - index,
                      transform: `translate(-50%, 0) scale(${1 - index * 0.05})`,
                      opacity: 1 - index * 0.2,
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-grow">
                        <div className="mb-4 flex items-center">
                          <Avatar className="mr-4 h-8 w-8">
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
                            <h3 className="text-md font-semibold">
                              {testimonial.name}
                            </h3>
                            <p className="text-xs text-muted-foreground">
                              {testimonial.role}
                            </p>
                          </div>
                        </div>
                        <div className="mb-4">
                          <p className="text-sm">{testimonial.quote}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-center justify-center gap-1 rounded-xl border-2 border-primary bg-primary/5 p-2 drop-shadow-2xl md:gap-4">
                        <div className="flex items-center gap-2">
                          <p className="flex items-center gap-4 font-secondary text-lg font-normal">
                            {testimonial.rating}
                          </p>
                          <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </aside>
            </div>

            <div className="z-50 flex max-h-fit flex-col gap-4 rounded-xl border-2 bg-background/50 p-4">
              <h1 className="font-secondary text-2xl font-bold">Sign Up</h1>
              <p className="text-sm dark:text-gray-400">
                Sign up with your GitHub account to get started quickly.
                It&apos;s fast and easy!
              </p>
              <Button
                onClick={async () => {
                  await signIn('github');
                }}
                variant={'outline'}
                className="h-[3rem] w-full rounded-xl bg-primary p-4 font-semibold text-black hover:bg-accent"
              >
                <GitHubLogoIcon className="mr-2 h-4 w-4" />
                Continue with Github
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
    // <div className="flex bg-black">
    //   <div className="w-full md:w-2/5 bg-black flex justify-center items-center h-screen max-sm:hidden max-md:hidden">
    //     <div>
    //       <aside className="text-4xl font-bold mb-4 text-white">
    //         <div className="flex items-center gap-[10px]">
    //           <p className="text-neutral-100 text-4xl font-extrabold">Merged<span className="text-blue-500">&</span>Share</p>
    //         </div>
    //       </aside>
    //       <div className="grid grid-cols-3 gap-4">
    //         {[...Array(9)].map((_, index) => (
    //           <div key={index} className="opacity-50">
    //             <i className="fas fa-arrow-down fa-3x"></i>
    //           </div>
    //         ))}
    //       </div>
    //     </div>
    //   </div>
    //   <div className="w-full h-screen md:w-3/5 bg-gray-900 flex justify-center items-center">
    //     <div className="w-full max-w-md">
    //       <div className="p-5">
    //         <h2 className="text-2xl font-semibold mb-2 text-white text-center">Log In</h2>
    //       </div>
    //       <div className=" mb-4  justify-center py-1 sm:px-6 lg:px-8 ">
    //         <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    //           <div className="bg-white py-12 px-4 shadow sm:rounded-lg sm:px-10">
    //             <div className="flex flex-col items-center justify-center gap-4">
    //               <p className="font-normal text-2xl text-gray-900">Welcome</p>

    //               <p className="font-light text-sm text-gray-600">Log in to continue to Merged&Share.</p>
    //               <button
    //                 className="w-full flex justify-center items-center gap-2 py-3 px-4 border rounded font-light text-md text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-2 -mt-2"
    //                 onClick={async () => {
    //                   await signIn("github");
    //                 }}
    //               >
    //                 <Image src={GithubIcon.src} className="w-5 h-5 mr-2" alt="Github Icon" width={25} height={25} />
    //                 Continue with Github
    //               </button>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};
export { GithubIcon };

export default SignIn;
