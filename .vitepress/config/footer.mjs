const currentYear = new Date().getFullYear();

export default {
  message: `<a href="/terms/">Terms of use
    </a> <span class="divider">|</span> <a href="/privacy-policy/">Privacy policy</a>`,
  copyright: `Copyright © ${
    currentYear === 2025 ? "2025" : `2025-${currentYear}`
  } Ondrej Špánik. All rights reserved.`,
};
