// All these pages will show on the website

import Dashboard from "@/components/base-components/Dashboard";
import Footer from "@/components/base-components/Footer";
import Navbar from "@/components/base-components/Navbar";
import { BentoGridPage } from "@/components/pages-components/BenteogridPage";
import EmailPage from "@/components/pages-components/Email-Page";
import Hero from "@/components/pages-components/Hero";
import HeroSection from "@/components/pages-components/HeroSection";
import Post from "@/components/pages-components/Post";
import PricingPage from "@/components/pages-components/Pricing-Page";
import SimpleTestimonial from "@/components/pages-components/SimpleTestimonial";
import LinkSocialMedia from "@/components/pages-components/Socials";
import Particles from "@/components/ui/particles";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      {/* <Navbar/> */}
      <Hero/>
      <Dashboard/>
      <Post/>
      <Particles
        className="absolute inset-0"
        quantity={100}
        ease={80}
        color="#ffffff"
        refresh
      />
    </div>
  );
}