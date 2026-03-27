export function ExperienceStats() {
  const stats = [
    { label: "Years Experience", value: "5+" },
    { label: "Projects Completed", value: "120+" },
    { label: "Happy Clients", value: "98%" },
    { label: "Technologies", value: "15+" },
  ];

  return (
    <section className="bg-slate-50 dark:bg-slate-900/50 rounded-3xl p-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center border border-slate-100 dark:border-slate-800">
      {stats.map((stat, i) => (
        <div key={i}>
          <div className="text-4xl font-black text-blue-600 dark:text-blue-400 mb-2">
            {stat.value}
          </div>
          <div className="text-sm font-semibold text-slate-500 uppercase tracking-widest">
            {stat.label}
          </div>
        </div>
      ))}
    </section>
  );
}
