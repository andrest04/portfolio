import { ArrowUpRight } from "lucide-react";
import Card from "@/components/ui/Card";
import { cn } from "@/lib/utils";

type ContactSocialCardProps = {
  href: string;
  icon: React.ReactNode;
  label: string;
  handle: string;
  iconBgClass: string;
  iconColorClass: string;
  hoverClass: string;
};

export default function ContactSocialCard({
  href,
  icon,
  label,
  handle,
  iconBgClass,
  iconColorClass,
  hoverClass,
}: ContactSocialCardProps) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="block h-full">
      <Card
        hover={false}
        className={cn("group h-full p-6 transition-all duration-300", hoverClass)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "grid h-10 w-10 place-items-center rounded-xl",
                iconBgClass,
                iconColorClass
              )}
            >
              {icon}
            </div>
            <div>
              <p className="text-sm font-medium text-text-primary">{label}</p>
              <p className="text-xs text-text-tertiary">{handle}</p>
            </div>
          </div>
          <ArrowUpRight className="h-4 w-4 text-text-tertiary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-text-secondary" />
        </div>
      </Card>
    </a>
  );
}
