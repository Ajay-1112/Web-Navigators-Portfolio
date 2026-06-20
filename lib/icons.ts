import {
  Bot,
  Code2,
  Gauge,
  Layers,
  MessageSquareHeart,
  Rocket,
  TrendingUp,
  Webhook,
  Zap,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Bot,
  Code2,
  Gauge,
  Layers,
  MessageSquareHeart,
  Rocket,
  TrendingUp,
  Webhook,
  Zap,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? Code2;
}
