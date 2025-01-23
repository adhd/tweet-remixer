"use client";
import { SparklesCore } from "@/components/ui/sparkles";

export default function HeroHeader() {
  return (
    <div className="relative w-full flex flex-col items-center justify-center">
      {/* Main title */}
      <h1 className="text-6xl font-bold text-center text-white relative z-20">
        tweetgen
      </h1>
      
      {/* Sparkles container */}
      <div className="w-[40rem] h-20 relative -mt-8">
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={70}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />

        {/* Radial Gradient */}
        <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,black)]"></div>
      </div>

      {/* Subheader - positioned to overlap with sparkles */}
      <h2 className="text-xl text-white/80 text-center relative z-20 -mt-10">
        Transform your ideas into engaging tweets with AI
      </h2>
    </div>
  );
} 