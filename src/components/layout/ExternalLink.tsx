type ExternalLinkProps = {
  href: string;
  /** The dictionary's new-tab notice, read by assistive technology only. */
  notice: string;
  className?: string;
  children: React.ReactNode;
};

export default function ExternalLink({ href, notice, className, children }: ExternalLinkProps) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className={className}>
      {children}
      <span className="sr-only"> {notice}</span>
    </a>
  );
}
