export function selectAuth(root) {
    return root.auth;
}

export function selectEmail(root) {
    return root.auth.email;
}

export function selectPassword(root) {
    return root.auth.password;
}