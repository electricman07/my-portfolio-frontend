import { Target, Zap, ShieldCheck, Heart } from "lucide-react";

export function CoreValues() {
  const values = [
    {
      title: "Efficiency",
      icon: Zap,
      desc: "Writing clean, optimized code for maximum performance.",
    },
    {
      title: "Strategy",
      icon: Target,
      desc: "Planning every pixel with user behavior and goals in mind.",
    },
    {
      title: "Trust",
      icon: ShieldCheck,
      desc: "Maintaining transparency and security in every partnership.",
    },
    {
      title: "Passion",
      icon: Heart,
      desc: "Crafting digital products with care and attention to detail.",
    },
  ];

  return (
    <section>
      <h2 className="text-3xl font-bold mb-12 text-center">My Core Values</h2>
      <div className="grid md:grid-cols-4 gap-6">
        {values.map((v, i) => (
          <div
            key={i}
            className="p-8 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm hover:border-blue-500 transition-colors"
          >
            <v.icon className="mb-4 text-blue-500" size={32} />
            <h3 className="font-bold text-xl mb-2">{v.title}</h3>
            <p className="text-slate-500 text-sm">{v.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
