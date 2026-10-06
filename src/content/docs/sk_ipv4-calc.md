---
title: 	IPv4, Počiatočné i maximálne adresy a masky
category:	guides
tags:	networking, math, bitwise ops
date:	2020-06-14
bg: 	default
---

Máš adresu `192.168.2.4/22`, kde `/22` je maska siete.

Porebuješ len z tohto zistiť počiatočnú a koncovú adresu tejto siete, koľko IP adries sa do siete vôjde a ako bonus aj masku zapísanú v štýle adresy.

## **1. Binárny tvar adresy**

Na jednoduché zistenie jednotlivých vecí treba použiť binárne tvary adries a masky.

Každá časť adresy oddelená bodkou, nazývaná **oktet**, je jedno binárne číslo, resp. reťazec, kde 0 alebo 1 postupne reprezentujú tieto mocniny dvojky: **128, 64, 32, 16, 8, 4, 2, 1**. Oktet `192` by teda bol `1100 0000` a celá adresa `192.168.2.4`:

```
1100 0000 | 1010 1000 | 0000 0010 | 0000 0100
```

**Ako to vypočítať rýchlo z hlavy?** 

Hľadaj najväčšie číslo ktoré sa z desiatkového tvaru vôjde do vypísaných mocnín - v prípade `192` by to bolo **128**, ktoré je hneď na prvej pozícií. Jednotku zapíšeš, 192-128=64, **64** je hneď druhá pozícia, zostala ti 0 a máš to celé v binárnom, teda `1100 0000`.

Aby si to pochopil, tak napríklad ešte `168`, **128** sa doň vôjde, takže hneď píšeš jednotku, 168-128=40, do `40` sa najbližšie vôjde **32**, 40-32=8, zapíšeš jednotky na pozície **128, 32, 8**, zvyšné sú nuly a máš binárne číslo `1010 1000`.

Každý oktet sa takto počíta zvlášť. Teraz by si už mal mať adresu v binárnom tvare/čísle.

---

## **2. Binárny a dekadický tvar masky**

Ak máš masku zapísanú ako `/22` tak to jednoducho znamená 22 jednotiek za sebou a zvyšok nuly, v tomto prípade píšeš všetky oktety naraz:

```
1111 1111 | 1111 1111 | 1111 1100 | 0000 0000
```

**Dekadický tvar:**
Ak by sa ti to chcelo prepisovať z binárneho do dekadického (čiže desiatkového) tvaru tak by táto maska bola `255.255.252.0`, s tým, že pre túto konverziu samozrejme riešiš každý oktet zvlášť, rovnaké mocniny ako v príklade binárneho tvaru adresy, teda **128,64,32,16,8,4,2,1**.

Všimni si, že pri konverzií 1111 1100, keď vieš, že maximálne číslo dosiahnuteľné (1111 1111) je 255, stačí odčítať 2 a 1 a máš 252. Netreba to teda v tomto prípade pracne riešiť od začiatku.

---

## **3. Počiatočná adresa siete**

Teraz keď máš binárnu adresu aj binárnu masku (prvé dva príklady), potrebuješ urobiť tzv. binárny súčin týchto dvoch a z toho ti vyjde počiatočná adresa siete.

Binárny súčin funguje tak, že prenásobíš cifry pod sebou a dostaneš teda buď 0 alebo 1.

```
1100 0000 | 1010 1000 | 0000 0010 | 0000 0100 (adresa)
1111 1111 | 1111 1111 | 1111 1100 | 0000 0000 (maska)
_____________________________________________
1100 0000 | 1010 1000 | 0000 0000 | 0000 0000 (bin. súčin = počiatočná adresa siete)
```

Teraz máš počiatočnú adresu siete, už ju len hodíš do dekadického tvaru (pozri príklad dekadického tvaru masky pre pochopenie) a máš `192.168.0.0`.

Táto adresa nikdy nebude patriť špecifickému zariadeniu, využíva sa ako "číslo siete", prvá použiteľná adresa pre zariadenie (`192.168.0.1`) je hneď po nej.

---

## **4. Koncová adresa siete**

Nuly v maske premeníš na jednotky a jednotky ktoré tam už boli na nuly, vznikne ti teda akási "inverzná maska" a potom urobíš binárny súčet cifier pod sebou ignorujúc zvyšok.

```
1100 0000 | 1010 1000 | 0000 0010 | 0000 0100 (adresa)
0000 0000 | 0000 0000 | 0000 0011 | 1111 1111 (inverzná maska)
_____________________________________________
1100 0000 | 1010 1000 | 0000 0011 | 1111 1111 (súčet = koncová adresa siete)
```

Potom to prehodíš do dekadického tvaru (pozri príklad dekadického tvaru masky pre pochopenie) a máš `192.168.3.255`.

Táto adresa nikdy nebude patriť špecifickému zariadeniu, ale využíva sa na [broadcast](https://cs.wikipedia.org/wiki/Broadcast), čiže zasielanie správ všetkým zariadeniam na sieti.

---

## **5. Maximálny počet adries v sieti**

Na toto ti stačí "inverzná maska" z predchádzajúceho príkladu.

```
0000 0000 | 0000 0000 | 0000 0011 | 1111 1111 (inverzná maska)
```

Tú premeníš na dekadický tvar a dostaneš `0.0.3.255`.

Teraz si musíš uvedomiť, že pri IP adresách je aj oktet `0` správny, teda začíname od nuly a ku každému oktetu dekadickej inverznej masky musíš pre správny výpočet pripočítať jednotku. Napr. `0-255` je 256 čísel. Po pripočítaní to už nebude inverzná maska ale maximálne počty cifier pre jednotlivé oktety: `1.1.4.256`.

Na záver ich len všetky prenásobíš:

```
1*1*4*256 = 1024
```

A **1024** je správna odpoveď pre maximálny počet adries v sieti.

Prvá adresa (v tomto prípade `192.168.0.0`) je číslo siete a posledná (tu `192.168.3.255`) je pre [broadcast](https://cs.wikipedia.org/wiki/Broadcast), takže max. počet zariadení je **1022**.

---

## **Teraz už vieš...**

Sieť, na ktorej je IPv4: `192.168.2.4/22`

- má masku `255.255.252.0`
- má počiatočnú adresu `192.168.0.0` (tzv. číslo siete)
- má koncovú adresu `192.168.3.255` (tzv. broadcast)
- môže mať maximálne 1024 adries (z toho 1022 zariadení)