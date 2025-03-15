import Contact from "@/components/Contact";
import Cta from "@/components/Cta";
import Fitur from "@/components/Fitur";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Lokasi from "@/components/Lokasi";
import Navbar from "@/components/Navbar";
import Rooms from "@/components/Rooms";
import Testimonials from "@/components/Testimonials";


export default function Home() {
  return (
      <div className="min-h-screen  bg-white">
        <Navbar />

        <main className="overflow-x-hidden">
          <Hero />
          <Fitur />
          <Rooms />
          <Testimonials />
          <Lokasi />
          <Contact/>
          <Cta/>
        </main>
      <Footer/>
      </div>
  );
}
