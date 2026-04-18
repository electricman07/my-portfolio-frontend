import * as LucideIcons from "lucide-react";

export function CoreValues({ values }: { values: any[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {values.map((v: any, i: number) => {
        const IconComponent =
          (LucideIcons as any)[v.iconName] || LucideIcons.HelpCircle;

        return (
          <div
            key={v.id || i}
            className="p-10 flex flex-col items-start text-left transition-all duration-500 group bg-white dark:bg-slate-950 border-2 border-slate-300 dark:border-slate-800 rounded-[3rem] shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] hover:-translate-y-3 hover:shadow-2xl hover:border-blue-500"
          >
            <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center mb-8 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 transition-colors duration-500">
              <IconComponent
                className="text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-500"
                size={32}
              />
            </div>

            <h3 className="text-2xl font-black mb-4 tracking-tight text-slate-900 dark:text-white">
              {v.title}
            </h3>

            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-medium">
              {v.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}
