---
title:	Presmerovanie portov (port-forwarding) na Raspberry Pi Access Pointe pomocou IPTables
category:	guides
tags:	iptables, networking, linux, sysadmin
desc:	Návod nielen na presmerovanie portov, ale aj na riešenie problémov s IPTables.
date:	2020-09-05
bg:		default
---

> Tento návod platí pre každú linuxovú distribúciu na akejkoľvek platforme (nemusí to byť Raspberry Pi), na ktorej beží firewall `iptables` a ktorá má prístup do vnútornej aj vonkajšej siete, viac o oboch nižšie.

# Úvod

## Ako mám nastavený svoj Raspberry Pi AP

Predstav si Raspberry Pi pripojené k vonkajšej sieti cez Ethernet, ktoré vysiela Wi-Fi hotspot, a ten je zároveň vnútornou sieťou. V základe sa to dá dosiahnuť cez Network Manager, dokonca s grafickým rozhraním.

Pre potreby tohto návodu (a v mojej sieti predvolene) sú vonkajšie IP adresy `192.168.1.1+` a vnútorné adresy `10.42.0.1+`.

Ak je vonkajšia sieť pripojená na internet, pripojenie sa preposiela aj vnútorným klientom. Vonkajšia sieť však o takýchto klientoch nemusí vedieť, pretože ich ľahko zakryje MAC a IP adresa Wi-Fi rozhrania AP.

# Problém

## Ako mi momentálne funguje smerovanie portov

Na jednom z vnútorných klientov (napríklad `10.42.0.85:80`) beží webserver a chceš ho sprístupniť zvonka.

To znamená, že klient na adrese, povedzme, `192.168.2.2`, by sa mal vedieť cez vonkajšiu IP adresu tvojho AP pripojiť na server na `10.42.0.85:80`.

Predvolene by každá požiadavka na adresu tvojho AP skončila chybou, pretože AP nie je webserver, webserver je jeho klient.

![Chýbajúci článok medzi AP a webserverom](/img/docs/networks.jpg)

# Riešenie

## Nastavenie presmerovania portov

Práve preto je na každom bežnom routeri tabuľka presmerovania portov, ktorá priraďuje požiadavky na router jednotlivým klientom a dá sa viazať na MAC alebo IP adresu, prípadne na obe.

Presmerovanie portov zároveň dovoľuje premapovať celý rozsah portov na iné čísla (takže port v požiadavke nemusí byť rovnaký ako port, na ktorom webserver beží, ak je napríklad obsadený alebo ho jednoducho chceš inde).

Na linuxových zariadeniach ako Raspberry Pi sa to dá dosiahnuť pomocou firewallu `iptables`, ktorého sa mnohí boja.

### Pridanie potrebných pravidiel iptables

Najprv musíš požiadavku zachytiť niekde v sieti reťazcov a tabuliek `iptables`.

Skvelý začiatok je pozrieť si *iptables Processing Flowchart* (vývojový diagram spracovania), ktorý ti dá predstavu o tom, ako paket s požiadavkou putuje.

![Vývojový diagram spracovania v iptables](/img/docs/flowchart.jpg)

Keď si vieš predstaviť možné cesty, musíš v jednotlivých tabuľkách skontrolovať, či paket s požiadavkou prepustia na správne miesto určenia.

Najpoužívanejšia je predvolená tabuľka `FILTER` (ktorú nemusíš v príkazoch uvádzať a často sa vynecháva), my však ideme najprv do inej, tabuľky `NAT`.

```bash
# Výpis záznamov v tabuľke NAT
iptables -t nat -L
```

Ak si sa pozrel na diagram, vieš, že sme hneď za prvým rozhodnutím (kontrola, či je zdrojom paketu localhost, čo určite nie je, pretože požiadavku posielame z vonkajšej siete).

Tabuľka a reťazec `nat PREROUTING` sú zrejme správnym miestom pre naše prvé pravidlo presmerovania, pretože spĺňajú všetky naše kritériá (pakety (požiadavky) z vonkajšej siete treba presmerovať na vnútorného klienta, nie na samotné Pi).

![Okolie tabuľky/reťazca, o ktorých je reč](/img/docs/flowchart-1.jpg)

Dôvod je ten, že ďalším rozhodnutím je, či je paket určený „pre tento hostiteľ“. To určite nie je pravda, no predvolene bude, pretože Pi nemá tušenie, že chceš požiadavky na daný port presmerovať na iného klienta (vnútorného alebo vonkajšieho).

**Teraz vieme, kam udrieť, ostáva zistiť, ako:**

```bash
# Presmeruj prevádzku na port 80 na vnútorný webserver na 10.42.0.85:80
iptables -t nat -I PREROUTING 1 -p tcp --dport 80 -j DNAT --to-destination 10.42.0.85:80
```

Spočiatku to môže vyzerať ako veľa zvláštnych zbytočných prepínačov, „*Prečo je tam 1, čo robí -I, čo je DNAT*“ sa možno pýtaš, a tu sú odpovede:

- `-t nat` Upravujeme tabuľku NAT
- `-I PREROUTING 1` Vkladáme (`I`nsert) pravidlo do reťazca `PREROUTING` na pozíciu `1`
  - (Dá sa aj pripojiť na koniec reťazca pomocou `-A` bez pozície, no to nezaručí, že tvoju požiadavku nezablokuje skoršie pravidlo)
- `-p tcp` HTTP (protokol webserverov) beží nad protokolom TCP
- `--dport 80` je cieľový port. Je to port uvedený v požiadavke z vonkajšej siete, inak povedané port, **z ktorého** presmerovávaš.
- `-j DNAT` je pravidlo, ktoré dovoľuje presmerovať požiadavku na iný cieľ
  - `--to-destination 10.42.0.85:80` je cieľ spolu s voliteľným portom, **na ktorý** presmerovávaš, tu ponechávame ten istý port (80).

A tým si vytvoril najdôležitejšie pravidlo tohto návodu. Ak si sa pomýlil, môžeš:

- Skontrolovať aktuálny stav tabuľky pomocou `iptables -t nat -L` a všimnúť si pozíciu chybného pravidla v reťazci
- Odstrániť pravidlo pomocou `iptables -t nat -D CHAIN N`, kde CHAIN je názov reťazca a N je pozícia (od 1 zhora v reťazci).

### Stále to nefunguje, pretože...

Je pravdepodobné, že tvoje pravidlo stále nestačí na to, aby `iptables` požiadavku preposlal. Hlavné dôvody sú tri:

- `iptables` momentálne nebeží
- Reťazce na ceste k tvojmu pravidlu a za ním (v diagrame), alebo reťazec, v ktorom je tvoje pravidlo, majú predvolenú politiku (platí, keď nezodpovedá žiadne pravidlo) inú než ACCEPT.
- V niektorom z reťazcov za alebo pred tvojím pravidlom (v diagrame) je pravidlo, ktoré spôsobí, že `iptables` tvoju požiadavku odmietne (REJECT) alebo zahodí (DROP), prípadne ju presmeruje na zlé miesto.

Prvý dôvod sa dá jednoducho skontrolovať vypísaním aktívnych modulov jadra a hľadaním iptables: `lsmod | grep "ip_tables"` (z nejakého dôvodu tam má byť podčiarkovník, pre istotu skús aj `grep "ip"` a pozri sa na relevantné zmienky).

Druhý a tretí dôvod sú súčasťou jedného problému, ktorý si vyžiada hlbšie ladenie a vytváranie alebo úpravu pravidiel v rôznych častiach diagramu `iptables`.

### Ladenie IPTables

> To sa dá dosiahnuť:
>
> - Hľadaním odpovede na fórach ako StackOverflow (užitočné na preskúmanie možností, ale samo osebe zriedka povie, kde je tvoj konkrétny problém)
> - Vytvorením a čítaním logov, aby si zistil, akou cestou tvoja požiadavka ide
> - Postupnou kontrolou tabuliek a reťazcov, či v nich nie sú pravidlá, ktoré spôsobujú problém

**Hľadanie príčiny**

Pozri sa na diagram iptables a skús zistiť, kde by sa požiadavka mohla zasekať, výpisom záznamov v danych tabuľkách.

Najpravdepodobnejšie miesta sú tabuľka FILTER (je najpoužívanejšia) alebo tabuľka NAT (mohol si niečo nesprávne nastaviť).

Ak používaš extra zabezpečenú distribúciu Linuxu, prichádza do úvahy aj tabuľka SECURITY a nakoniec MANGLE. V bežnom nastavení by som problém v týchto dvoch nečakal.

Ak nenájdeš žiadne problémové pravidlá, skontroluj aj politiky.

Možno niektorý z reťazcov nemá žiadne pravidlá a jeho predvolená politika nie je ACCEPT. V takom prípade môžeš buď pridať pravidlo ako predtým, alebo zmeniť politiku:

```bash
iptables -t tablename -P CHAIN POLICY
```

- Kde názov tabuľky je „nat“, „filter“ (možno vynechať), „security“ alebo „mangle“; reťazec je názov reťazca a politika má byť ACCEPT, ale môžeš použiť aj DROP.
- Buď opatrný, hlavne aby si si nechtiac nevytvoril v firewalle obrovskú dieru tým, že povolíš viac, než je potrebné. V zabezpečených prostrediach si mnohonásobne lepšie vytvoriť konkrétne pravidlá.

Takéto pravidlá môžeš vytvoriť:

```bash
# Pripoj (na koniec) reťazca INPUT tabuľky filter pravidlo ACCEPT pre čokoľvek s cieľovým portom 80 prichádzajúce z voliteľného rozhrania "eth1"
# (ak sú predtým pravidlá, ktoré paket zahodia, na toto sa nedostane; je aj nepravdepodobné, že sa dôjde k reťazcu INPUT vzhľadom na cestu, ktorou by mal paket v diagrame ísť)

iptables -A INPUT -i eth1 -p tcp --dport 80 -j ACCEPT


# Prijmi čokoľvek na protokole TCP s cieľovým portom 80 v reťazci FORWARD tabuľky filter, vlož toto ako úplne prvé pravidlo skôr, než ho ostatné stihnú spracovať

iptables -I FORWARD 1 -p tcp --dport 80 -j ACCEPT
```

#### Stále to nefunguje? Logy!

**Spustenie logovania**

Ak si urobil všetko, čo si mohol, alebo už nechceš strácať čas hľadaním nejakého divného pravidla, ktoré nevieš nájsť, môžeš sa pokúsiť zúžiť problém pridaním pravidla LOG do ľubovoľného reťazca na ľubovoľnú pozíciu:

```bash
iptables -t nat -I PREROUTING 1 -m limit --limit 5/m -j LOG --log-prefix="iptables NAT PRE: " --log-level 7
```

- V tomto prípade sa logovanie spustí okamžite na reťazci nat/PREROUTING pred akýmkoľvek pravidlom (na prvej pozícii), s limitom (aby sa logy neprehltili) a predponou. Úroveň logovania 7 prezradí najviac informácií (známa aj ako ladiaca úroveň).

**Čítanie logov**

Na čítanie logov odporúčam skúsiť niektorý z týchto príkazov:

```
journalctl -f
```

```
tail -f /var/log/syslog
```

Ak nefunguje ani jeden, môžeš sa pozrieť do adresára `/var/log` na nedávno (posledných 10 minút) zmenené súbory pomocou `find /var/log -mmin 10` a potom si súbory pozrieť pomocou `tail -f PATH_TO_FILE`.

**Ako logy čítať**

Hlavným orientačným bodom sú predpony, ktoré si zadal v poslednom príkaze iptables, pomôžu ti pochopiť, cez ktoré logovacie pravidlo paket prešiel.

Druhoradé sú skutočné informácie v pakete, ktorý môže `iptables` zablokovať, presmerovať alebo prepustiť, ako zdrojové a cieľové adresy a porty. Aj tie ti pomôžu poznať, že vidíš log paketu, ktorý sa snažíš dostať cez sieť.

Napokon, či sa paket dostane až na koniec, zistíš tak, že pomaly zužuješ pravidlá logovaním v rôznych reťazcoch a sleduješ, cez ktoré paket prešiel nepoškodený.

Odporúčam otvoriť si na to dva terminály, jeden so živým logom a druhý, v ktorom budeš pridávať a odstraňovať pravidlá iptables a logovacie pravidlá a v prvom sledovať ich účinok.

> Pre mňa väčšia časť zo 6 hodín, počas ktorých moje pakety odmietali prejsť, išla na zistenie, ako sa k tejto fáze dostať. Môj problém bol, že niektoré pravidlo tabuľky FILTER v reťazci FORWARD zamietalo môj paket, hoci to z výpisu nebolo zrejmé. Problém som vyriešil vložením pravidla na prvú pozíciu, ktoré ACCEPT-uje čokoľvek určené pre môj webserver. (`iptables -I FORWARD 1 -p tcp --dport 80 -j ACCEPT`)

# Záver

Ak si sa dostal až sem, gratulujem, tvoj paket sa s najväčšou pravdepodobnosťou dostal / dostane cez sieť pravidiel, reťazcov a tabuliek.

Svet Linuxu je rozľahlý, rôzne nástroje majú rôzne a viac než často spletité spôsoby, ako veci urobiť, a to natoľko, že sa v tom rozsahu strácajú mnohí, vrátane mňa. Hlavným dôvodom je podľa mňa to, že neexistuje priamočiary návrhový kódex ani štandardizácia.

Napriek tomu sme teraz obaja o krok bližšie k tomu, aby sme tento obrovský virtuálny svet poriadne pochopili.

Ďakujem.
