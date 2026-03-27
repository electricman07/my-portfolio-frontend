import { type LucideIcon } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  bg: string;
}

export function ServiceCard({
  title,
  description,
  icon: Icon,
  color,
}: ServiceCardProps) {
  return (
    <div className="group p-10 flex flex-col h-full transition-all duration-500 ease-out bg-white dark:bg-slate-950 border-2 border-slate-300 dark:border-slate-800 rounded-[3rem] shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] hover:-translate-y-3 hover:shadow-2xl hover:border-blue-500">
      {/* 3. ICON CONTAINER: Tinted background for better definition */}
      <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center mb-8 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 transition-colors duration-500">
        <Icon
          size={32}
          style={{ color: color || "#3b82f6" }}
          className="group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* 4. TEXT CONTENT */}
      <h3 className="text-2xl font-black mb-4 tracking-tight text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
        {title}
      </h3>

      <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium text-sm">
        {description}
      </p>
    </div>
  );
}
