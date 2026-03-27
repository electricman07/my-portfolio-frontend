import {
  Palette,
  Laptop,
  Shield,
  ShoppingCart,
  Search,
  Layout,
  HelpCircle,
} from "lucide-react";

export const IconMap: Record<string, any> = {
  Palette,
  Laptop,
  Shield,
  ShoppingCart,
  Search,
  Layout,
  HelpCircle,
};

export const getIcon = (name: string) => IconMap[name] || HelpCircle;
