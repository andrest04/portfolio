import Image from "next/image";

type HeroCurrentPositionProps = {
  position: string;
  company: string;
  ref?: React.Ref<HTMLDivElement>;
};

export default function HeroCurrentPosition({
  position,
  company,
  ref,
}: HeroCurrentPositionProps) {
  return (
    <div
      ref={ref}
      className="mt-6 inline-flex items-center gap-2 rounded-full border border-accent-primary/20 bg-surface-default px-4 py-2 text-sm text-text-secondary backdrop-blur-[var(--glass-backdrop)]"
      style={{ opacity: 0 }}
    >
      <Image src="/edteam-logo.svg" alt="EDTeam" width={18} height={18} />
      <span>
        {position} @{" "}
        <span className="font-medium text-text-primary">{company}</span>
      </span>
    </div>
  );
}
