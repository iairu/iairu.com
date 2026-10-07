// Person, links and taxonomy shared by every page.
export const person = {
  name: 'Ondrej Špánik',
  nick: 'iairu',
  full: 'Ondrej "iairu" Špánik',
  email: 'spanik11@gmail.com',
  location: { en: 'Bratislava, Slovakia', sk: 'Bratislava, Slovensko' },
  pronounced: { en: 'My name is pronounced “Andrei”.', sk: 'Moje meno sa vyslovuje „Andrej“, anglicky ako „Andrei“.' },
  role: { en: 'Prompt engineer · maker · one challenge at a time', sk: 'Prompt inžinier · maker · jedna výzva naraz' },
};

export const links = {
  github: 'https://github.com/iairu',
  linkedin: 'https://www.linkedin.com/in/iairu',
  instagram: 'https://instagram.com/spanik11',
  animationInstagram: 'https://www.instagram.com/ayu_animations',
  messenger: 'https://m.me/iairu',
  innovatrics: 'https://www.innovatrics.com',
  nightjar: 'https://nightjar.gift',
  nightjarDocs: 'https://knifes.nightjar.gift',
  fiit: 'https://www.fiit.stuba.sk',
  suptn: 'https://www.suptn.sk',
};

export const SITE_DESCRIPTION = {
  en: 'Portfolio of Ondrej "iairu" Špánik: prompt engineer and maker who takes on one challenge at a time and learns whatever it needs, from code and circuits to 3D and illustration.',
  sk: 'Portfólio Ondreja „iairu“ Špánika: prompt inžiniera a makera, ktorý rieši jednu výzvu naraz a naučí sa všetko, čo si vyžaduje: od kódu a obvodov po 3D a ilustráciu.',
};

// Fields of expertise: which discipline a project belongs to.
export const fields = {
  ai: { color: 'violet', label: { en: 'Prompt engineering & AI', sk: 'Prompt engineering a AI' },
    hint: { en: 'LLM workflows, prompt-driven builds, ML experiments.', sk: 'LLM postupy, vývoj riadený promptami, ML experimenty.' } },
  software: { color: 'cyan', label: { en: 'Software & web', sk: 'Softvér a web' },
    hint: { en: 'Apps, sites, tools, classic programming.', sk: 'Aplikácie, weby, nástroje, klasické programovanie.' } },
  hardware: { color: 'copper', label: { en: 'Electronics & making', sk: 'Elektronika a výroba' },
    hint: { en: 'Circuits, boards, CNC, objects you can hold.', sk: 'Obvody, dosky, CNC, predmety, ktoré môžeš chytiť do ruky.' } },
  art3d: { color: 'pink', label: { en: '3D & animation', sk: '3D a animácia' },
    hint: { en: 'Blender, 3D models, OpenGL, animated stories.', sk: 'Blender, 3D modely, OpenGL, animované príbehy.' } },
  design: { color: 'lime', label: { en: 'Graphic design & illustration', sk: 'Grafický dizajn a ilustrácia' },
    hint: { en: 'Logos, branding, web design, comics, painting.', sk: 'Logá, branding, webdizajn, komiksy, maľba.' } },
  systems: { color: 'amber', label: { en: 'Systems, network & security', sk: 'Systémy, siete a bezpečnosť' },
    hint: { en: 'Linux, networking, low-level C, security research.', sk: 'Linux, siete, nízkoúrovňové C, bezpečnostný výskum.' } },
};

// Areas of interest: what a visitor may be looking for. `hint` is shown as a helpful remark.
export const interests = {
  web: { label: { en: 'Websites & web apps', sk: 'Weby a webaplikácie' }, hint: { en: 'Need something that runs in a browser?', sk: 'Potrebuješ niečo, čo beží v prehliadači?' } },
  automation: { label: { en: 'Automation & tools', sk: 'Automatizácia a nástroje' }, hint: { en: 'Small tools that remove repetitive work.', sk: 'Malé nástroje, ktoré ušetria opakovanú prácu.' } },
  maker: { label: { en: 'Physical objects', sk: 'Fyzické objekty' }, hint: { en: 'Things that are carved, soldered, powered.', sk: 'Veci vyrezané, spájkované, napájané.' } },
  visual: { label: { en: 'Visuals & animation', sk: 'Vizuály a animácia' }, hint: { en: 'Illustration, 3D, motion, typography.', sk: 'Ilustrácia, 3D, pohyb, typografia.' } },
  brand: { label: { en: 'Branding & identity', sk: 'Branding a identita' }, hint: { en: 'Logos, manuals, visual systems.', sk: 'Logá, manuály, vizuálne systémy.' } },
  data: { label: { en: 'AI, ML & data', sk: 'AI, ML a dáta' }, hint: { en: 'Models, retrieval, clustering, search.', sk: 'Modely, vyhľadávanie, zhlukovanie.' } },
  infra: { label: { en: 'Infrastructure & security', sk: 'Infraštruktúra a bezpečnosť' }, hint: { en: 'Networks, containers, defence and analysis.', sk: 'Siete, kontajnery, obrana a analýza.' } },
  games: { label: { en: 'Games & real-time 3D', sk: 'Hry a 3D v reálnom čase' }, hint: { en: 'Game loops, OpenGL, interactive worlds.', sk: 'Herné slučky, OpenGL, interaktívne svety.' } },
  audio: { label: { en: 'Audio & voice', sk: 'Zvuk a hlas' }, hint: { en: 'Plugins, speech, sound-driven objects.', sk: 'Pluginy, reč, objekty riadené zvukom.' } },
  learning: { label: { en: 'Study & experiments', sk: 'Štúdium a experimenty' }, hint: { en: 'University work and small explorations.', sk: 'Školské práce a menšie experimenty.' } },
};

// Quick starts on the portfolio page: one click sets several filters at once.
export const presets = [
  { id: 'hire-web', label: { en: 'I need a website or app', sk: 'Potrebujem web alebo aplikáciu' }, set: { interest: ['web'] } },
  { id: 'object', label: { en: 'I want a real object built', sk: 'Chcem postaviť skutočný objekt' }, set: { field: ['hardware'] } },
  { id: 'visual', label: { en: 'I need visuals or branding', sk: 'Potrebujem vizuály alebo branding' }, set: { field: ['design', 'art3d'] } },
  { id: 'ai', label: { en: 'I am exploring AI', sk: 'Zaujíma ma AI' }, set: { field: ['ai'] } },
  { id: 'starred', label: { en: 'Show what people starred', sk: 'Ukáž, čo ľudia ohviezdičkovali' }, set: { starred: true } },
];

export const nav = [
  { key: 'projects', path: 'projects/' },
  { key: 'art', path: 'art/' },
  { key: 'docs', path: 'docs/' },
  { key: 'about', path: 'about/' },
  { key: 'contact', path: 'contact/' },
];
