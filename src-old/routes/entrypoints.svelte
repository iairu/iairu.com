<h1>Entrypoints</h1>
<p>This file will be removed after build using utility/postexport.mjs, but is necessary for export command to crawl subsites with redirects properly.</p>

<h2>Main entrypoints</h2>
<a href="/">Language redirect</a>
<!-- Note that / entrypoint contains links to /en and /sk in <noscript> for sapper export to crawl them -->
<!-- If you don't want <noscript> make sure to specify the links here -->

<h2>Embedded sites</h2>
<p>These are usually not linked anywhere else</p>
<a href="/links">Links</a>
<!-- Note that /links entrypoint contains links to /en/links and /sk/links in <noscript> for sapper export to crawl them -->
<!-- If you don't want <noscript> make sure to specify the links here -->

<h2>Tabbed sites</h2>
<p>These are linked on-site, but in a tab, so crawler fails to discover them</p>
<a href="/en/art/comics">Comics</a>
<a href="/sk/art/komixy">Komixy</a>
<a href="/en/dev/save-the-princess">Save the Princess</a>
<a href="/sk/dev/save-the-princess">Save the Princess</a>
<a href="/en/dev/iptables-portforward">iptables-portforward</a>
<a href="/sk/dev/ipv4-calc">IPv4 Calc</a>
<a href="/sk/dev/ahk">Každodenná digitálna automatizácia pomocou AutoHotkey skriptov</a>
<a href="/sk/dev/log">Zápisky programovacej aktivity</a>
