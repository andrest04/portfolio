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
      <div className="relative h-32 w-32 overflow-hidden rounded-full border border-white/10">
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
        <p className="text-sm text-text-tertiary">{role}</p>
      </div>
    </div>
  );
}
