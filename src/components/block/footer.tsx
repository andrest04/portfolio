import React from 'react';

/*
 * Vendored from the ObsidianUI `footer` block. Patches (content and theme only):
 * - props-ified: brand copy, fake links, badge and headline were removed in
 *   favour of `wordmark`, `intro`, `children` and `legal` slots;
 * - the wordmark is decorative (`aria-hidden`, a `div` instead of an `h1`);
 * - colors follow the site theme tokens (`--bg` / `--text`) instead of fixed black;
 * - below `md` the legal line is lifted above the wordmark so they do not overlap.
 * The `lighting-*` and `wordmark-gradient` CSS lives in `src/app/globals.css`.
 */
interface FooterProps {
  /** Giant decorative text drawn behind the footer content. */
  wordmark: string;
  /** Left column content (short description). */
  intro?: React.ReactNode;
  /** Right column content (links). */
  children?: React.ReactNode;
  /** Bottom legal line(s). */
  legal?: React.ReactNode;
  className?: string;
}

const Footer: React.FC<FooterProps> = ({
  wordmark,
  intro,
  children,
  legal,
  className = '',
}) => {
  return (
    <footer
      className={`relative bg-[rgb(var(--bg))] text-[rgb(var(--text))] w-full min-h-[420px] md:min-h-[520px] flex flex-col overflow-hidden pt-16 px-6 md:px-12 lg:px-24 border-t border-border-subtle ${className}`}
    >

      <article id="lighting-wrap" aria-hidden="true">
        <article id="lightings">
          <section id="light-one" className="lighting-section">
            <section id="light-two" className="lighting-section">
              <section id="light-three" className="lighting-section">
                <section id="light-four" className="lighting-section">
                  <section id="light-five" className="lighting-section" />
                </section>
              </section>
            </section>
          </section>
        </article>
      </article>

      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-10 w-full pb-16 z-10 relative">
        {intro ? <div className="flex flex-col max-w-xl">{intro}</div> : null}
        {children ? <div className="flex flex-col">{children}</div> : null}
      </div>

      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-full pointer-events-none select-none flex justify-center overflow-hidden"
      >
        <div className="text-[min(11vw,12rem)] font-serif-elegant leading-none translate-y-[0%] tracking-tighter whitespace-nowrap wordmark-gradient">
          {wordmark}
        </div>
      </div>

      {legal ? (
        <div className="mt-auto pb-8 max-md:pb-[calc(min(11vw,12rem)+2rem)] z-10 text-center w-full relative">
          {legal}
        </div>
      ) : null}
    </footer>
  );
};

export default Footer;
