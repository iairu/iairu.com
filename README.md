## iairu.com v2

A multi-language portfolio of my *so-far-mostly-personal* dev works built on top of the lightweight [Sapper](https://sapper.svelte.dev/) framework. 

### Directory content

- `static` - all the stuff that is not processed by Sapper and is kept as is, includes assets (images, videos, external libraries) and other parts of the site not covered by the framework (some documentations, graphic design portfolio)
- `src` - Svelte components and route files processed by Sapper
- `cypress` - default Sapper implementation for testing, no uses so far, probably should at least try it out
- `__sapper__` - gitignored directory with generated dev/build/export files, content can be replicated using equivalently named commands in package.json

### A short ToDo list of stuff to be done before release

- ~~`dev/[slug]` - 404 instead of 500~~
- ~~create `[lang]` and create some kind of a SEO-friendly language URL handling~~
- ~~biography, some numbers and catchy text content overall~~
- Maybe also:
  - ~~TOC-style side menu for .md generated content~~ (in progress)
  - History navigation on modals 
  - Stats component with cool circles
  - A ton of other stuff written in my OneNote

### Best-practices not used in practice

- All info is currently pulled directly from either .md or a given route .svelte file (index.svelte for example), not from JSON, because I don't have a reason that would warrant such change.
  - Maybe except the iframe stuff, that would definitely work better with a more reasonable content / front-end relationship, because currently the site gets loaded separately in each iframe, however there isn't that much benefit from it.

### Important for maintenance

- Custom `server.mjs` mod (that removes the need for `<base>` and thus fixes `href="#some-id"` relative links outside root file) requires that the modifications from previous commits be made to the `node_modules/sapper/runtime/server.mjs` file, not the generated `src/...` file (which would get overwritten on deployment). Alternative option might be developing a custom `rollup` plugin.
- If svelte language server complains about `node-sass` bindings just download them [from here](https://github.com/sass/node-sass/releases) , put them into the directory svelte tells you about, don't question why the rebuild command doesn't work or what kind of an idiot invented this one of a kind system or what they're used for, no time for any of that.