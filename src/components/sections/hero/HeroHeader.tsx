import Image from "next/image";

type HeroHeaderProps = {
  name: string;
  role: string;
  ref?: React.Ref<HTMLDivElement>;
};

export default function HeroHeader({ name, role, ref }: HeroHeaderProps) {
  return (
    <div
      ref={ref}
      className="flex flex-col items-center gap-4"
      style={{ opacity: 0 }}
    >
      <div className="relative h-32 w-32 overflow-hidden rounded-2xl border-2 border-border-medium shadow-[var(--shadow-glow-primary-md)]">
        <Image
          src="/profile.png"
          alt="Andrés Torres"
          fill
          className="object-cover object-top"
          priority
          sizes="128px"
        />
      </div>

      <div>
        <h2 className="text-lg font-semibold text-text-primary sm:text-xl">
          {name}
        </h2>
        <p className="text-sm text-accent-secondary">{role}</p>
      </div>
    </div>
  );
}
