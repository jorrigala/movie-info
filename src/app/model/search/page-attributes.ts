export class PageAttributes {
    private pageNumber: number;
    private pageSize: number;
    private columnSize: number;

    constructor() {
        this.pageNumber = 1;
        this.pageSize = 10;
        this.columnSize = 3;
    }

    getPageNumber(): number {
        return this.pageNumber;
    }

    getPageSize(): number {
        return this.pageSize;
    }

    getColumnSize(): number {
        return this.columnSize;
    }

    setPageNumber(pageNumber: number) {
        this.pageNumber = pageNumber;
    }

    setPageSize(pageSize: number) {
        this.pageSize = pageSize;
    }

    getNextPage(): number {
      return ++this.pageNumber;
    }
}
