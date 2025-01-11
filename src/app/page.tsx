import Features from '@/components/features';
import Footer from '@/components/footer';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/how-it-works';
import { Navbar } from '@/components/Navbar';
import Statistics from '@/components/statistics';
import Testimonials from '@/components/testimonials';
// import WallOfLove from '@/components/WallOfLove';

export default function Home() {
  return (
    <section className="relative min-h-screen overflow-hidden py-8">
      <div className="absolute -top-[10rem] left-[50%] size-[12rem] translate-x-[-50%] rounded-full bg-gradient-to-t from-yellow-400 to-yellow-700 blur-[8em] md:-top-[35rem] md:size-[40rem] md:opacity-55"></div>
      <div className="absolute -bottom-[2rem] left-[50%] -z-0 size-[12rem] translate-x-[-50%] rounded-full border-2 border-white bg-gradient-to-t from-yellow-400 to-yellow-700 opacity-75 blur-[8em] md:-bottom-[6rem] md:size-[14rem]"></div>

      <div className="fixed left-[50%] top-4 z-[999] w-full max-w-7xl translate-x-[-50%] rounded-xl bg-foreground/5 backdrop-blur-sm dark:bg-white/10">
        <Navbar />
      </div>

      <div className="mx-auto mt-28 max-w-[1180px] px-4">
        <Hero />
        <HowItWorks />
        <Features />
        {/* <WallOfLove /> */}
        <Statistics />
        <Testimonials />
        <Footer />
      </div>
    </section>
  );
}
