type ScrollIndicatorProps = {
  href: string;
  ariaLabel: string;
  ref?: React.Ref<HTMLDivElement>;
  className?: string;
};

export default function ScrollIndicator({
  href,
  ariaLabel,
  ref,
  className,
}: ScrollIndicatorProps) {
  return (
    <div ref={ref} className={className}>
      <a
        href={href}
        aria-label={ariaLabel}
        className="cursor-pointer flex items-center justify-center min-h-11 min-w-11 rounded-full text-text-tertiary transition duration-200 ease-out hover:text-accent-secondary"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </a>
    </div>
  );
}
