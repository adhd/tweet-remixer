import { SparklesCore } from "./ui/sparkles";

export default function HeroHeader() {
  return (
    <div className="relative w-full flex flex-col items-center justify-center">
      {/* Main title */}
      <h1 className="text-6xl font-bold text-center text-white relative z-20">
        tweetgen
      </h1>
      
      {/* Sparkles container - increased height and adjusted margins */}
      <div className="w-[40rem] h-40 relative -mt-12">
        <SparklesCore
          background="transparent"
          minSize={1.5}
          maxSize={3}
          particleDensity={200}
          className="w-full h-full"
          particleColor="#FFFFFF"
          speed={2}
        />

        {/* Radial Gradient - adjusted for more visible particles */}
        <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_40%,black)]"></div>
      </div>

      {/* Subheader - adjusted margin for new container size */}
      <h2 className="text-xl text-white/80 text-center relative z-20 -mt-16">
        Transform your ideas into engaging tweets with AI
      </h2>
    </div>
  );
} 