import GlassCard from "@/components/ui/GlassCard"
import MotionIn from "@/components/ui/MotionIn"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Linkedin, Github } from "lucide-react"
import { Dictionary } from "@/types/i18n"

type ContactProps = { t: Dictionary };

export default function Contact({ t }: ContactProps) {
  const c = t.contact;

  const email = "andresalbertotorresgarcia@gmail.com";
  const phoneDisplay = "+51 984 300 217";
  const phoneHref = "+51984300217";
  const linkedin = "https://linkedin.com/in/andres-torres-garcia";
  const github = "https://github.com/andrest04";
  const location = c.locationValue;

  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-24">
      <MotionIn>
        <h2 className="text-center text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
          {c.title}
        </h2>
      </MotionIn>

      <div className="mx-auto mt-8 max-w-3xl">
        <MotionIn delay={0.06}>
          <GlassCard variant="solid" className="p-6 sm:p-8">
            <div>
              <h3 className="text-lg font-semibold text-text-primary">
                {c.cardTitle}
              </h3>
              <p className="mt-1 text-sm text-text-secondary">
                {c.cardSubtitle}
              </p>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-start gap-4">
                <IconBox>
                  <Mail className="h-4 w-4" />
                </IconBox>
                <div>
                  <p className="text-sm font-medium text-text-primary">{c.emailLabel}</p>
                  <a
                    href={`mailto:${email}`}
                    className="text-sm text-text-secondary underline-offset-4 hover:text-text-primary hover:underline"
                  >
                    {email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <IconBox>
                  <Phone className="h-4 w-4" />
                </IconBox>
                <div>
                  <p className="text-sm font-medium text-text-primary">{c.phoneLabel}</p>
                  <a
                    href={`tel:${phoneHref}`}
                    className="text-sm text-text-secondary underline-offset-4 hover:text-text-primary hover:underline"
                  >
                    {phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <IconBox>
                  <MapPin className="h-4 w-4" />
                </IconBox>
                <div>
                  <p className="text-sm font-medium text-text-primary">{c.locationLabel}</p>
                  <p className="text-sm text-text-secondary">{location}</p>
                </div>
              </div>
            </div>

            <div className="my-6 h-px w-full bg-border-default" />

            <div>
              <p className="text-sm font-semibold text-text-primary">
                {c.socialTitle}
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                <SocialBtn href={linkedin} label={c.linkedinLabel}>
                  <Linkedin className="h-4 w-4" />
                </SocialBtn>

                <SocialBtn href={github} label={c.githubLabel}>
                  <Github className="h-4 w-4" />
                </SocialBtn>
              </div>
            </div>
          </GlassCard>
        </MotionIn>
      </div>
    </section>
  );
}

function IconBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-0.5 grid h-11 w-11 place-items-center rounded-2xl border border-border-default bg-surface-default text-accent-primary backdrop-blur-[var(--glass-backdrop)] transition-colors hover:text-accent-secondary">
      {children}
    </div>
  );
}

function SocialBtn({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: React.ReactNode
}) {
  return (
    <Button
      variant="outline"
      size="sm"
      asChild
      className="rounded-2xl"
    >
      <a href={href} target="_blank" rel="noreferrer">
        <span className="text-accent-primary">{children}</span>
        <span className="text-text-secondary">{label}</span>
      </a>
    </Button>
  )
}
