export function selectAuthors(root) {
    return root.authors;
}

export function selectOne(root) {
    return root.authors.one;
}