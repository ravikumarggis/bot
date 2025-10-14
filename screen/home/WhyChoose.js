import { Zap, Brain, Lock, Coins, Users } from "lucide-react";

export default function WhyChoose() {
  const features = [
    {
      icon: <Zap className="w-8 h-8 text-blue-400" />,
      title: "1-Week Free Trial",
      desc: "Experience full bot power before you subscribe.",
      position: "top-0 left-1/2 -translate-x-1/2 -translate-y-1/3",
    },
    {
      icon: <Brain className="w-8 h-8 text-purple-400" />,
      title: "Smart Automation",
      desc: "Time-tested, cloud-based bots running 24/7 with real-time optimization.",
      position: "top-1/2 right-0 -translate-y-1/2 translate-x-1/3",
    },
    {
      icon: <Lock className="w-8 h-8 text-cyan-400" />,
      title: "100% Fund Security",
      desc: "Your money stays in your exchange, we only trade via APIs.",
      position: "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/3",
    },
    {
      icon: <Users className="w-8 h-8 text-indigo-400" />,
      title: "Community Driven",
      desc: "Join a fast-growing global trader community.",
      position: "top-1/2 left-0 -translate-y-1/2 -translate-x-1/3",
    },
    {
      icon: <Coins className="w-8 h-8 text-blue-400" />,
      title: "Minimal Plans",
      desc: "Start with just $10, available in monthly or yearly plans.",
      position: "bottom-[15%] left-[20%] hidden", // extra feature optional (hidden for now)
    },
  ];

  return (
    <section className="bg-[#030b1f] text-white py-24 px-6 md:px-12 relative overflow-hidden">
      {/* Title */}
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold">
          WHY CHOOSE <span className="text-blue-400">QBOTS</span>
        </h2>
      </div>

      {/* Main Circular Layout */}
      <div className="relative mx-auto max-w-[550px] aspect-square flex items-center justify-center">
        {/* Glowing Circle */}
        <div className="absolute inset-0 rounded-full border border-blue-500/30 blur-[1px]" />
        <div className="absolute inset-0 rounded-full border border-purple-500/20 blur-[2px]" />
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-2xl" />

        {/* Center Q */}
        <div className="relative z-10 flex items-center justify-center w-28 h-28 rounded-full bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-pink-600/30 border border-white/20 shadow-[0_0_40px_rgba(99,102,241,0.3)]">
          <span className="text-4xl font-bold text-white">Q</span>
        </div>

        {/* Feature Elements */}
        {features.map((item, index) => (
          <div
            key={index}
            className={`absolute ${item.position} w-52 text-center space-y-2`}
          >
            <div className="flex flex-col items-center space-y-2">
              <div className="bg-[#0b1229] border border-white/10 p-3 rounded-full">
                {item.icon}
              </div>
              <h3 className="text-base font-semibold">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.05),transparent_70%)] pointer-events-none" />
    </section>
  );
}
