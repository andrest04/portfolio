import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Andrés Torres - Portfolio",
    short_name: "A. Torres",
    description:
      "Portfolio of Andrés Torres, Software Engineering student in Lima: work experience, projects and CV.",
    start_url: "/",
    display: "standalone",
    background_color: "#e0a11b",
    theme_color: "#1b1c1e",
    icons: [
      {
        src: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
