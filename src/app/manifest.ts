import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Andrés Torres - Portfolio",
    short_name: "A. Torres",
    description:
      "Portfolio of Andrés Torres, Software Engineer specialized in .NET, React and Node.js.",
    start_url: "/",
    display: "standalone",
    background_color: "#dedad3",
    theme_color: "#dedad3",
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
