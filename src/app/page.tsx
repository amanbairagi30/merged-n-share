import Features from "@/components/features";
import Footer from "@/components/footer";
import Hero from "@/components/Hero";
import Statistics from "@/components/statistics";
import Testimonials from "@/components/testimonials";

export default function Home() {
  return (
    <main>
      <Hero />
      {/* <ProductDemo /> */}
      <Features />
      <Statistics />
      <Testimonials />
      <Footer />
    </main>
  );
}
