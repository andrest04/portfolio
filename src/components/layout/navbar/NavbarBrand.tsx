type NavbarBrandProps = {
  lang: "es" | "en";
};

export default function NavbarBrand({ lang }: NavbarBrandProps) {
  return (
    <a href="#" className="flex items-center gap-3 cursor-pointer">
      <div className="grid h-11 w-11 place-items-center rounded-2xl bg-surface-default text-sm font-semibold text-text-primary shadow-[var(--shadow-ring)]">
        AT.
      </div>
      <div className="hidden sm:block">
        <p className="text-sm font-semibold text-text-primary">Andrés Torres</p>
        <p className="text-xs text-text-secondary">
          {lang === "es" ? "Estudiante · Full-Stack" : "Student · Full-Stack"}
        </p>
      </div>
    </a>
  );
}
