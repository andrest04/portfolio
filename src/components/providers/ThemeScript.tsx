"use client";

const SCRIPT = `(function(){try{var t=localStorage.getItem('theme');if(t!=='dark'&&t!=='light'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}var d=document.documentElement;d.classList.remove('dark','light');d.classList.add(t);d.style.colorScheme=t;}catch(e){}})();`;

export default function ThemeScript() {
  if (typeof window !== "undefined") return null;
  return (
    <script
      dangerouslySetInnerHTML={{ __html: SCRIPT }}
      suppressHydrationWarning
    />
  );
}
