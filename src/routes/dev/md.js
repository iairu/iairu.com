import all from "./md/*.md";
const md = all.filter(m => {
    // Modify all retrieved files' properties
    delete m.path;
    return true;
});

export function getPost(slug) {
    // Find the right post in "md" and return it
    let r = md.filter(m => m.filename === slug + ".md");
    return (r && r.length) ? r[0] : {error: {code: 404, msg: "Not Found"}}
}