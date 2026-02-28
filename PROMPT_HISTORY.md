improve site design, remove unnecessary features from sidebar, make simpler and more accessible with existing features, remove unnecessary features from header, improve dark mode, improve mobile responsive css, add hero-style intro for homepage that looks like one of those fancy ai websites

---

dark mode does not work properly for sidebar and some text on site that is kept black, all text should be a shade of white when dark mode is active, nothing should have white-ish background when dark mode is active, make sure to invert (and adjust with css filters like hue) any images that are used on the site under dark mode, add "iairu" (aka "i air you" as software developer/artist) style logo, make sure there are no dead buttons that lead to 404 page, make sure art portfolio can be opened and adjust the hero branding to include this "split attraction" reality

---

improve breadcrumbs padding, improve design of "education" and "skills" part of biography, make colors in all elements more accessibility friendly in footer, improve design to no longer utilize rounded corners, add sidebar hide/show button, change main color across website from blueish to greenish when in art portfolio and vice versa for software portfolio

colors in footer components are still not properly readable make them all white including text and borders, dark mode still does not have white text in thumbs, and some dark mode backgrounds are white including images, fix

sidebar has unnecessary margin from header, add animated background behind hero, art portfolio button looks grayed out (as if disabled) on dark mode, adjust the website to fit the "split attraction" theme between it and art, make the footer white colors on light mode as well because footer background is dark on light mode

add animated backgrounds and jagged lines where relevant, copy footer content colors from dark to white theme

create a comprehensive plan: add collapse-uncollapse button to sidebar, adjust sidebar heading color to match software/art button colors, make the art button equivalently important to software, move projects and biography into their own pages with sidebar, create proper landing page with hero "split attraction" svg preview and other sections like modern sites, landing page will not have a sidebar but a choice between software and art projects with two highlighted previews from each, art will focus mostly on traditional painting and costume design

---

do not show sidebar on landing page, make landing page more responsive to smaller width screens

remove the margin from above hero landing section, make the header merged with the hero section only on landing page

make the contact section merged with jagged line and background from the bottom of the pages

---

make the modal compatible with dark mode and remove rounded corners from it, basically make it look like it fits the rest of the site, improve css on landing page, autohide (and show on hover) sidebar on blog posts

---

fix: the collapsible sidebar is empty when in the hover mode

fix the deprecation warning for sass and any other remaining warnings during build process

---

delete .post-bg, button.sidebar-toggle is overlaying .left and a.home (e.g. .left.logo), reduce .breadcrumbs bottom padding and increase left padding, .sidebar-toggle does not have dark mode, .home should have more right padding, sidebar is empty on mobile as it is not triggered by hover, hide .collapse-toggle and .expand-toggle on mobile, make sidebar always expanded internally on mobile, .split-highlights-container horizontal padding causes content to go off screen, .highlight-thumb is missing white text in dark mode, a.button should have white text on dark mode always

hide hamburger menu on landing page, "header .right" contents are partially off-screen, put visibility hidden on a.home, make modal have higher z-index than hamburger menu button, dark theme toggle is sometimes not remembered (store dark mode manual trigger state in localStorage)

make .sidebar-toggle look like .theme-toggle, make .logo centered vertically

copy .section-header background animation to section.thumb, add better border animation to section.thumb

---

fix the following:

src/components/Thumb.svelte
A11y: visible, non-interactive elements with an on:click event must be accompanied by an on:keydown, on:keyup, or on:keypress event.
84: 
85:             <!-- Image -->
86:             {#if img}<img class="img" src={"/_thumbs/imgs/" + (img.includes(".") ? img : img + ".jpg")} alt={name + " photo"} on:click={handleImageModal}>{/if}
                         ^
87: 
88:             <!-- Navigation -->

Deprecation Warning: Sass's behavior for declarations that appear after nested
rules will be changing to match the behavior specified by CSS in an upcoming
version. To keep the existing behavior, move the declaration above the nested
rule. To opt into the new behavior, wrap the declaration in `& {}`.

More info: https://sass-lang.com/d/mixed-decls

    ╷
191 │             &, &>* {page-break-inside: avoid;} // doesnt work dont know why
    │             ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ nested rule
192 │             border-radius: 0;
    │             ^^^^^^^^^^^^^^^^ declaration
    ╵
    src/components/Thumb.svelte 192:13  root stylesheet

Deprecation Warning: Sass's behavior for declarations that appear after nested
rules will be changing to match the behavior specified by CSS in an upcoming
version. To keep the existing behavior, move the declaration above the nested
rule. To opt into the new behavior, wrap the declaration in `& {}`.

More info: https://sass-lang.com/d/mixed-decls

    ╷
191 │             &, &>* {page-break-inside: avoid;} // doesnt work dont know why
    │             ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ nested rule
... │
193 │             border: none;
    │             ^^^^^^^^^^^^ declaration
    ╵
    src/components/Thumb.svelte 193:13  root stylesheet

Deprecation Warning: Sass's behavior for declarations that appear after nested
rules will be changing to match the behavior specified by CSS in an upcoming
version. To keep the existing behavior, move the declaration above the nested
rule. To opt into the new behavior, wrap the declaration in `& {}`.

More info: https://sass-lang.com/d/mixed-decls

    ╷
191 │             &, &>* {page-break-inside: avoid;} // doesnt work dont know why
    │             ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ nested rule
... │
194 │             margin: 0 !important;
    │             ^^^^^^^^^^^^^^^^^^^^ declaration
    ╵
    src/components/Thumb.svelte 194:13  root stylesheet

Deprecation Warning: Sass's behavior for declarations that appear after nested
rules will be changing to match the behavior specified by CSS in an upcoming
version. To keep the existing behavior, move the declaration above the nested
rule. To opt into the new behavior, wrap the declaration in `& {}`.

More info: https://sass-lang.com/d/mixed-decls

    ╷
191 │             &, &>* {page-break-inside: avoid;} // doesnt work dont know why
    │             ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ nested rule
192 │             border-radius: 0;
    │             ^^^^^^^^^^^^^^^^ declaration
    ╵
    src/components/Thumb.svelte 192:13  root stylesheet

Deprecation Warning: Sass's behavior for declarations that appear after nested
rules will be changing to match the behavior specified by CSS in an upcoming
version. To keep the existing behavior, move the declaration above the nested
rule. To opt into the new behavior, wrap the declaration in `& {}`.

More info: https://sass-lang.com/d/mixed-decls

    ╷
191 │             &, &>* {page-break-inside: avoid;} // doesnt work dont know why
    │             ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ nested rule
... │
193 │             border: none;
    │             ^^^^^^^^^^^^ declaration
    ╵
    src/components/Thumb.svelte 193:13  root stylesheet

Deprecation Warning: Sass's behavior for declarations that appear after nested
rules will be changing to match the behavior specified by CSS in an upcoming
version. To keep the existing behavior, move the declaration above the nested
rule. To opt into the new behavior, wrap the declaration in `& {}`.

More info: https://sass-lang.com/d/mixed-decls

    ╷
191 │             &, &>* {page-break-inside: avoid;} // doesnt work dont know why
    │             ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ nested rule
... │
194 │             margin: 0 !important;
    │             ^^^^^^^^^^^^^^^^^^^^ declaration
    ╵
    src/components/Thumb.svelte 194:13  root stylesheet

Deprecation Warning: Sass's behavior for declarations that appear after nested
rules will be changing to match the behavior specified by CSS in an upcoming
version. To keep the existing behavior, move the declaration above the nested
rule. To opt into the new behavior, wrap the declaration in `& {}`.

More info: https://sass-lang.com/d/mixed-decls

  ╷
4 │         @media print { display: none; }
  │         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ nested rule
5 │         flex-flow: row wrap;
  │         ^^^^^^^^^^^^^^^^^^^ declaration
  ╵
    src/components/Nav.svelte 5:9  root stylesheet

Deprecation Warning: Sass's behavior for declarations that appear after nested
rules will be changing to match the behavior specified by CSS in an upcoming
version. To keep the existing behavior, move the declaration above the nested
rule. To opt into the new behavior, wrap the declaration in `& {}`.

More info: https://sass-lang.com/d/mixed-decls

  ╷
4 │         @media print { display: none; }
  │         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ nested rule
5 │         flex-flow: row wrap;
  │         ^^^^^^^^^^^^^^^^^^^ declaration
  ╵
    src/components/Nav.svelte 5:9  root stylesheet

Deprecation Warning: Sass's behavior for declarations that appear after nested
rules will be changing to match the behavior specified by CSS in an upcoming
version. To keep the existing behavior, move the declaration above the nested
rule. To opt into the new behavior, wrap the declaration in `& {}`.

More info: https://sass-lang.com/d/mixed-decls

    ╷
4   │         @media print { display: none; }
    │         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ nested rule
... │
7   │         margin: 5px 0;
    │         ^^^^^^^^^^^^^ declaration
    ╵
    src/components/Nav.svelte 7:9  root stylesheet

Deprecation Warning: Sass's behavior for declarations that appear after nested
rules will be changing to match the behavior specified by CSS in an upcoming
version. To keep the existing behavior, move the declaration above the nested
rule. To opt into the new behavior, wrap the declaration in `& {}`.

More info: https://sass-lang.com/d/mixed-decls

    ╷
4   │         @media print { display: none; }
    │         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ nested rule
... │
7   │         margin: 5px 0;
    │         ^^^^^^^^^^^^^ declaration
    ╵
    src/components/Nav.svelte 7:9  root stylesheet

Deprecation Warning: Sass's behavior for declarations that appear after nested
rules will be changing to match the behavior specified by CSS in an upcoming
version. To keep the existing behavior, move the declaration above the nested
rule. To opt into the new behavior, wrap the declaration in `& {}`.

More info: https://sass-lang.com/d/mixed-decls

    ╷
4   │         @media print { display: none; }
    │         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ nested rule
... │
8   │         gap: 5px;
    │         ^^^^^^^^ declaration
    ╵
    src/components/Nav.svelte 8:9  root stylesheet

Deprecation Warning: Sass's behavior for declarations that appear after nested
rules will be changing to match the behavior specified by CSS in an upcoming
version. To keep the existing behavior, move the declaration above the nested
rule. To opt into the new behavior, wrap the declaration in `& {}`.

More info: https://sass-lang.com/d/mixed-decls

    ╷
4   │         @media print { display: none; }
    │         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ nested rule
... │
8   │         gap: 5px;
    │         ^^^^^^^^ declaration
    ╵
    src/components/Nav.svelte 8:9  root stylesheet

• server
src/routes/[lang]/_layout.svelte
A11y: visible, non-interactive elements with an on:click event must be accompanied by an on:keydown, on:keyup, or on:keypress event.
106:   <!-- Overlay for mobile sidebar -->
107:   {#if sidebarOpen}
108:   <div class="sidebar-overlay" on:click={closeSidebar}></div>
       ^
109:   {/if}
110:   {/if}
src/components/Thumb.svelte
A11y: visible, non-interactive elements with an on:click event must be accompanied by an on:keydown, on:keyup, or on:keypress event.
83: 
84:             <!-- Image -->
85:             {#if img}<img class="img" src={"/_thumbs/imgs/" + (img.includes(".") ? img : img + ".jpg")} alt={name + " photo"} on:click={handleImageModal}>{/if}
                         ^
86: 
87:             <!-- Navigation -->
src/components/HighlightThumb.svelte
A11y: visible, non-interactive elements with an on:click event must be accompanied by an on:keydown, on:keyup, or on:keypress event.
22: </script>
23: 
24: <div class="highlight-thumb tech-border" on:click={handleClick} class:clickable={link}>
    ^
25:     <div class="thumb-content">
26:         <div class="left-section">
src/components/AccessibilityControls.svelte
A11y: visible, non-interactive elements with an on:click event must be accompanied by an on:keydown, on:keyup, or on:keypress event.
138:             </div>
139:         </div>
140:         <div class="overlay" on:click={togglePanel}></div>
             ^
141:     {/if}
142: </div>
• client
src/routes/[lang]/_layout.svelte
A11y: visible, non-interactive elements with an on:click event must be accompanied by an on:keydown, on:keyup, or on:keypress event.
106:   <!-- Overlay for mobile sidebar -->
107:   {#if sidebarOpen}
108:   <div class="sidebar-overlay" on:click={closeSidebar}></div>
       ^
109:   {/if}
110:   {/if}
src/components/Thumb.svelte
A11y: visible, non-interactive elements with an on:click event must be accompanied by an on:keydown, on:keyup, or on:keypress event.
83: 
84:             <!-- Image -->
85:             {#if img}<img class="img" src={"/_thumbs/imgs/" + (img.includes(".") ? img : img + ".jpg")} alt={name + " photo"} on:click={handleImageModal}>{/if}
                         ^
86: 
87:             <!-- Navigation -->
src/components/HighlightThumb.svelte
A11y: visible, non-interactive elements with an on:click event must be accompanied by an on:keydown, on:keyup, or on:keypress event.
22: </script>
23: 
24: <div class="highlight-thumb tech-border" on:click={handleClick} class:clickable={link}>
    ^
25:     <div class="thumb-content">
26:         <div class="left-section">
src/components/AccessibilityControls.svelte
A11y: visible, non-interactive elements with an on:click event must be accompanied by an on:keydown, on:keyup, or on:keypress event.
138:             </div>
139:         </div>
140:         <div class="overlay" on:click={togglePanel}></div>
             ^
141:     {/if}
142: </div>