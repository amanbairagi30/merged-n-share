"use client";
import GoogleIcon from "../app/assets/google.svg";
import GithubIcon from "../app/assets/github.svg";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Star } from "lucide-react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
const SignIn = () => {
  const session = useSession();
  const router = useRouter();

  const redirected = useRef(false);
  useEffect(() => {
    if (redirected.current === false && session.data?.user) {
      const redirectUrl = localStorage.getItem("loginRedirectUrl");
      localStorage.removeItem("loginRedirectUrl");
      router.replace(redirectUrl || "/");
      redirected.current = true;
    }
  }, [redirected, session, router]);

  const testimonials = [
    {
      name: "Harkirat Singh",
      role: "Founder @100xdevs and Full Stack Developer",
      avatar: "https://avatars.githubusercontent.com/u/8079861",
      quote: "Oh! That looks good !",
      rating: 4
    },
    {
      name: "Sargam Poudel",
      role: "SWE Intern at DropStation",
      avatar: "https://avatars.githubusercontent.com/u/76874341",
      quote: "Wow bro , looks decent , great project must say!",
      rating: 4
    },
    {
      name: "Nimit Haria",
      role: "SDE at Browserstack",
      avatar: "https://avatars.githubusercontent.com/u/37402791",
      quote: "Looking Super Cool 🔥🔥🔥 , Good Work",
      rating: 4
    },
    {
      name: "Vineet Agarwal",
      role: "SWE Intern at ConcertPal",
      avatar: "https://avatars.githubusercontent.com/u/91052168",
      quote: "Looks cool + feature is also good",
      rating: 4
    }
  ]

  return (
    <>
      <section className="h-screen px-4">
        <div className='absolute left-[50%] -z-0 border-2 opacity-100 border-white translate-x-[-50%] -bottom-[2rem] md:bottom-[0rem] size-[4rem] md:size-[10rem] rounded-full bg-gradient-to-t from-yellow-400 to-yellow-700 blur-[8em]'></div>
        <div className="max-w-[1180px] flex items-center justify-center h-full mx-auto ">
          <div className="flex flex-col max-w-2xl gap-10 w-full">

            <div className="h-fit lg:h-[30rem] p-4">
              <h6 className="text-sm mb-4 text-gray-500 dark:text-gray-400">Hi there and Welcome to,</h6>

              <aside className="flex flex-col gap-[10px]">
                <h1 className="text-4xl font-extrabold font-secondary">Merged<span className="text-primary">&</span>Share .</h1>
                <p className="text-xs lg:text-sm dark:text-gray-300 w-full ">A  platform to showcase your <span className="text-primary">open source contributions</span> to the world with a <span className="text-primary">single click.</span> </p>
              </aside>

              <aside className="h-[20rem] lg:h-[20rem] relative mt-6">
                {testimonials.map((testimonial, index, arr) => (
                  <div
                    key={index}
                    className={`border-2 shadow-lg  absolute p-4 w-full left-1/2 -translate-x-1/2 rounded-xl transition-all duration-300 ease-in-out ${index === arr.length - 1 ? "opacity-10" : null} ${index === 0 ? 'bg-background shadow-primary/5 ' : 'bg-background'
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
                        <div className='flex items-center mb-4'>
                          <Avatar className="h-8 w-8 mr-4">
                            <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                            <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="text-md font-semibold">{testimonial.name}</h3>
                            <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                          </div>
                        </div>
                        <div className='mb-4'>
                          <p className="text-sm">
                            {testimonial.quote}
                          </p>
                        </div>
                      </div>
                      <div className='drop-shadow-2xl flex flex-col border-primary gap-1 md:gap-4 items-center justify-center border-2 bg-primary/5 rounded-xl p-2'>
                        <div className='flex items-center gap-2'>
                          <p className='font-secondary flex items-center gap-4 text-lg font-normal'>{testimonial.rating}</p>
                          <Star className='fill-yellow-500 w-4 h-4 text-yellow-500' />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </aside>
            </div>

            <div className="max-h-fit flex z-50 bg-background/50  flex-col border-2 rounded-xl gap-4 p-4">
              <h1 className="text-2xl font-bold font-secondary">Sign Up</h1>
              <p className="text-sm dark:text-gray-400 ">Sign up with your GitHub account to get started quickly. It&apos;s fast and easy!</p>
              <Button onClick={async () => {
                await signIn("github");
              }} variant={'outline'} className="h-[3rem]  w-full bg-primary text-black font-semibold hover:bg-accent p-4 rounded-xl">
                <GitHubLogoIcon className="w-4 h-4 mr-2" />
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
