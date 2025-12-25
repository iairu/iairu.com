export function permalink(host,path,id) {
    return "//" + host + path + "#" + id;
}

export default permalink;