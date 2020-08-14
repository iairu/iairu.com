## iairu.com v2

A multilanguage portfolio of my *so-far-mostly-personal* dev works built on top of the lightweight [Sapper](https://sapper.svelte.dev/) framework. 

### Directory content

- `static` - all the stuff that is not processed by Sapper and is kept as is, includes assets (images, videos, external libraries) and other parts of the site not covered by the framework (some documentations, graphic design portfolio)
- `src` - Svelte components and route files processed by Sapper
- `cypress` - default Sapper implementation for testing, no uses so far, probably should at least try it out
- `__sapper__` - gitignored directory with generated dev/build/export files, content can be replicated using equivalently named commands in package.json

### A short ToDo list of stuff to be done before release

- `dev/[slug]` - 404 instead of 500
- create `[lang]` and create some kind of a SEO-friendly language URL handling
- biography, some numbers and catchy text content overall
- Maybe also:
  - TOC-style side menu for .md generated content
  - Stats component with cool circles

### Best-practises not used in practise

- All info is currently pulled directly from either .md or a given route .svelte file (index.svelte for example), not from JSON, because I don't have a single use case that would warrant such change.
  - Maybe except the iframe stuff, that would definitely work better with a more reasonable content / front-end relationship, because currently the site gets loaded separately in each iframe, I feel though that its a can of worms to get this working and there isn't that much benefit from it.