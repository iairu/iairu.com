// Person, contacts, links and navigation shared by every page of the StrukShow site.
export const person = {
  name: 'Braňo Struk',
  altName: 'Brian Struk',
  legal: 'Branislav Struk',
  location: { sk: 'Trenčín, Slovensko', en: 'Trenčín, Slovakia' },
  role: {
    sk: 'Moderný kúzelník · prémiové show pre exkluzívnu klientelu',
    en: 'Contemporary magician · refined shows for exclusive events',
  },
};

// Primary (public-facing) booking contact used across the home page.
export const booking = {
  email: 'manager@strukshow.com',
  phone: '+421 908 666 921',
  phoneHref: '+421908666921',
};

// Management / invoicing contact, shown on the video-production page.
export const management = {
  name: 'Branislav Struk',
  email: 'strukmanagement@gmail.com',
  phone: '+421 908 055 048',
  phoneHref: '+421908055048',
  ico: '53 300 858',
  dic: '1126785671',
  city: 'Trenčín',
};

export const links = {
  youtube: 'https://www.youtube.com/@brianstruk',
  instagram: 'https://www.instagram.com/brianstruk',
};

// Contact form delivery via FormSubmit (https://formsubmit.co) — no backend or API
// key needed; it emails the booking address. The owner must click the one-time
// activation link FormSubmit emails on the first submission. To switch providers
// (Formspree, Web3Forms, a Vercel function…) change only the two URLs below.
export const contactForm = {
  action: `https://formsubmit.co/${booking.email}`,
  ajax: `https://formsubmit.co/ajax/${booking.email}`,
};

export const SITE_DESCRIPTION = {
  sk: 'Hľadáte kúzelníka na vašu akciu? Braňo Struk z Česko Slovensko má talent prináša modernú kúzelnícku show so štýlom pre deti aj dospelých. 10 000 divákov ročne, 2,5 milióna online zhliadnutí.',
  en: 'Looking for a magician for your event? Brian Struk, known from Got Talent, delivers a modern, high-class magic show for children and adults. 10,000 viewers a year, 2.5 million online views.',
};

// Top navigation. `path` is appended after /<lang>/; `hash` links to a section on the home page.
export const nav = [
  { key: 'home', path: '' },
  { key: 'show', path: '', hash: 'show' },
  { key: 'gallery', path: '', hash: 'gallery' },
  { key: 'production', path: 'produkcia/' },
  { key: 'booking', path: '', hash: 'booking' },
];
