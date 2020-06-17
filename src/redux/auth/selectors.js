export function selectAuth(root) {
    return root.auth;
}

export function selectEmail(root) {
    return root.auth.email;
}

export function selectPassword(root) {
    return root.auth.password;
}

export function selectError(root) {
    return root.auth.error;
}