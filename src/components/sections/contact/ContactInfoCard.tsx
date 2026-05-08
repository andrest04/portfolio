import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type ContactInfoCardProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  iconBgClass: string;
  iconColorClass: string;
  hoverClass?: string;
  valueLinkClass?: string;
};

export default function ContactInfoCard({
  icon,
  label,
  value,
  href,
  iconBgClass,
  iconColorClass,
  hoverClass,
  valueLinkClass,
}: ContactInfoCardProps) {
  return (
    <Card
      className={cn(
        "h-full rounded-lg border-border-medium bg-surface-medium py-5 shadow-none transition-all duration-300 sm:py-6",
        hoverClass
      )}
    >
      <CardContent className="px-5 sm:px-6">
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
          <p className="text-sm font-medium text-text-primary">{label}</p>
        </div>

        {href ? (
          <a
            href={href}
            className={cn(
              "mt-3 block cursor-pointer text-sm text-text-secondary transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 rounded-sm",
              valueLinkClass
            )}
          >
            {value}
          </a>
        ) : (
          <p className="mt-3 text-sm text-text-secondary">{value}</p>
        )}
      </CardContent>
    </Card>
  );
}
