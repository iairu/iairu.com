<script>
    import { href } from "./Modal.svelte";
    import { lang } from "./LangStore.svelte";
    export let nav = [];
    /* 
        nav: []
            icon: (string) Font-awesome icon to prepend before the anchor's text
            text: (string) Text content of an anchor
            cls: (string) Optional CSS class
            href: (string) Link of an anchor, if not specified will be "#", if not static localization will be automatically prepended
            isButton: (boolean) Anchor will be rendered as a button with .button class
            modal: (boolean) Anchor will be opened as a modal, by default true only if the link begins with a slash and is not downloadable (e.g. not ending with .exe or .pdf)
            fnc: (function) Anchor's click will call a function, make it on:click and put "#" into anchors href
            static: (boolean) Anchor doesn't lead to a localizable page (leads to a static page), don't prepend current language if href is local (default true for downloadable and nonlocal)
            sameTarget: (boolean) Forces the link to not be opened in a new tab, doesn't really matter for modals, always true if link begins with #
            hideExt: (boolean) Hide appended icon that tends to signify either that the link is on the same page, unreachable or external. Autohidden if modal or function.
            hide: (boolean) Hide the link from the page (clever for hiding stuff when localization doesn't match)
            forceRefresh: (boolean) Anchor will cause the site to reload into its href instead of just instantly navigating to it, won't check any other booleans, use only for bugged reasons

            If neither href nor fnc is specified, the link will be treated as disabled
    */
    let processed = [];
    function process(link, i) {
        // Preprocessed values for on:click handler so that it is guaranteed to be fast enough to preventDefault
        // Using e.target.getAttribute() instead was too slow for that in 10% of attempts
        processed[i] = {
            modal: link.modal !== undefined ? link.modal : (link.href && link.href.charAt(0) === "/" && !isDownloadable(link.href) ? true : false),
            samePage: (link.href && link.href.charAt(0) === "#" && link.href.length > 1) ? true : (link.fnc ? true : false),
            disabled: (!link.href && !link.fnc) || (link.href && link.href.charAt(0) === "#" && link.href.length === 1) ? true : false,
            target: (link.sameTarget || link.href && link.href.charAt(0) === "#") ? "" : "_blank",
            href: link.href ? ($lang.current && link.href.charAt(0) === "/" && !link.static && !hasToBeStatic(link.href) ? "/" + $lang.current + link.href : link.href) : "#"
        };
        return true;
    }

    function isDownloadable(_href) {return !!_href.match(/\.(exe|pdf)/);}
    function hasToBeStatic(_href) {return isDownloadable(_href) || !!_href.match(/\.(svg|jpg|png|gif)/);}
    function isFunction(functionToCheck) {return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';}

    function handleAnchor(e, _href, _fnc, isModal, isSamePage, isDisabled, forceRefresh) {
        // Modals
        if (forceRefresh) {
            window.location.pathname = _href;
        }
        else if (isModal) {
            e.preventDefault();
            href.set(_href); // Displays modal
        }
        // Same-page hash-hrefs smooth-scroll
        else if (isSamePage) {
            e.preventDefault();
            if (isFunction(_fnc)) {
                _fnc();
            } else {
                let destination = document.querySelector(_href)
                if (destination) {
                    destination.scrollIntoView({behavior: 'smooth'});
                }
            }
        }
        // Cancel any possible navigation (such as going to the top) if disabled
        else if (isDisabled) {
            e.preventDefault();
        }
    }

</script>

{#if nav && nav.length}
<nav>
    {#each nav as link, i}
        {#if !link.hide && process(link, i)}
            <a 
                class={link.cls}
                class:button={link.isButton}
                href={processed[i].href} 
                target={processed[i].target} 
                rel="noopener" 
                modal={processed[i].modal} 
                on:click={(e)=>{handleAnchor(e, processed[i].href, link.fnc, processed[i].modal, processed[i].samePage, processed[i].disabled, link.forceRefresh)}}
            >
                <!-- This has to be a one-liner to avoid automatic addition of space characters -->
                {#if link.icon}<i class={"icon " + link.icon}></i>{/if}<span class="link-text">{link.text}</span>{#if !processed[i].modal && !link.sameTarget && !link.fnc && !link.hideExt}<i class={"icon-ext fa " + (!processed[i].samePage ? (!processed[i].disabled ? "fa-external-link-alt" : "fa-ban") : "fa-angle-double-down") }></i>{/if}
            </a>
        {/if}
    {/each}
</nav>
{/if}

<style lang="scss" global>
    nav {
        display: flex;
        @media print { display: none; }
        flex-flow: row wrap;
        $col: rgb(140, 155, 177);
        $colbg: rgba(107, 122, 145, 0.76);
        margin: 5px 0;
        gap: 5px;
        a {
            padding: 5px;
            color: darken($color: $col, $amount: 10);
            text-decoration: none;
            margin-right: 10px;
            .icon {
                padding-right: 5px;
            }
            .icon-ext {
                padding-left: 5px;
                opacity: 0.5;
                font-size: 12px;
                line-height: inherit;
            }
            &:hover {
                text-decoration: underline;
            }
        }
        a.button {
            padding: 5px 15px;
            border-radius: 5px;
            background: $colbg;
            color: white;
            &:focus {
                background: darken($color: $colbg, $amount: 10)
            }
        }
    }
</style>