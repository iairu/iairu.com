// All page content, bilingual (sk / en). Text is taken verbatim from the original
// strukshow.com CMS and lightly cleaned up; the English for the /ponuka page was
// translated for this rewrite (the original was Slovak only).

const M = '/media';

/* ------------------------------------------------------------------ home ---- */

export const home = {
  hero: {
    eyebrow: { sk: 'StrukShow', en: 'StrukShow' },
    badge: { sk: 'Posledná sezóna · do 31.\u00a012.\u00a02026', en: 'Final season · until 31\u00a0Dec\u00a02026' },
    heading: { sk: ['Moderný', 'Kúzelník'], en: ['Elite', 'Magic'] },
    lead: {
      sk: 'Posledná sezóna prémiovej kúzelníckej show, pri ktorej sa zastaví čas — pre firemné eventy, galavečery a exkluzívnu klientelu. Len do konca roka 2026.',
      en: 'The final season of a refined magic show that stops time — for corporate events, galas and exclusive audiences. Only until the end of 2026.',
    },
    bg: `${M}/hero-title-bg.jpg`,
    flare: `${M}/lens-flare.png`,
  },

  // The playful fourth stat ("vanished guests") is kept from the original.
  stats: {
    bg: `${M}/stats-bg.jpg`,
    items: [
      { value: '10 000', label: { sk: 'divákov ročne', en: 'viewers a year' } },
      { value: '2,5 M', label: { sk: 'online zhliadnutí', en: 'online views' } },
      { value: '10+', label: { sk: 'rokov pred publikom', en: 'years on stage' } },
      { value: '?', label: { sk: 'zmiznutých divákov', en: 'vanished guests' } },
    ],
  },

  referencesTitle: { sk: 'Vystupoval pre', en: 'Trusted by' },
  references: [
    { src: `${M}/ref-csmt.png`, alt: 'Česko Slovensko má talent' },
    { src: `${M}/ref-redbull.png`, alt: 'Red Bull' },
    { src: `${M}/ref-dell.png`, alt: 'Dell' },
    { src: `${M}/ref-crowne-plaza.png`, alt: 'Crowne Plaza' },
    { src: `${M}/ref-danfoss.png`, alt: 'Danfoss' },
    { src: `${M}/ref-hotel-panorama.png`, alt: 'Hotel Panorama' },
    { src: `${M}/ref-stv1hd.png`, alt: 'STV1 HD' },
    { src: `${M}/ref-grape.png`, alt: 'Grape Festival' },
    { src: `${M}/ref-ginoo.png`, alt: 'Ginoo' },
    { src: `${M}/ref-102.png`, alt: 'Reference' },
    { src: `${M}/ref-2.png`, alt: 'Reference' },
    { src: `${M}/ref-6.png`, alt: 'Reference' },
  ],

  about: {
    label: { sk: 'O kúzelníkovi', en: 'About' },
    heading: { sk: 'Braňo Struk', en: 'Brian Struk' },
    image: `${M}/about-cover.jpg`,
    body: {
      sk: `Profesionálny iluzionista špecializujúci sa na kultivované vystúpenia pre exkluzívnu klientelu. Jeho show je definovaná precíznosťou a sofistikovanou prezentáciou, vďaka čomu prináša hosťom nezabudnuteľný a trvalý zážitok.

Svoje skúsenosti budoval na stovkách podujatí pre popredné medzinárodné značky ako <strong>Crowne Plaza, Hilton, Red Bull, Dell</strong>. Širšej verejnosti je známy aj z televíznych produkcií vrátane programu <strong>Česko Slovensko má talent</strong>.

Vystupuje tiež pre zahraničnú klientelu v <strong>Chicagu, Írsku a Nórsku</strong> plnohodnotne v anglickom jazyku.`,
      en: `A contemporary magician focused on refined, high-level performances for exclusive events. His work is defined by control, precision and intelligent mystery, creating moments that feel intentional, rare and memorable.

His experience includes hundreds of performances for leading international brands such as <strong>Dell, Red Bull, Hilton</strong> and <strong>Crowne Plaza</strong>, as well as appearances on major television productions including Czech and Slovak <strong>Got Talent</strong>.

He also performs for international audiences in <strong>Chicago, Ireland and Norway</strong>, fully in English.`,
    },
  },

  shows: {
    label: { sk: 'Program', en: 'The show' },
    heading: { sk: 'Dve podoby jednej mágie', en: 'Two forms of one magic' },
    items: [
      {
        name: { sk: 'Magic Show', en: 'Live magic performance' },
        body: {
          sk: `Podmanivé sólové vystúpenie modernej mágie, ktoré ovládne pozornosť celého publika. Špičková show pre prestížne podujatia a medzinárodné korporácie spája vizuálne silné ilúzie s priamou interakciou.

Uvidíte šokujúce <strong>teleportácie predmetov, levitácie objektov a moderný mentalizmus</strong>, pri ktorom sa prekračuje hranica medzi realitou a ilúziou.`,
          en: `A modern, high-class magic show created for elite events and global brands. Structured, precise and adaptable, the performance commands attention in private rooms as well as formal audience settings.

Expect striking <strong>teleportations, levitations and modern mentalism</strong> that blur the line between reality and illusion.`,
        },
      },
      {
        name: { sk: 'Table Hopping', en: 'Table hopping magic' },
        body: {
          sk: `Priama interakcia, kde sa kúzla odohrávajú v bezprostrednej blízkosti, pred očami divákov. Vybraní hostia sa stávajú priamou súčasťou deja a dodávajú vystúpeniu osobný a dychberúci rozmer.

Diváci sú svedkami unikátnych trikov s <strong>Rubikovou kockou, levitácie drobných predmetov a precíznej kartovej mágie</strong>.`,
          en: `High-level close-up magic delivered through refined table hopping. Moments of teleportation, rapid <strong>Rubik's Cube</strong> mastery and subtle mentalism unfold directly with guests — presented with control and quiet confidence as the experience moves naturally through the room.`,
        },
      },
    ],
  },

  // [before, underlined words, after]
  quote: {
    sk: ['„Kúzelnícka show, pri ktorej sa ', 'zastaví čas', '.“'],
    en: ['“Beyond illusion, ', 'into presence', '.”'],
  },

  galleryTitle: { sk: 'Zo šou', en: 'From the show' },
  gallery: [
    { src: `${M}/gallery-magic-show.jpg`, alt: { sk: 'Kúzelnícka show', en: 'Magic show' } },
    { src: `${M}/gallery-talent.jpg`, alt: { sk: 'Vystúpenie v Česko Slovensko má talent', en: 'Got Talent performance' } },
    { src: `${M}/gallery-la-shoot.jpg`, alt: { sk: 'Fotenie v Los Angeles', en: 'Los Angeles photo shoot' } },
    { src: `${M}/gallery-cards.jpg`, alt: { sk: 'Kartová mágia', en: 'Card magic' } },
    { src: `${M}/gallery-magic-1.jpg`, alt: { sk: 'Interakcia s publikom', en: 'Audience interaction' } },
    { src: `${M}/gallery-magic-4.jpg`, alt: { sk: 'Kúzlo pred divákmi', en: 'A trick before the audience' } },
    { src: `${M}/gallery-proxima.jpg`, alt: { sk: 'Vystúpenie na pódiu', en: 'On stage' } },
    { src: `${M}/gallery-extra.jpg`, alt: { sk: 'Detail vystúpenia', en: 'Performance detail' } },
  ],

  testimonialsTitle: { sk: 'Čo hovoria klienti', en: 'What clients say' },
  testimonials: {
    sk: [
      { text: 'Vystúpenie bolo veľmi kvalitné a profesionálne. Bezpochyby jeden z najlepších kúzelníkov v Česku a Slovensku. Ďakujeme.', author: '', stars: 5 },
      { text: 'Najviac oceňujem, ako dokázal nenútene zapojiť aj tých najväčších skeptikov v sále. Jeho table hopping nebol len o trikoch, ale o vytvorení skutočnej konverzácie a smiechu medzi kolegami, ktorí sa predtým ani nepoznali.', author: '', stars: 5 },
      { text: 'Spolupráca na vysokej úrovni od prvého kontaktu až po záverečný potlesk. Braňo priniesol na náš event presne tú dávku elegancie a humoru, ktorú sme potrebovali na uvoľnenie atmosféry.', author: '', stars: 5 },
      { text: 'Pre našich náročných klientov hľadáme vždy niečo extra a táto show bola zásahom do čierneho. Bolo fascinujúce sledovať, ako jedno číslo s knihou dokázalo zjednotiť celú sálu v nemom úžase.', author: '', stars: 5 },
      { text: 'Braňo nie je len kúzelník, je to špičkový performer, ktorý vie dokonale čítať publikum. Jeho vstup okamžite dodal nášmu večierku punc exkluzivity.', author: '', stars: 5 },
      { text: 'Veľmi si vážim ten ľudský a uvoľnený prístup. Žiadne strojené vystúpenie, ale prirodzená interakcia, pri ktorej sme jednoducho neverili vlastným očiam.', author: '', stars: 5 },
      { text: 'Silvestrovská noc vďaka tomuto programu získala ten správny glanc. Perfektné načasovanie, interakcia na úrovni a schopnosť udržať skvelú náladu.', author: '', stars: 5 },
    ],
    en: [
      { text: 'Brian commands the room with clarity and intelligence. Each moment is precise, deliberate, and leaves the audience quietly amazed.', author: 'Sophia', stars: 5 },
      { text: 'Every part of the show felt perfectly executed. From table interactions to the main performance, it elevated the atmosphere entirely.', author: 'Joseph', stars: 5 },
      { text: 'Brian and his team delivered a show that was polished, engaging and memorable. One of the strongest programs we have hosted in years.', author: 'James W.', stars: 5 },
      { text: 'He has a way of making the impossible feel natural. People were leaning in, curious, and quietly reacting throughout the evening.', author: 'Lucas R.', stars: 5 },
      { text: 'The show worked perfectly in our event setting. Close-up moments and table interactions were seamless, leaving a lasting impression on our clients.', author: 'Amelia', stars: 5 },
      { text: 'Controlled, elegant and unforgettable. A performance that makes your event stand out.', author: 'Oakley', stars: 5 },
    ],
  },

  video: {
    label: { sk: 'Pozrite si', en: 'Watch' },
    heading: { sk: 'Mágia v pohybe', en: 'Magic in motion' },
    youtubeId: '8uV831jG-Vw',
    shortId: '08j42D0ugRk',
  },

  booking: {
    label: { sk: 'Booking', en: 'Booking' },
    heading: { sk: 'Rezervujte show', en: 'Book the show' },
    lead: {
      sk: 'Posledné voľné termíny sezóny 2026. Napíšte alebo zavolajte — ozveme sa s termínom aj ponukou.',
      en: 'The last open dates of the 2026 season. Write or call — we will reply with availability and an offer.',
    },
  },
};

/* -------------------------------------------------------------- farewell ---- */
// The final season: shows run only until the end of 2026. Used by the bottom bar
// (every page) and the thank-you section on the home page.

export const farewell = {
  end: '2026-12-31T23:59:59+01:00',
  bar: {
    text: { sk: 'Posledná sezóna: kúzelnícka show len do 31.\u00a012.\u00a02026', en: 'Final season: the magic show runs only until 31\u00a0Dec\u00a02026' },
    cta: { sk: 'Rezervovať termín', en: 'Book a date' },
    close: { sk: 'Zavrieť oznámenie', en: 'Dismiss notice' },
  },
  label: { sk: 'Posledná sezóna 2026', en: 'Final season 2026' },
  // [before, underlined word]
  heading: { sk: ['Ďakujem za každé ', 'kúzlo'], en: ['Thank you for every bit of ', 'magic'] },
  body: {
    sk: 'Po rokoch na pódiách, galavečeroch a firemných eventoch koncom roka 2026 uzatváram svoju kúzelnícku kariéru. Ďakujem každému divákovi, klientovi a partnerovi, ktorý bol pri tom.\n\nAk ste moju show ešte nezažili — alebo ju chcete zažiť ešte raz — posledné termíny sú voľné do 31. decembra.',
    en: 'After years of stages, galas and corporate events, I am closing my career as a magician at the end of 2026. Thank you to every guest, client and partner who was part of it.\n\nIf you have not seen the show yet — or want to see it one last time — the final dates are open until 31 December.',
  },
  sign: { sk: '— Braňo', en: '— Brian' },
  countLabel: { sk: 'dní do konca poslednej sezóny', en: 'days left in the final season' },
  cta: { sk: 'Rezervovať posledný termín', en: 'Book a final date' },
};

/* ------------------------------------------------------------ production ---- */

export const production = {
  hero: {
    eyebrow: { sk: 'Video produkcia', en: 'Video production' },
    heading: { sk: ['Video', 'produkcia'], en: ['Video', 'production'] },
    lead: {
      sk: 'Profesionálne video pre vašu firmu a váš produkt. Urobte svoj produkt zapamätateľným pre zákazníkov.',
      en: 'Professional video for your business and your product. Make your product memorable for your customers.',
    },
    bg: `${M}/production-hero-bg.jpg`,
    video: `${M}/production-hand.mp4`,
  },

  igBar: { sk: 'Sledujte Struka aj na Instagrame', en: 'Follow Struk on Instagram' },

  reel: {
    youtubeId: { sk: 'mzOdILLczgE', en: 'Y7FvZvkZRhU' },
  },

  process: [
    {
      step: '01',
      title: { sk: 'Vy jednoducho zadáte', en: 'You simply tell us' },
      dark: true,
      cards: [
        { icon: `${M}/ic-vision.svg`, heading: { sk: 'Vašu víziu', en: 'Your vision' }, sub: { sk: 'cieľ videa', en: 'the goal of the video' } },
        { icon: `${M}/ic-product.svg`, heading: { sk: 'Produkt', en: 'The product' }, sub: { sk: 'ktorý chcete zviditeľniť', en: 'you want to make shine' } },
        { icon: `${M}/ic-service.svg`, heading: { sk: 'Službu', en: 'The service' }, sub: { sk: 'ktorú chcete propagovať', en: 'you would like to promote' } },
      ],
    },
    {
      step: '02',
      title: { sk: 'Struk vám na mieru vytvorí', en: 'Struk creates for you' },
      dark: false,
      cards: [
        { icon: `${M}/ic-magic.svg`, heading: { sk: 'Efekty a triky', en: 'Effects & tricks' }, sub: { sk: 'vizuálne a kúzelnícke', en: 'visual and magical' } },
        { icon: `${M}/ic-plot.svg`, heading: { sk: 'Scenár', en: 'Scenario' }, sub: { sk: 'postupnosť a dej', en: 'sequence and story' } },
        { icon: `${M}/ic-cam.svg`, heading: { sk: 'Spracovanie', en: 'Production' }, sub: { sk: 'kamera a strih', en: 'camera and editing' } },
      ],
    },
  ],

  benefits: {
    heading: { sk: 'Získate', en: 'What you get' },
    bg: `${M}/production-hero-bg.jpg`,
    items: {
      sk: ['Kreatívnu propagáciu vašej firmy', 'Vďaka magickým trikom zapamätateľný produkt', 'Originálne video pre vaše účely'],
      en: ['Creative promotion of your company', 'A memorable product thanks to incredible magic', 'An original video for your marketing'],
    },
  },

  quote: {
    sk: '„Váš produkt sa premení na kúzelnícke dielo.“',
    en: '“Your product turns into a visual wonder.”',
  },

  contact: {
    heading: { sk: ['Kontakt', 'Manager'], en: ['Contact', 'Manager'] },
    bg: `${M}/production-contact-bg.jpg`,
  },
};

/* ---------------------------------------------------------------- ponuka ---- */
// Focused campaign landing page. English translated for this rewrite.

export const offer = {
  accent: 'rgb(209, 166, 69)',
  intro: {
    step: { sk: 'Krok 1: Pozrite si krátke video', en: 'Step 1: Watch the short video' },
    headline: {
      sk: 'Kúzelnícka show, ktorá vtiahne hostí do deja a pozdvihne úroveň vášho eventu',
      en: 'A magic show that pulls guests into the moment and elevates your entire event',
    },
    sub: {
      sk: 'Pre firemné eventy, galavečery, konferencie, VIP podujatia, hotely a eventové agentúry',
      en: 'For corporate events, galas, conferences, VIP occasions, hotels and event agencies',
    },
  },
  shortId: '08j42D0ugRk',
  tableHopping: {
    headline: {
      sk: 'Prémiová interaktívna magic show, ktorá vtiahne hostí priamo do deja, prirodzene rozprúdi atmosféru a posunie úroveň celého eventu',
      en: 'A premium interactive magic show that draws guests straight into the action, naturally warms up the room and raises the level of the whole event',
    },
    body: {
      sk: `<p><strong>Braňo Struk</strong> je moderný profesionálny kúzelník, ktorý sa špecializuje na kultivované vystúpenia pre exkluzívnu klientelu. Počas večera sa pohybuje medzi hosťami a predvádza špičkovú mikromágiu priamo pred ich očami.</p>
<p>Nejde o bežný program na pódiu. Ide o <strong>elegantný, osobný a vizuálne silný zážitok</strong>, ktorý sa odohráva priamo medzi hosťami pri stoloch, počas networkingu aj v priebehu celého večera.</p>`,
      en: `<p><strong>Brian Struk</strong> is a modern professional magician specialising in refined performances for exclusive audiences. Throughout the evening he moves between guests and performs top-level close-up magic right before their eyes.</p>
<p>This is not a standard stage program. It is an <strong>elegant, personal and visually powerful experience</strong> that happens directly among the guests — at the tables, during networking and throughout the night.</p>`,
    },
  },
  logosStrip: `${M}/logos-strip.png`,
  benefits: {
    heading: { sk: 'Ideálne pre eventy, kde chcete:', en: 'Ideal for events where you want to:' },
    items: {
      sk: [
        'Prirodzene rozprúdiť atmosféru bez núteného programu',
        'Zaujať hostí prémiovým a kultivovaným zážitkom',
        'Podporiť networking a vzájomnú interakciu',
        'Vytvoriť výnimočný moment aj pre zahraničných hostí',
      ],
      en: [
        'Warm up the room naturally, without a forced program',
        'Impress guests with a premium, refined experience',
        'Encourage networking and interaction',
        'Create a standout moment for international guests too',
      ],
    },
    credibility: {
      sk: 'Braňo vystupoval na stovkách podujatí pre značky ako Dell, Red Bull, Hilton, Crowne Plaza či Tatra banka. Širšia verejnosť ho pozná aj z programu Česko Slovensko má talent.',
      en: 'Brian has performed at hundreds of events for brands such as Dell, Red Bull, Hilton, Crowne Plaza and Tatra banka. He is also known from the Got Talent television show.',
    },
  },
};
