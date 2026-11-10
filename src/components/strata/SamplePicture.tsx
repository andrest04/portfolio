import Image from "next/image";
import type { Dictionary, Project } from "@/types/i18n";

/** The picture column is 7/12 of the content from 1280px, and the full content width below it. */
const SIZES =
  "(min-width: 1920px) 900px, (min-width: 1280px) 50vw, (min-width: 960px) calc(100vw - 280px), calc(100vw - 40px)";

type SamplePictureProps = {
  image: Project["image"];
  copy: Dictionary["record"]["missingPicture"];
};

export default function SamplePicture({ image, copy }: SamplePictureProps) {
  if (!image) {
    return (
      <div className="sample__picture blank">
        <svg
          className="blank__cross"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M0 0 100 100M100 0 0 100" vectorEffect="non-scaling-stroke" />
        </svg>
        <p className="blank__label">
          <strong className="label">{copy.title}</strong>
          <span>{copy.body}</span>
        </p>
      </div>
    );
  }

  return (
    <figure className="sample__picture">
      <Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes={SIZES} />
    </figure>
  );
}
