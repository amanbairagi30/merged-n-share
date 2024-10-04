import Features from "@/components/features";
import Footer from "@/components/footer";
import Hero from "@/components/Hero";
import Statistics from "@/components/statistics";
import Testimonials from "@/components/testimonials";

export default function Home() {
  return (
    <section className="min-h-screen py-8 relative overflow-hidden">
      <div className='absolute left-[50%] translate-x-[-50%] md:opacity-45 -top-[10rem] md:-top-[35rem] size-[12rem] md:size-[40rem] rounded-full bg-gradient-to-t from-yellow-400 to-yellow-700 blur-[8em]'></div>
      <div className='absolute left-[50%] -z-0 border-2 opacity-75 border-white translate-x-[-50%] -bottom-[2rem] md:-bottom-[6rem] size-[12rem] md:size-[14rem] rounded-full bg-gradient-to-t from-yellow-400 to-yellow-700 blur-[8em]'></div>

      <div className="max-w-[1180px] px-4 mx-auto">
        <Hero />
        {/* <ProductDemo /> */}
        <Features />
        <Statistics />
        <Testimonials />
        <Footer />
      </div>
    </section>
  );
}
