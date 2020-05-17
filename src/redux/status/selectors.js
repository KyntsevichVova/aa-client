export function selectStatus(root) {
    return root.status;
}

export function selectAuthorized(root) {
    return root.status.authorized;
}

export function selectLoading(root) {
    return root.status.loading;
}