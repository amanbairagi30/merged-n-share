import Features from "@/components/features";
import Footer from "@/components/footer";
import Hero from "@/components/Hero";
import ProductDemo from "@/components/product-demo";
import Testimonials from "@/components/testimonials";

export default function Home() {
  return (
    <main>
      <Hero />
      {/* <ProductDemo /> */}
      <Features />
      <Testimonials />
      <Footer />
    </main>
  );
}
