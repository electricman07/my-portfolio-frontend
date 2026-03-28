import { type LucideIcon } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  bg: string;
}

const premiumCardClasses = `
    p-10 flex flex-col gap-6
    bg-[#F8FAFC] dark:bg-slate-900 
    border-2 border-slate-300 dark:border-slate-600 
    rounded-[3rem] shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2
  `;

export function ServiceCard({
  title,
  description,
  icon: Icon,
  color,
}: ServiceCardProps) {
  return (
    <div className={premiumCardClasses}>
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
