/**
 * The irregular top boundary of a band: four straight facets across the full width,
 * drawn above the band's top edge so it bites into the band before it.
 */
const FACETS = [
  "M0 10V6L22 1 48 7 74 2 100 6V10Z",
  "M0 10V3L30 7 56 0 82 6 100 2V10Z",
  "M0 10V5L18 8 44 2 70 7 100 1V10Z",
  "M0 10V2L26 6 52 3 78 8 100 4V10Z",
];

export default function StratumEdge({ variant }: { variant: number }) {
  return (
    <svg
      className="edge"
      viewBox="0 0 100 10"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d={FACETS[variant % FACETS.length]} />
    </svg>
  );
}
