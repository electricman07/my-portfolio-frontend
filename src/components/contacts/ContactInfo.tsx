import { FaRegEnvelope } from "react-icons/fa6";
import { SOCIALS } from "../../lib/socials";

export function ContactInfo() {
  return (
    <div className="p-10 flex flex-col h-full transition-all duration-500 ease-out bg-white dark:bg-slate-950 border-2 border-slate-300 dark:border-slate-800 rounded-[3rem] shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)]hover:shadow-2xl space-y-12">
      {/* DIRECT CONTACT */}
      <div className="space-y-6">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
          Direct Channel
        </h3>
        <a
          href="mailto:gmpopowich@gmail.com"
          className="group flex items-center gap-5 p-4 rounded-3xl bg-slate-50 dark:bg-slate-900 border-2 border-transparent hover:border-blue-500 hover:bg-white dark:hover:bg-slate-800 transition-all duration-300"
        >
          <div className="w-14 h-14 bg-white dark:bg-slate-800 rounded-2xl shadow-sm flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
            <FaRegEnvelope size={24} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase text-slate-400">
              Email Me
            </span>
            <span className="text-xs md:text-lg font-black tracking-tighter text-slate-900 dark:text-white">
              gmpopowich@gmail.com
            </span>
          </div>
        </a>
      </div>

      {/* SOCIAL ECOSYSTEM */}
      <div className="space-y-6">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
          Digital Presence
        </h3>
        <div className="grid grid-cols-5 gap-3">
          {SOCIALS.map(({ Icon, href, name }) => (
            <a
              key={name}
              href={href}
              aria-label={name}
              target="_blank"
              rel="noopener noreferrer"
              className="aspect-square bg-slate-50 dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-2xl flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:bg-white dark:hover:bg-slate-800 group shadow-sm"
            >
              <span className="text-blue-500 transition-transform duration-300 group-hover:scale-110">
                <Icon size={22} />
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* AVAILABILITY BADGE */}
      <div className="mt-auto pt-8 border-t-2 border-slate-50 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </div>
          <span className="text-xs font-black uppercase tracking-widest text-slate-500">
            Available for new projects
          </span>
        </div>
      </div>
    </div>
  );
}
