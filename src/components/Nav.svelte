<script>
    import { href } from "./Modal.svelte";
    export let nav = []; // [{text,href,isButton=false},...]
    let processed = [];

    function process(link, i) {
        // Preprocessed values for on:click handler so that it is guaranteed to be fast enough to preventDefault
        // Using e.target.getAttribute() instead was too slow for that in 10% of attempts
        processed[i] = {
            modal: link.modal !== undefined ? link.modal : (link.href && link.href.charAt(0) === "/" && !isDownloadable(link.href) ? true : false),
            samePage: (link.href && link.href.charAt(0) === "#" && link.href.length > 1) ? true : (link.fnc ? true : false),
            disabled: (!link.href && !link.fnc) || (link.href && link.href.charAt(0) === "#" && link.href.length === 1) ? true : false
        };
        return true;
    }

    function isDownloadable(_href) {
        return !!_href.match(/\.(exe|pdf)/);
    }

    function handleAnchor(e, _href, _fnc, isModal, isSamePage, isDisabled) {
        // Modals
        if (isModal) {
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

    function isFunction(functionToCheck) {
        return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
    }
</script>

{#if nav && nav.length}
<nav>
    {#each nav as link, i}
        {#if !link.hide && process(link, i)}
            <a 
                class:button={link.isButton} 
                href={link.href ? link.href : "#"} 
                target={(link.sameTarget || link.href && link.href.charAt(0) === "#") ? "" : "_blank"} 
                rel="noopener" 
                modal={processed[i].modal} 
                on:click={(e)=>{handleAnchor(e, link.href, link.fnc, processed[i].modal, processed[i].samePage, processed[i].disabled)}}
            >
                <!-- This has to be a one-liner to avoid automatic addition of space characters -->
                {#if link.icon}<i class={"icon " + link.icon}></i>{/if}<span class="link-text">{link.text}</span>{#if !processed[i].modal && !link.fnc && !link.hideExt}<i class={"icon-ext fa " + (!processed[i].samePage ? (!processed[i].disabled ? "fa-external-link-alt" : "fa-ban") : "fa-angle-double-down") }></i>{/if}
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