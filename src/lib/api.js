export const Method = {
    GET: 'GET',
    POST: 'POST'
};

async function doRequest(method, url, params) {
    const { searchParams, ...rest } = params || {};
    let query = searchParams?.toString();
    query = query?.length ? `?${query}` : '';
    return await fetch(`${url}${query}`, {
        ...rest,
        method: method,
    });
}

export class API {
    static async get(url, params) {
        return doRequest(Method.GET, url, params);
    }

    static async post(url, params) {
        return doRequest(Method.POST, url, params);
    }
}