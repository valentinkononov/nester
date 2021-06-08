export interface Paging {
    number: number;
    size: number;
}

export interface ListResponse<T> {
    data: T[];
    itemsCount: number;
}
