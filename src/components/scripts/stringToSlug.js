export function getSlug(str) {
    // https://gist.github.com/codeguy/6684588

    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();
  
    // remove accents, swap ñ for n, etc
    var from = "àáäâèéëêìíïîòóöôùúüûñçčšťžďňľý·/_,:;";
    var to   = "aaaaeeeeiiiioooouuuunccstzdnly------";
    for (var i=0, l=from.length ; i<l ; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-'); // collapse dashes

    return str;
}

export function IDstartsWithNumberFix(id) {
    if (id && id.length && id.length > 0 && id[0].match(/\d/)) id = "_" + id; // IDs can't begin with a number
    return id;
}