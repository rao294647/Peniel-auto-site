import Header from "@/components/ui/Header";
import Banner from "@/sections/Banner";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import BentoGrid from "@/sections/BentoGrid";
import MeetPastor from "@/sections/MeetPastor";
import GetInvolved from "@/sections/GetInvolved";
import Announcements from "@/sections/Announcements";
import GallerySection from "@/sections/GallerySection";
import GivingSection from "@/sections/GivingSection";
import Footer from "@/components/ui/Footer";

export default function Home() {
  return (
    <main className="bg-[#0a0a0a] min-h-screen text-white selection:bg-church-gold selection:text-black">
      <Header />
      <Hero />
      <BentoGrid />
      <MeetPastor />
      <About />
      <GetInvolved />
      <Announcements />
      <GallerySection />
      <GivingSection />
      <Banner />
      <Footer />
    </main>
  );
}
