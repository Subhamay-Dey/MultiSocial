import Dashboard from "@/components/base-components/Dashboard";
import Navbar from "@/components/base-components/Navbar";
import Hero from "@/components/pages-components/Hero";
import Post from "@/components/pages-components/Post";
import Particles from "@/components/ui/particles";


export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <Navbar/>
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