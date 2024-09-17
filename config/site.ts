export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Wake Him Up",
  description: "A PWA for couples to wake each other up with a single button using WebRTC.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "How It Works",
      href: "/how-it-works",
    },
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Contact",
      href: "/contact",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help",
      href: "/help",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/yourusername/wake-him-up",
    twitter: "https://twitter.com/yourusername",
    docs: "https://wake-him-up.docs.com",
    discord: "https://discord.gg/wake-him-up",
  },
};
