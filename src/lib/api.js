const Method = {
    GET: 'GET',
    POST: 'POST'
};

function doRequest(method, url, params) {
    const { searchParams, ...rest } = params || {};
    let query = searchParams?.toString();
    query = query?.length ? `?${query}` : '';
    return fetch(`${url}${query}`, {
        ...rest,
        method: method,
    });
}

export class API {
    static get(url, params) {
        return doRequest(Method.GET, url, params);
    }

    static post(url, params) {
        return doRequest(Method.POST, url, params);
    }
}