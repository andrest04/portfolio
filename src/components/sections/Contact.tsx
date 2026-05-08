import ScrollReveal from "@/components/ui/ScrollReveal";
import { Phone, MapPin, Linkedin, Github } from "lucide-react";
import { Dictionary } from "@/types/i18n";
import ContactEmailCard from "@/components/sections/contact/ContactEmailCard";
import ContactInfoCard from "@/components/sections/contact/ContactInfoCard";
import ContactSocialCard from "@/components/sections/contact/ContactSocialCard";

type ContactProps = { t: Dictionary; lang: string };

const EMAIL = "andresalbertotorresgarcia@gmail.com";
const PHONE_DISPLAY = "+51 984 300 217";
const PHONE_HREF = "+51984300217";
const LINKEDIN = "https://linkedin.com/in/andres-torres-garcia";
const GITHUB = "https://github.com/andrest04";

export default function Contact({ t, lang }: ContactProps) {
  const c = t.contact;
  const isEs = lang === "es";

  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-24">
      <ScrollReveal>
        <div className="text-center">
          <h2 className="text-3xl font-semibold leading-tight tracking-tight text-text-primary sm:text-4xl">
            {c.title}
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-base leading-relaxed text-text-secondary sm:text-lg">
            {c.cardSubtitle}
          </p>
        </div>
      </ScrollReveal>

      <div className="mx-auto mt-10 max-w-4xl">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <ScrollReveal delay={0.05} className="lg:col-span-2">
            <ContactEmailCard email={EMAIL} label={c.emailLabel} isEs={isEs} />
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <ContactInfoCard
              icon={<Phone className="h-5 w-5" />}
              label={c.phoneLabel}
              value={PHONE_DISPLAY}
              href={`tel:${PHONE_HREF}`}
              iconBgClass="bg-white/5"
              iconColorClass="text-text-primary"
              hoverClass="hover:border-border-strong"
              valueLinkClass="focus-visible:ring-white/30"
            />
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <ContactInfoCard
              icon={<MapPin className="h-5 w-5" />}
              label={c.locationLabel}
              value={c.locationValue}
              iconBgClass="bg-white/5"
              iconColorClass="text-text-primary"
            />
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <ContactSocialCard
              href={LINKEDIN}
              icon={<Linkedin className="h-5 w-5" />}
              label={c.linkedinLabel}
              handle="andres-torres-garcia"
              iconBgClass="bg-white/5"
              iconColorClass="text-text-primary"
              hoverClass="hover:border-border-strong"
            />
          </ScrollReveal>

          <ScrollReveal delay={0.25}>
            <ContactSocialCard
              href={GITHUB}
              icon={<Github className="h-5 w-5" />}
              label={c.githubLabel}
              handle="andrest04"
              iconBgClass="bg-white/5"
              iconColorClass="text-text-primary"
              hoverClass="hover:border-border-strong"
            />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
