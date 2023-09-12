export interface MyPaginationProps {
    total: number;
    currentPage: number;
    onChangePage: (page: number) => void;
}