export interface FilteringRequest {
    sortBy: string;
    sortDirection: string;
    searchText: string;
    isPaginated: boolean;
    pageNumber: number;
    pageSize: number;
};
