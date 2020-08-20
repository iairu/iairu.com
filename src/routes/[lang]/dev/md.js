import all from "./md/*.md";
import { getSlug, IDstartsWithNumberFix } from "../../../components/scripts/stringToSlug.js";

const md = all.filter(m => {
    // Modify all retrieved files' properties
    delete m.path;
    if (m.html) m.html = fixHeadingIDs(m.html);
    return true;
});

function fixHeadingIDs(htmlHaystack) {
    return htmlHaystack.replace(/(\<h\d id=\")(.*?)(\"\>)/g,
        (all,g1,g2,g3)=>{return g1 + IDstartsWithNumberFix(getSlug(g2)) + g3;}
    );
}

export function getPost(slug) {
    // Find the right post in "md" and return it
    let r = md.filter(m => m.filename === slug + ".md");
    return (r && r.length) ? r[0] : {error: {code: 404, msg: "Not Found"}}
}