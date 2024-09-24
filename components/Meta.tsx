import Head from 'next/head';

export default function Meta() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Wake Them Up",
    "url": "https://wake-him-up-app.vercel.app",
    "author": {
      "@type": "Person",
      "name": "Aashutosh Soni",
      "url": "https://github.com/Ashutosh7i"
    },
    "description": "A web app designed to wake them up with interactive features! Created by Aashutosh Soni.",
    "keywords": "Wake Them Up, Next.js, PWA, React, HTML, CSS, JavaScript, TypeScript, wake up, Aashutosh Soni, Ashutosh7i"
  };

  return (
    <Head>
      <title>Wake Them Up - Aashutosh Soni</title>
      <meta charSet="utf-8" />
      <meta name="author" content="Aashutosh Soni" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="title" content="Wake Them Up - A Next.js App by Aashutosh Soni" />
      <meta name="description" content="A web app designed to wake them up with interactive features! Created by Aashutosh Soni." />
      <meta name="keywords" content="Wake Them Up, Next.js, PWA, React, HTML, CSS, JavaScript, TypeScript, wake up, Aashutosh Soni, Ashutosh7i" />
      <meta name="color-scheme" content="dark light" />
      <meta name="theme-color" content="#F3EFE0" media="(prefers-color-scheme: light)" />
      <meta name="theme-color" content="#18181b" media="(prefers-color-scheme: dark)" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-title" content="Wake Them Up" />
      <meta name="application-name" content="Wake Them Up" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" sizes="180x180" />
      <link rel="icon" href="/icons/favicon-32x32.png" sizes="32x32" type="image/png" />
      <link rel="icon" href="/icons/favicon-16x16.png" sizes="16x16" type="image/png" />
      <link rel="manifest" href="/manifest.json" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://wake-him-up-app.vercel.app" />
      <meta property="og:title" content="Wake Them Up - A Next.js App by Aashutosh Soni" />
      <meta property="og:description" content="A web app designed to wake them up with interactive features! Created by Aashutosh Soni." />
      <meta property="og:image" content="https://wake-him-up-app.vercel.app/icons/og-image.png" />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:creator" content="@ashutosh7i" />
      <meta property="twitter:url" content="https://wake-him-up-app.vercel.app" />
      <meta property="twitter:title" content="Wake Them Up - A Next.js App by Aashutosh Soni" />
      <meta property="twitter:description" content="A web app designed to wake them up with interactive features! Created by Aashutosh Soni." />
      <meta property="twitter:image" content="https://wake-him-up-app.vercel.app/icons/og-image.png" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </Head>
  );
}
