export const getQueryString = (params: Record<string, any>): string => {
    if (!params) return '';

    const esc = encodeURIComponent;
    const query = Object.keys(params)
        .map(
            (k) =>
                esc(k) +
                '=' +
                esc(
                    params[k] instanceof Object
                        ? JSON.stringify(params[k])
                        : params[k],
                ),
        )
        .join('&');
    return query;
};
