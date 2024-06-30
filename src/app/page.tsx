import { Navbar } from "@/components/Navbar";
import LaptopScreen from "@/components/LaptopScreen";

export default function Home() {
  return (
    <div className="w-full overflow-hidden h-[100vh] py-8 bg-[#0f0f0f] dark:bg-grid-white/[0.2] bg-grid-white/[0.05] relative " >
      <div className=" max-w-[1080px]  px-8 mx-auto">
        <Navbar />
        <div className=" mt-16 z-0 flex text-white flex-col h-fit  items-center justify-center">
          <div className="w-fit border-2 items-center justify-center rounded-full text-center text-sm py-1 inline-flex h-fit animate-shimmer border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            Let the world know about your skills

          </div>
          <p className="text-3xl font-extrabold sm:text-5xl w-fit md:w-[60%] text-center z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
            Showcase your Open Source contribution as POW to the world
          </p>
        </div>

        <LaptopScreen />
      </div>
    </div>
  );
}
