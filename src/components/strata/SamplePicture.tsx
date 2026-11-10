import Image from "next/image";
import type { Project } from "@/types/i18n";

/**
 * The rendered width of a picture: 7/12 of the content beside the rail from 1280px (capped
 * from 1920px), and the full content width between the gutters below that.
 */
const SIZES =
  "(min-width: 1920px) 868px, (min-width: 1280px) 45vw, (min-width: 960px) calc(91vw - 150px), (min-width: 445px) 91vw, calc(100vw - 40px)";

export default function SamplePicture({ image }: { image: Project["image"] }) {
  return (
    <figure className="sample__picture">
      <Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes={SIZES} />
    </figure>
  );
}
