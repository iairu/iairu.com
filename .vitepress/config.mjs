import { defineConfig } from "vitepress";
import nav from "./config/nav.mjs";
import sidebar from "./config/sidebar.mjs";
import footer from "./config/footer.mjs";
import socialLinks from "./config/socialLinks.mjs";
import head from "./config/head.mjs";

export default defineConfig({
  title: "Ondrej Špánik",
  description: "Portfolio of development, creative, and design projects.",
  head,
  themeConfig: {
    logo: "/logo.webp",

    appearance: "force-dark",

    themeSwitch: true,

    socialLinks,

    nav,

    sidebar,

    footer,

    search: {
      provider: "local",
    },
  },
});
