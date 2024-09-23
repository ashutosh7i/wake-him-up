export default function Meta() {
  return (
    <>
      <title>Wake Them Up</title>
      <meta charSet="utf-8" />
      <meta content="Aashutosh Soni" name="author" />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      {/* KEYWORDS */}
      <meta content="Wake Them Up - A Next.js App" name="title" />
      <meta
        content="A web app designed to wake them up and interactive features!"
        name="description"
      />
      <meta
        content="Next.js, pwa, React, HTML, CSS, JavaScript, TypeScript, wake up"
        name="keywords"
      />
      {/* THEMES */}
      <meta content="dark light" name="color-scheme" />
      <meta
        content="#F3EFE0"
        media="(prefers-color-scheme: light)"
        name="theme-color"
      />
      <meta
        content="#18181b"
        media="(prefers-color-scheme: dark)"
        name="theme-color"
      />
      <meta content="yes" name="mobile-web-app-capable" />
      <meta content="yes" name="apple-mobile-web-app-capable" />
      <meta content="Wake Them Up" name="apple-mobile-web-app-title" />
      <meta content="Wake Them Up" name="application-name" />
      <meta
        content="black-translucent"
        name="apple-mobile-web-app-status-bar-style"
      />
      {/* ICONS */}
      <link
        href="/icons/apple-touch-icon.png"
        rel="apple-touch-icon"
        sizes="180x180"
      />
      <link
        href="/icons/favicon-32x32.png"
        rel="icon"
        sizes="32x32"
        type="image/png"
      />
      <link
        href="/icons/favicon-16x16.png"
        rel="icon"
        sizes="16x16"
        type="image/png"
      />
      <link href="/manifest.json" rel="manifest" />
      {/* OG TAGS */}
      <meta content="website" property="og:type" />
      <meta content="https://wake-him-up-app.vercel.app" property="og:url" />
      <meta content="Wake Them Up - A Next.js App" property="og:title" />
      <meta
        content="A web app designed to wake them up and interactive features!"
        property="og:description"
      />
      <meta
        content="https://wake-him-up-app.vercel.app/icons/og-image.png"
        property="og:image"
      />
      {/* TWITTER */}
      <meta content="summary_large_image" property="twitter:card" />
      <meta content="@ashutosh7i" name="twitter:creator" />
      <meta
        content="https://wake-him-up-app.vercel.app"
        property="twitter:url"
      />
      <meta content="Wake Them Up - A Next.js App" property="twitter:title" />
      <meta
        content="A web app designed to wake them up and interactive features!"
        property="twitter:description"
      />
      <meta
        content="https://wake-him-up-app.vercel.app/icons/og-image.png"
        property="twitter:image"
      />
    </>
  );
}
