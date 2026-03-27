// src/lib/iconMapper.tsx
import * as SiIcons from "react-icons/si";
import * as LucideIcons from "lucide-react";
import { FaCode } from "react-icons/fa6";

export function getTechIcon(name: string) {
  const Icon = (SiIcons as any)[name];
  return Icon || FaCode;
}
export function getServiceIcon(name: string) {
  const Icon = (LucideIcons as any)[name];
  return Icon || LucideIcons.Globe;
}
