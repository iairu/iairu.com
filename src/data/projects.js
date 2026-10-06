// Every project on the site. GitHub numbers (stars, language, push date) come from
// repos.json, a snapshot written by `npm run sync:repos`; everything else is curated here.
// Order on the site: most starred first, then newest.
import snapshot from './repos.json';
import repoImages from './repo-images.json';
import montaigne from './montaigne.json';

const gh = Object.fromEntries(snapshot.repos.map((r) => [r.name, r]));
export const repoSnapshotDate = snapshot.synced;

// galleries imported from the old personal site (scripts/import-montaigne.py)
const G = (k) => montaigne.galleries[k];
const srcs = (k) => G(k).map((g) => g.src);
const thumbs = (k) => G(k).map((g) => g.thumb);
const alts = (k) => G(k).map((g) => g.alt);

const A = '/img/art';
const P = '/img/projects';

// repo: GitHub repository name (gives stars, language, url, year)
// lang: programming language override (null = none, e.g. art)   tools: non-code tools
const raw = [
  // ---------------- on GitHub ----------------
  { id: 'procexp', repo: 'ProcExp', worked: ['2019-12-17', '2020-01-21', 35], tools: ['AutoHotkey', 'FFmpeg', '7-Zip'], fields: ['software', 'design'], interests: ['automation', 'visual'], image: `${P}/procreate.jpg`,
    title: 'ProcExp', tag: { en: 'Procreate timelapse batch exporter', sk: 'Hromadný exportér Procreate timelapse videí' },
    desc: { en: 'A GUI that exports timelapse videos from many Procreate files at once, straight from .procreate files or app content. Born from an artist\'s need to stop exporting one by one. Uses 7-Zip and FFmpeg to extract, stitch and export.', sk: 'GUI, ktoré naraz exportuje timelapse videá z viacerých Procreate súborov, priamo z .procreate súborov alebo obsahu aplikácie. Vzniklo z potreby umelca prestať exportovať po jednom. Na rozbalenie, spojenie a export využíva 7-Zip a FFmpeg.' },
    links: [{ label: { en: 'Download', sk: 'Stiahnuť' }, href: 'https://github.com/iairu/ProcExp/releases' }] },
  { id: 'aiv-logic-plugins', repo: 'logic-plugins', fields: ['software', 'ai'], interests: ['audio'],
    title: 'AIV vocal chain', tag: { en: 'Logic Pro vocal chain plugin', sk: 'Vokálový reťazec ako plugin pre Logic Pro' },
    desc: { en: 'A vocal chain for Logic Pro: resonance, drive, noise gate, pitch, de-esser, three-band EQ, FET compressor, limiter, delay and reverb in one plugin.', sk: 'Vokálový reťazec pre Logic Pro: rezonancia, drive, noise gate, pitch, de-esser, trojpásmový EQ, FET kompresor, limiter, delay a reverb v jednom plugine.' } },
  { id: 'apfs-fuse-freebsd', repo: 'apfs-fuse-freebsd', fields: ['ai', 'systems'], interests: ['infra', 'data'],
    title: 'APFS FUSE for FreeBSD', tag: { en: 'Prompt-driven port of a file system driver', sk: 'Port ovládača súborového systému riadený promptami' },
    desc: { en: 'FUSE driver for Apple\'s APFS, fixed to build and run on FreeBSD by directing Gemini CLI (Pro model) through the work: a real-world test of prompt engineering on systems code.', sk: 'FUSE ovládač pre APFS od Applu, opravený tak, aby sa zostavil a bežal na FreeBSD pomocou riadenia Gemini CLI (Pro model): skutočná skúška prompt engineeringu na systémovom kóde.' } },
  { id: 'coffee-machine', repo: 'coffeeMachine', lang: 'Java', fields: ['software'], interests: ['learning'],
    title: 'Coffee machine', tag: { en: 'First Java project', sk: 'Prvý projekt v Jave' },
    desc: { en: 'First Java project from JetBrains Academy plus a few experiments around it.', sk: 'Prvý projekt v Jave z JetBrains Academy plus pár experimentov okolo.' } },
  { id: 'tables-cms', repo: 'tables-cms', fields: ['software'], interests: ['web', 'automation'],
    title: 'TABLES CMS', tag: { en: 'CMS that deploys to a static site', sk: 'CMS nasadzovaný ako statický web' },
    desc: { en: 'A CMS app with extensions that deploys into a static Vercel site, or exports JSON for Gatsby. Includes a collaboration server for editing together.', sk: 'CMS aplikácia s rozšíreniami, ktorá sa nasadzuje do statického Vercel webu alebo exportuje JSON pre Gatsby. Obsahuje kolaboračný server pre spoločné úpravy.' } },
  { id: 'findacat', repo: 'findacat', lang: 'PHP', fields: ['software'], interests: ['web', 'data'],
    title: 'findacat.eu', tag: { en: 'Cat pedigrees and inbreeding calculator', sk: 'Rodokmene mačiek a kalkulačka inbreedingu' },
    desc: { en: 'Helps people find and manage cats and their pedigrees, and calculates the inbreeding coefficient of a pair to judge whether mating is a good idea. Built with Laravel.', sk: 'Pomáha nájsť a spravovať mačky a ich rodokmene a vypočíta koeficient inbreedingu páru, aby bolo jasné, či je párenie dobrý nápad. Postavené na Laraveli.' },
    links: [{ label: 'findacat.eu', href: 'http://findacat.eu' }] },
  { id: 'notesort', repo: 'notesort', fields: ['ai', 'software'], interests: ['data', 'automation'],
    title: 'notesort', tag: { en: 'DistilBERT paragraph sorting', sk: 'Triedenie odstavcov pomocou DistilBERT' },
    desc: { en: 'A complete workflow to train and run a DistilBERT model that sorts paragraphs, with a labelling interface for creating the training data.', sk: 'Kompletný postup na trénovanie a spúšťanie modelu DistilBERT, ktorý triedi odstavce, vrátane rozhrania na značkovanie trénovacích dát.' } },
  { id: 'popclip-gemini', repo: 'popclip-gemini', fields: ['ai', 'software'], interests: ['automation', 'data'],
    title: 'PopClip × Gemini', tag: { en: 'Select text, ask Gemini', sk: 'Označ text, spýtaj sa Gemini' },
    desc: { en: 'A PopClip extension that sends selected text to Google Gemini and brings the answer back, anywhere on macOS.', sk: 'Rozšírenie PopClip, ktoré pošle označený text do Google Gemini a vráti odpoveď, kdekoľvek v macOS.' } },
  { id: 'shortcut', repo: 'shortcut', fields: ['software', 'systems'], interests: ['automation'],
    title: 'shortcut', tag: { en: '"Add to Home Screen" for macOS', sk: '„Pridať na plochu“ pre macOS' },
    desc: { en: 'The iOS "Add to Home Screen" Safari feature, available on any recent macOS version via a shell script.', sk: 'Funkcia Safari „Pridať na plochu“ z iOS, dostupná na každej novšej verzii macOS cez shell skript.' } },
  { id: 'ytfico', repo: 'ytfico', fields: ['software'], interests: ['automation'],
    title: 'ytfico', tag: { en: 'YouTube first-comment script', sk: 'Skript na prvý komentár na YouTube' },
    desc: { en: 'A YouTube API script that posts the first comment on new videos.', sk: 'Skript cez YouTube API, ktorý pridáva prvý komentár pod nové videá.' } },
  { id: 'ankiscreener', repo: 'AnkiScreener', worked: ['2020-09-23', '2020-10-07', 15], tools: ['Svelte', 'Electron', 'SCSS'], fields: ['software'], interests: ['automation', 'learning'],
    title: 'AnkiScreener', tag: { en: 'Screenshots to flashcards', sk: 'Snímky obrazovky na kartičky' },
    desc: { en: 'An Electron tool for taking lots of screenshots of study material quickly and exporting them as an Anki-importable CSV: a rich utility for fast creation of flashcards.', sk: 'Electron nástroj na rýchle snímanie veľkého množstva študijného materiálu s exportom do CSV importovateľného do Anki: bohatý nástroj na rýchle vytváranie kartičiek.' },
    links: [{ label: { en: 'Demo video', sk: 'Ukážkové video' }, href: 'https://www.youtube.com/watch?v=LO1rb8nfDX4' }] },
  { id: 'csrutils', repo: 'CSRutils', fields: ['systems'], interests: ['infra'],
    title: 'CSRutils', tag: { en: 'Pick a safe csr-active-config', sk: 'Výber bezpečného csr-active-config' },
    desc: { en: 'Utilities that help work out the right SIP / csr-active-config value for your use case without leaving the system exposed.', sk: 'Nástroje, ktoré pomôžu nájsť správnu hodnotu SIP / csr-active-config pre tvoj prípad bez toho, aby zostal systém odkrytý.' } },
  { id: 'twodolisty', repo: 'twodolisty', fields: ['software'], interests: ['web', 'automation'],
    title: 'twodolisty', tag: { en: 'To-do list for macOS and web', sk: 'To-do zoznam pre macOS a web' },
    desc: { en: 'A to-do list application for macOS and the web built with Svelte and Tauri.', sk: 'Aplikácia na zoznam úloh pre macOS a web postavená na Svelte a Tauri.' } },
  { id: 'honeypot-ids', repo: 'honeypot-ids', fields: ['systems', 'software'], interests: ['infra'],
    title: 'Honeypot IDS', tag: { en: 'Honeypot digital twin', sk: 'Digitálne dvojča honeypotu' },
    desc: { en: 'A honeypot digital-twin environment for more than just WooCommerce: bait services that record what attackers try.', sk: 'Prostredie digitálneho dvojčaťa honeypotu nielen pre WooCommerce: návnadové služby, ktoré zaznamenajú, čo útočníci skúšajú.' } },
  { id: 'glagolitic', repo: 'glagolitic', fields: ['software', 'design'], interests: ['web', 'visual'],
    title: 'Glagolitic converter', tag: { en: 'Latin to Glagolitic script', sk: 'Latinka na hlaholiku' },
    desc: { en: 'A converter between Latin and Glagolitic script, the oldest Slavic alphabet, built with Svelte.', sk: 'Prevodník medzi latinkou a hlaholikou, najstarším slovanským písmom, postavený na Svelte.' } },
  { id: 'iairu-com', repo: 'iairu.com', lang: 'Astro', fields: ['software', 'design'], interests: ['web', 'brand'], image: `${P}/code_thumbs.jpg`,
    title: 'iairu.com', tag: { en: 'This site, third generation', sk: 'Táto stránka, tretia generácia' },
    desc: { en: 'The portfolio you are on: Astro, no tracking, English and Slovak. It replaced a Svelte + Sapper site and merged the code and graphic design portfolios into one.', sk: 'Portfólio, na ktorom sa nachádzaš: Astro, bez sledovania, po anglicky a slovensky. Nahradilo stránku na Svelte + Sapper a spojilo programátorské a grafické portfólio do jedného.' },
    links: [{ label: 'iairu.com', href: 'https://iairu.com' }] },
  { id: 'llm-rag-dspy', repo: 'llm-rag-dspy-playground', fields: ['ai'], interests: ['data'],
    title: 'LLM RAG × DSPy playground', tag: { en: 'Retrieval-augmented generation notebooks', sk: 'Notebooky o RAG' },
    desc: { en: 'A Jupyter playground for retrieval-augmented generation with DSPy, where prompts are programmed and optimised rather than hand-tuned.', sk: 'Jupyter ihrisko pre retrieval-augmented generation s DSPy, kde sa prompty programujú a optimalizujú namiesto ručného ladenia.' } },
  { id: 'animenews-swift', repo: 'animenews-swift', fields: ['ai', 'software'], interests: ['data'],
    title: 'AnimeNews', tag: { en: 'Prompt-engineered SwiftUI demo', sk: 'SwiftUI demo vytvorené promptami' },
    desc: { en: 'A SwiftUI app built almost entirely by prompting: a work-in-progress demo of how far directed AI development can go on native iOS and macOS.', sk: 'SwiftUI aplikácia vytvorená takmer výlučne promptovaním: rozpracované demo toho, ako ďaleko sa dá dostať riadeným AI vývojom na natívnom iOS a macOS.' } },
  { id: 'gtts-gui', repo: 'gTTSgui', fields: ['software', 'ai'], interests: ['audio', 'automation'],
    title: 'gTTS GUI', tag: { en: 'Text-to-speech export', sk: 'Export textu na reč' },
    desc: { en: 'A text area and a save button over gTTS: type text, get a spoken audio file.', sk: 'Textové pole a tlačidlo uložiť nad gTTS: napíšeš text, dostaneš zvukový súbor.' } },
  { id: 'usb-caps', repo: 'smvit-usbcaps-project-website', fields: ['hardware', 'systems'], interests: ['maker', 'infra'],
    title: 'USB-caps', tag: { en: 'Smart USB-TTL serial converter', sk: 'Inteligentný USB-TTL prevodník' },
    desc: { en: 'Advanced USB-TTL serial converter with automatic detection, BLE-based protection against USB Killers and a wireless terminal. Documentation site of the hardware project.', sk: 'Pokročilý USB-TTL sériový prevodník s automatickou detekciou, ochranou pred USB Killerom cez BLE a bezdrôtovým terminálom. Dokumentačný web hardvérového projektu.' } },
  { id: 'nightjar-gift', repo: 'ST-017-PromoSite', lang: 'Astro', fields: ['hardware', 'art3d', 'software'], interests: ['maker', 'visual', 'web', 'audio'], featured: true, image: '/img/nightjar-gift.png',
    title: 'NightJar.Gift', tag: { en: 'A CNC-carved nightjar that sings', sk: 'CNC vyrezaný lelek, ktorý spieva' },
    desc: { en: 'A wooden nightjar with a button on its back: hold it and the bird sings its churring night call, let go and it sleeps. CAD model, CNC toolpaths, board v1 to v8 and the promo site, all in the open.', sk: 'Drevený lelek s tlačidlom na chrbte: podrž ho a vták zaspieva svoj vrčivý nočný hlas, pusti a zaspí. CAD model, CNC dráhy, dosky v1 až v8 a promo web, všetko otvorene.' },
    long: { en: 'NightJar.Gift is the project that sums up this portfolio: a 3D model becomes toolpaths, toolpaths become two halves of beech, and a circuit with no microcontroller and no firmware sits inside. It is built for the course Systems Thinking in IT and Digital Fabrication at FIIT STU. Every board revision, dead end and fix is documented.', sk: 'NightJar.Gift je projekt, ktorý zhŕňa celé toto portfólio: 3D model sa mení na dráhy nástroja, dráhy na dve polovice buku a vnútri je obvod bez mikrokontroléra a bez firmvéru. Vzniká v predmete Systémové myslenie v IT a digitálna fabrikácia na FIIT STU. Každá verzia dosky, slepá ulička a oprava je zdokumentovaná.' },
    links: [{ label: 'nightjar.gift', href: 'https://nightjar.gift' }, { label: { en: 'Documentation (KNIFES)', sk: 'Dokumentácia (KNIFES)' }, href: 'https://knifes.nightjar.gift', only: 'en' }] },
  { id: 'angular-dotnet', repo: 'angular-dotnet-docker-boilerplate', fields: ['software', 'systems'], interests: ['web', 'infra'],
    title: 'Angular + .NET boilerplate', tag: { en: 'Full-stack starter with Docker', sk: 'Full-stack základ s Dockerom' },
    desc: { en: 'Tested template: Angular front end, .NET C# back end, Docker and an Nginx reverse proxy so one port serves both.', sk: 'Otestovaná šablóna: Angular frontend, .NET C# backend, Docker a Nginx reverse proxy, aby oba bežali cez jeden port.' } },
  { id: 'react-springboot', repo: 'react-springboot-docker-boilerplate', fields: ['software', 'systems'], interests: ['web', 'infra'],
    title: 'React + Spring Boot boilerplate', tag: { en: 'Full-stack starter with Docker', sk: 'Full-stack základ s Dockerom' },
    desc: { en: 'Tested template: React front end, Java Spring Boot back end, Docker and an Nginx reverse proxy for a single port and domain.', sk: 'Otestovaná šablóna: React frontend, Java Spring Boot backend, Docker a Nginx reverse proxy pre jeden port a doménu.' } },
  { id: 'dbs-django', repo: 'dbs_django_postgresql', fields: ['software', 'systems'], interests: ['web', 'data'],
    title: 'PostgreSQL REST API', tag: { en: 'Django REST over complex SQL', sk: 'Django REST nad zložitým SQL' },
    desc: { en: 'Django REST API for complex SELECT queries over a PostgreSQL database, built from scratch over an existing schema. A static snapshot of the API is online.', sk: 'Django REST API pre zložité SELECT dotazy nad databázou PostgreSQL, vytvorené od základov nad existujúcou schémou. Statická ukážka API je online.' },
    links: [{ label: { en: 'Static demo', sk: 'Statické demo' }, href: '/dbs/', only: 'en' }] },
  { id: 'decipher', repo: 'decipher', fields: ['systems'], interests: ['infra'],
    title: 'decipher', tag: { en: 'Ransomware decryption PoC', sk: 'PoC dešifrovania ransomvéru' },
    desc: { en: 'Proof of concept that recovers files encrypted by ransomware from a memory dump.', sk: 'Proof of concept, ktorý obnoví súbory zašifrované ransomvérom z výpisu pamäte.' } },
  { id: 'pcap-analyzer', repo: 'pcap_analyzer', fields: ['systems', 'software'], interests: ['infra', 'learning'],
    title: 'PCAP analyzer', tag: { en: 'Packet capture analysis', sk: 'Analýza zachytených paketov' },
    desc: { en: 'University project that reads .pcap captures and decodes frames, protocols and conversations.', sk: 'Školský projekt, ktorý číta .pcap záznamy a dekóduje rámce, protokoly a komunikácie.' } },
  { id: 'seehell', repo: 'seehell', fields: ['systems', 'software'], interests: ['infra', 'learning'],
    title: 'seehell', tag: { en: 'A Linux shell in C and x86 assembly', sk: 'Linuxový shell v C a x86 assembleri' },
    desc: { en: 'A basic Linux shell in C that talks to the kernel through hand-written x86 assembly syscalls.', sk: 'Základný linuxový shell v C, ktorý komunikuje s jadrom cez ručne písané x86 assembly syscally.' } },
  { id: 'tasm-counter', repo: 'tasm_counter', fields: ['software', 'systems'], interests: ['learning'],
    title: 'TASM counter', tag: { en: '16-bit MS-DOS character counter', sk: '16-bitový počítač znakov pre MS-DOS' },
    desc: { en: 'Counts different kinds of characters, processing arguments and files in 16-bit MS-DOS Turbo Assembler.', sk: 'Počíta rôzne druhy znakov a spracúva argumenty a súbory v 16-bitovom MS-DOS Turbo Assembleri.' } },
  { id: 'castlecall', repo: 'castlecall', fields: ['software', 'art3d'], interests: ['games', 'visual'],
    title: 'Castle Call', tag: { en: 'OpenGL 3D exploration', sk: '3D prieskum v OpenGL' },
    desc: { en: 'University OpenGL project: a small 3D world to explore, with models, lighting and camera written in C++.', sk: 'Školský projekt v OpenGL: malý 3D svet na preskúmanie, s modelmi, osvetlením a kamerou písanými v C++.' } },
  { id: 'clustering', repo: 'clustering', fields: ['ai'], interests: ['data', 'learning'],
    title: 'K-means clustering', tag: { en: 'Centroid clustering demo', sk: 'Demo zhlukovania centroidmi' },
    desc: { en: 'Demonstration of K-means centroid clustering over generated points.', sk: 'Ukážka zhlukovania K-means pomocou centroidov nad generovanými bodmi.' } },
  { id: 'zengarden', repo: 'zengarden', fields: ['ai'], interests: ['data', 'learning'],
    title: 'Zen garden', tag: { en: 'Tabu search evolution', sk: 'Evolúcia cez tabu search' },
    desc: { en: 'An attempt to solve the zen garden puzzle with tabu search and evolutionary methods.', sk: 'Pokus o vyriešenie hlavolamu zen záhrada pomocou tabu search a evolučných metód.' } },
  { id: 'astar-8puzzle', repo: 'astar_8puzzle', fields: ['ai', 'software'], interests: ['learning', 'data'],
    title: 'A* 8-puzzle', tag: { en: 'Informed search', sk: 'Informované prehľadávanie' },
    desc: { en: 'Solves the 8-puzzle with A* and different heuristics.', sk: 'Rieši hlavolam 8-puzzle pomocou A* a rôznych heuristík.' } },
  { id: 'privateshare', repo: 'PrivateShare', fields: ['software'], interests: ['automation'],
    title: 'PrivateShare', tag: { en: 'Share YouTube videos to e-mails', sk: 'Zdieľanie YouTube videí na e-maily' },
    desc: { en: 'Electron front end that quickly sets shared e-mails for many YouTube videos. Archived.', sk: 'Electron rozhranie na rýchle nastavenie zdieľaných e-mailov pre viacero YouTube videí. Archivované.' } },
  { id: 'ipv4calc', repo: 'ipv4calc', fields: ['systems', 'software'], interests: ['infra', 'learning'],
    title: 'IPv4 calculator', tag: { en: 'Network and broadcast in C', sk: 'Sieť a broadcast v C' },
    desc: { en: 'Small C program that calculates network, broadcast and number of connectable devices from any IP and mask. There is a written walkthrough of the maths.', sk: 'Malý C program, ktorý z ľubovoľnej IP a masky vypočíta sieť, broadcast a počet pripojiteľných zariadení. K matematike je písaný postup.' },
    links: [{ label: { en: 'Walkthrough', sk: 'Postup' }, href: 'doc:ipv4-calc' }] },
  { id: 'zprpr1', repo: 'zprpr1', fields: ['software'], interests: ['learning'],
    title: 'ZPRPR1', tag: { en: 'First C programming classes', sk: 'Prvé hodiny programovania v C' },
    desc: { en: 'School projects and exercises from very basic programming classes in C.', sk: 'Školské projekty a cvičenia z úplných základov programovania v C.' } },

  // ---------------- not (only) on GitHub: code ----------------
  { id: 'strukshow', worked: ['2020-06-01', '2020-08-03', 64], tools: ['Svelte', 'CockpitCMS', 'SCSS', 'PHP'], lang: 'Svelte', year: 2020, fields: ['software', 'design'], interests: ['web'], image: `${P}/strukshow.jpg`,
    title: 'StrukShow.com', tag: { en: 'Personal website with CockpitCMS', sk: 'Osobný web s CockpitCMS' },
    desc: { en: 'A complete modern personal website built on CockpitCMS and Svelte, with developer documentation covering hierarchy, CMS, Svelte, performance, SEO and deployment.', sk: 'Kompletný moderný osobný web postavený na CockpitCMS a Svelte, s vývojárskou dokumentáciou o hierarchii, CMS, Svelte, výkone, SEO a nasadení.' },
    links: [{ label: 'strukshow.com', href: 'https://www.strukshow.com' }, { label: { en: 'Developer docs', sk: 'Vývojárska dokumentácia' }, href: '/strukshow-docs/', only: 'sk' }] },
  { id: 'save-the-princess', worked: ['2020-02-21', '2020-06-24', 125], lang: 'JavaScript', year: 2020, fields: ['software', 'design'], interests: ['games'], image: `${P}/stp.jpg`,
    title: 'Save the Princess', tag: { en: 'Street Fighter style browser game', sk: 'Prehliadačová hra v štýle Street Fighter' },
    desc: { en: 'Vanilla JavaScript fighting game inspired by Street Fighter. First JavaScript project, built on the MVC pattern. Playable in the browser.', sk: 'Bojová hra vo vanilla JavaScripte inšpirovaná Street Fighterom. Prvý JavaScript projekt postavený na MVC. Dá sa hrať v prehliadači.' },
    links: [{ label: { en: 'Play', sk: 'Hrať' }, href: '/_dev/save-the-princess/game.html' }, { label: { en: 'Documentation (PDF)', sk: 'Dokumentácia (PDF)' }, href: '/dl/save-the-princess.pdf', only: 'sk' }] },
  { id: 'ahk-scripts', lang: 'AutoHotkey', year: 2018, fields: ['software'], interests: ['automation'], image: `${P}/service.jpg`,
    title: 'AutoHotkey scripts', tag: { en: '26+ daily automations', sk: '26+ každodenných automatizácií' },
    desc: { en: 'More than 26 AutoHotkey scripts for repetitive digital chores: window layout, keybinds for animation and video software, bulk export, ticket buying and more.', sk: 'Viac ako 26 AutoHotkey skriptov pre opakované digitálne činnosti: rozloženie okien, skratky pre animačný a video softvér, hromadný export, kupovanie lístkov a ďalšie.' },
    links: [{ label: { en: 'Write-up', sk: 'Popis' }, href: 'doc:ahk' }] },

  // ---------------- art and design ----------------
  { id: 'zrada', year: 2019, fields: ['art3d', 'design'], interests: ['visual'], image: `${P}/zrada.jpg`, tools: ['Blender'],
    title: { en: 'Treason', sk: 'Zrada kráľa' }, tag: { en: 'Animated typography story in Blender', sk: 'Animovaný príbeh typografie v Blenderi' },
    desc: { en: 'High school graduation project: a 3D animated story set in a world of letters, modelled, animated and rendered in Blender.', sk: 'Maturitný projekt: 3D animovaný príbeh zo sveta písmeniek, namodelovaný, animovaný a vyrenderovaný v Blenderi.' },
    links: [{ label: 'YouTube', href: 'https://www.youtube.com/watch?v=eBoPF2v_9EY' }],
    embed: 'https://www.youtube-nocookie.com/embed/eBoPF2v_9EY', gallery: [`${A}/zrada/promo.jpg`], logo: `${A}/zrada/zrada-logo.svg` },
  { id: 'zenit', year: 2017, fields: ['design'], interests: ['brand'], image: `${A}/zenit/promo.jpg`, tools: ['Adobe Illustrator'],
    title: 'ZENIT', tag: { en: 'Logo for a graphic design competition', sk: 'Logo pre grafickú súťaž' },
    desc: { en: 'Logo for the ZENIT graphic design competition in Slovakia, created for the competition itself in October 2017, with a design manual.', sk: 'Logo pre slovenskú grafickú súťaž ZENIT, vytvorené v rámci súťaže v októbri 2017, s dizajn manuálom.' },
    logo: `${A}/zenit/logo.svg`, bg: `${A}/zenit/bg.jpg`, gallery: [`${A}/zenit/promo.jpg`],
    links: [{ label: { en: 'Logo (PDF)', sk: 'Logo (PDF)' }, href: '/gfx/dl/zenit/logo.pdf' }, { label: { en: 'Design manual (PDF)', sk: 'Dizajn manuál (PDF)' }, href: '/gfx/dl/zenit/manual.pdf' }] },
  { id: 'domkultury', year: 2017, fields: ['design'], interests: ['brand'], image: `${A}/domkultury/promo.jpg`, tools: ['Adobe Illustrator'],
    title: 'Dom kultúry Javorina', tag: { en: 'Competition logo concept', sk: 'Súťažný koncept loga' },
    desc: { en: 'Competition logo concept for a cultural house, November 2017. They never called back, but the logo is still good.', sk: 'Súťažný koncept loga pre dom kultúry, november 2017. Neozvali sa naspäť, ale logo je stále dobré.' },
    logo: `${A}/domkultury/logo.svg`, bg: `${A}/domkultury/bg.jpg`, gallery: [`${A}/domkultury/promo.jpg`] },
  { id: 'ghast', year: 2017, fields: ['design'], interests: ['brand', 'visual'], image: `${A}/ghast/promo.jpg`, tools: ['Adobe Illustrator', 'Adobe Photoshop'],
    title: 'Ghast Energy', tag: { en: 'Energy drink concept', sk: 'Koncept energetického nápoja' },
    desc: { en: 'Brand and packaging concept for an energy drink, a closing exam project from May 2017.', sk: 'Koncept značky a obalu pre energetický nápoj, klauzúrna práca z mája 2017.' },
    logo: `${A}/ghast/logo.svg`, bg: `${A}/ghast/bg.jpg`, gallery: [`${A}/ghast/promo.jpg`] },
  { id: 'kooptn', year: 2018, fields: ['design'], interests: ['brand'], image: `${A}/kooptn/promo.jpg`, tools: ['Adobe Illustrator'],
    title: { en: 'School cooperation', sk: 'Spolupráca škôl' }, tag: { en: 'Logo for a cooperation of schools', sk: 'Logo pre spolok škôl' },
    desc: { en: 'The task was to invent a logo for a cooperation of schools that had no name yet, February 2018. Includes the drafts and the defence.', sk: 'Úlohou bolo vymyslieť logo pre spolok škôl, ktorý ešte nemal názov, február 2018. Obsahuje návrhy aj obhajobu.' },
    logo: `${A}/kooptn/logo.svg`, bg: `${A}/kooptn/bg.jpg`, gallery: [`${A}/kooptn/promo.jpg`, `${A}/kooptn/promo2.jpg`],
    links: [{ label: { en: 'Logo (PDF)', sk: 'Logo (PDF)' }, href: '/gfx/dl/kooptn/logo.pdf' }, { label: { en: 'Drafts 1 (PDF)', sk: 'Návrhy 1 (PDF)' }, href: '/gfx/dl/kooptn/navrhy-1.pdf' }, { label: { en: 'Drafts 2 (PDF)', sk: 'Návrhy 2 (PDF)' }, href: '/gfx/dl/kooptn/navrhy-2.pdf' }, { label: { en: 'Defence (PDF)', sk: 'Obhajoba (PDF)' }, href: '/gfx/dl/kooptn/obhajoba.pdf' }] },
  { id: 'drot', year: 2018, fields: ['design'], interests: ['brand', 'web'], image: `${A}/drot/promo.jpg`, tools: ['Adobe Illustrator', 'Adobe Photoshop'],
    title: 'Drôt', tag: { en: 'Social network concept on the theme of "thread"', sk: 'Návrh sociálnej siete na tému „vlákno“' },
    desc: { en: 'Brand and interface concept for a social network themed around a thread, a closing exam project from May 2018.', sk: 'Koncept značky a rozhrania sociálnej siete na tému vlákna, klauzúrna práca z mája 2018.' },
    logo: `${A}/drot/logo.svg`, bg: `${A}/drot/bg.jpg`, gallery: [`${A}/drot/promo.jpg`, `${A}/drot/promo2.jpg`] },
  { id: 'slniecko', year: 2018, fields: ['design'], interests: ['brand'], image: `${A}/slniecko/promo.jpg`, tools: ['Adobe Illustrator'],
    title: 'Slniečko', tag: { en: 'Travel agency logo concept', sk: 'Koncept loga cestovnej kancelárie' },
    desc: { en: 'Logo concept for the travel agency Slniečko ("little sun"), November 2018.', sk: 'Koncept loga pre cestovnú kanceláriu Slniečko, november 2018.' },
    logo: `${A}/slniecko/logo.svg`, bg: `${A}/slniecko/bg.jpg`, gallery: [`${A}/slniecko/promo.jpg`] },
  { id: 'web-designs', year: 2018, fields: ['design', 'software'], interests: ['web', 'brand'], image: `${A}/branokuzelnik.jpg`, tools: ['HTML', 'CSS', 'Adobe Photoshop'],
    title: { en: 'Website designs', sk: 'Návrhy webov' }, tag: { en: 'BS servis, Braňo Kúzelník, BUST design', sk: 'BS servis, Braňo Kúzelník, BUST design' },
    desc: { en: 'Early client websites designed and coded by hand: a textile service, a magician and a design studio.', sk: 'Prvé klientske weby navrhnuté a naprogramované ručne: textilný servis, kúzelník a dizajnérske štúdio.' },
    gallery: [`${A}/bolstrun.jpg`, `${A}/branokuzelnik.jpg`, `${A}/bustdesign.jpg`, `${A}/iairu.jpg`] },
  { id: 'comics', year: 2024, fields: ['design', 'art3d'], interests: ['visual'], image: `${A}/comics/6_thumb.jpg`, tools: ['Procreate', 'Clip Studio Paint'],
    title: { en: 'Comic book', sk: 'Komiks' }, tag: { en: 'Sample pages', sk: 'Ukážkové strany' },
    desc: { en: 'Some sample pages from my comic book.', sk: 'Niekoľko ukážkových strán z môjho komiksu.' },
    gallery: srcs('comics'), thumbs: thumbs('comics'), alts: alts('comics') },
  { id: 'illustration', year: 2022, fields: ['design'], interests: ['visual'], tools: ['Procreate', 'Clip Studio Paint'],
    title: { en: 'Illustration', sk: 'Ilustrácia' }, tag: { en: 'Selected illustrations, mostly from around 2022', sk: 'Vybrané ilustrácie, väčšinou z okolia roku 2022' },
    desc: { en: 'Selected illustrations from my work, mostly dated around 2022.', sk: 'Vybrané ilustrácie z mojej tvorby, väčšinou datované okolo roku 2022.' },
    gallery: srcs('illustration'), thumbs: thumbs('illustration'), alts: alts('illustration') },
  { id: 'sketches', year: 2024, fields: ['design', 'art3d'], interests: ['visual'], tools: ['Procreate', 'Clip Studio Paint'],
    title: { en: 'Sketches', sk: 'Skice' }, tag: { en: 'From the ayu_animations account', sk: 'Z účtu ayu_animations' },
    desc: { en: 'Sketches related to my animation Instagram account ayu_animations.', sk: 'Skice súvisiace s mojím animačným Instagram účtom ayu_animations.' },
    links: [{ label: 'Instagram ayu_animations', href: 'https://www.instagram.com/ayu_animations' }],
    gallery: srcs('sketches'), thumbs: thumbs('sketches'), alts: alts('sketches') },
  { id: 'environment-paintings', year: 2022, fields: ['design', 'art3d'], interests: ['visual'], tools: ['Procreate', 'Clip Studio Paint'],
    title: { en: 'Environment paintings', sk: 'Maľby prostredí' }, tag: { en: 'Background art for my animation', sk: 'Pozadia pre moju animáciu' },
    desc: { en: 'Sample environment paintings, mostly background art for my animation.', sk: 'Ukážkové maľby prostredí, väčšinou pozadia pre moju animáciu.' },
    gallery: srcs('paintings'), thumbs: thumbs('paintings'), alts: alts('paintings') },
  { id: 'painting-costume', year: 2017, fields: ['design'], interests: ['visual', 'maker'], tools: ['Acrylic', 'Oil', 'EVA foam'],
    title: { en: 'Painting & costume making', sk: 'Maľba a kostýmy' }, tag: { en: 'Traditional craft', sk: 'Tradičné remeslo' },
    desc: { en: 'Acrylic and oil on canvas, focused on expressionism and portraits, plus hand-built costumes and props from fabric and EVA foam.', sk: 'Akryl a olej na plátne so zameraním na expresionizmus a portréty, plus ručne vyrobené kostýmy a rekvizity z látky a EVA peny.' } },
  { id: 'layf-animation', year: 2016, fields: ['art3d', 'design'], interests: ['visual'], tools: ['Blender', 'Clip Studio Paint'],
    title: { en: 'layf (animated series)', sk: 'layf (animovaný seriál)' }, tag: { en: 'In the making since 2016', sk: 'Vzniká od roku 2016' },
    desc: { en: 'An animated series I have worked on extensively since early 2016, about the time I started learning Japanese (unrelated). Restarted from scratch in 2020 for artistic improvement and mostly on hiatus since 2021. Updates appear on the ayu_animations Instagram.', sk: 'Animovaný seriál, na ktorom intenzívne pracujem od začiatku roku 2016, približne v čase, keď som sa začal učiť japončinu (nesúvisí). V roku 2020 som ho začal úplne odznova kvôli umeleckému zlepšeniu a od roku 2021 je väčšinou pozastavený. Novinky sa objavujú na Instagrame ayu_animations.' },
    links: [{ label: 'Instagram ayu_animations', href: 'https://www.instagram.com/ayu_animations' }],
    gallery: srcs('animation'), thumbs: thumbs('animation'), alts: alts('animation'), galleryTitle: { en: 'Behind the scenes', sk: 'Zákulisie' } },

  // ---------------- research and presentations ----------------
  { id: 'find-a-cat-thesis', lang: 'PHP', year: 2024, fields: ['software', 'systems'], interests: ['data', 'web'], worked: ['2022-09-20', '2024-05-16', 605], tools: ['Laravel', 'MySQL', 'Docker', 'Bootstrap'],
    title: { en: 'Find A Cat: Bachelor thesis', sk: 'Find A Cat: bakalárska práca' }, tag: { en: 'Bachelor thesis in Informatics, FIIT STU', sk: 'Bakalárska práca z informatiky, FIIT STU' },
    desc: { en: 'My Bachelor thesis: exploratory data analysis and a redesigned, modular evidence system for animal (cat pedigree) databases, implemented in Laravel with a Docker image.', sk: 'Moja bakalárska práca: prieskumná analýza dát a prepracovaný, modulárny evidenčný systém pre databázy zvierat (rodokmene mačiek), implementovaný v Laraveli s Docker image.' },
    links: [{ label: { en: 'Read the summary', sk: 'Prečítať zhrnutie' }, href: 'doc:find-a-cat-thesis' }, { label: { en: 'Thesis (PDF)', sk: 'Práca (PDF)' }, href: '/dl/find-a-cat-thesis.pdf' }, { label: { en: 'Presentation (PDF)', sk: 'Prezentácia (PDF)' }, href: '/dl/find-a-cat-presentation.pdf' }, { label: 'CRZP.sk', href: 'http://CRZP.sk' }] },
  { id: 'right-to-repair', year: 2020, fields: ['hardware'], interests: ['maker', 'learning'], worked: ['2020-12-03', '2020-12-08', 5], tools: ['Presentation'],
    title: { en: 'Right to Repair', sk: 'Právo na opravu' }, tag: { en: 'A presentation, and the dark side of Apple', sk: 'Prezentácia a tmavá stránka Applu' },
    desc: { en: 'A presentation covering the Right to Repair and, on a related note, the dark side of Apple.', sk: 'Prezentácia o práve na opravu a, v súvislosti s tým, o tmavej stránke Applu.' },
    links: [{ label: { en: 'Video', sk: 'Video' }, href: 'https://www.youtube.com/watch?v=x2ToofrDWzw' }, { label: { en: 'Slides (PDF)', sk: 'Snímky (PDF)' }, href: '/dl/right-to-repair-prez.pdf' }] },
];

const KNOWN_LANG = { 'Jupyter Notebook': 'Python (notebook)' };

// Picture order: a hand-picked one, else one taken from the project's GitHub repository
// (src/data/repo-images.json), else a generated one (npm run thumbs, scripts/make-thumbs.mjs).
export const projects = raw.map((p) => {
  const r = p.repo ? gh[p.repo] : null;
  if (p.repo && !r) throw new Error(`projects.js: repo ${p.repo} missing from repos.json (run npm run sync:repos)`);
  const language = p.lang !== undefined ? p.lang : r ? (KNOWN_LANG[r.language] ?? r.language) : null;
  const links = (p.links || []).map((l) => ({ ...l }));
  return {
    ...p,
    image: p.image ?? p.thumbs?.[0] ?? (repoImages[p.id] ? `/img/repos/${p.id}.jpg` : `/img/thumbs/${p.id}.jpg`),
    language,
    stars: r ? r.stars : 0,
    year: p.year ?? Number(r.created.slice(0, 4)),
    updated: r ? r.pushed : null,
    repoUrl: r ? r.url : null,
    fork: r ? r.fork : false,
    archived: r ? r.archived : false,
    links,
  };
}).sort((a, b) => b.stars - a.stars || (b.updated || `${b.year}`).localeCompare(a.updated || `${a.year}`) || a.id.localeCompare(b.id));

export const byId = Object.fromEntries(projects.map((p) => [p.id, p]));

/** Count items per key for a facet, only counting keys present. */
export function facet(list, pick) {
  const m = new Map();
  for (const p of list) for (const k of [].concat(pick(p) ?? [])) m.set(k, (m.get(k) || 0) + 1);
  return m;
}
