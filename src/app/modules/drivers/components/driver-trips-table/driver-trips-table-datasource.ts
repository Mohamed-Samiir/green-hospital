import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface DriverTripsTableItem {
  id: number;
  completed: boolean;
  date: string;
  tripType: string;
  from: string;
  to: string;
  passengerComment: string;
  driverName: string;
  driverCode: string;
  driverComment: string;
  tripRate: number;
  paymentMethod: string;
  discount: number;
  fees: number;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: DriverTripsTableItem[] = [
  {
    id: 1,
    completed: true,
    date: "20-8-2020",
    tripType: "School",
    from: "Shorkok City",
    to: "Nasr City",
    passengerComment: "All good",
    driverName: "Mohammed Samir",
    driverCode: "524",
    driverComment: "All good",
    tripRate: 4,
    paymentMethod: "Cash",
    discount: 20,
    fees: 300
  },
  {
    id: 2,
    completed: true,
    date: "20-8-2020",
    tripType: "School",
    from: "Maadi City",
    to: "Nasr City",
    passengerComment: "All good",
    driverName: "Mohammed Samir",
    driverCode: "522",
    driverComment: "All good",
    tripRate: 3,
    paymentMethod: "Credit",
    discount: 10,
    fees: 500
  },
  {
    id: 3,
    completed: false,
    date: "20-8-2020",
    tripType: "Work",
    from: "New Cairo",
    to: "Nasr City",
    passengerComment: "All good",
    driverName: "Mohammed Samir",
    driverCode: "528",
    driverComment: "All good",
    tripRate: 5,
    paymentMethod: "Credit",
    discount: 20,
    fees: 500
  },
];

/**
 * Data source for the DriverTripsTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DriverTripsTableDataSource extends DataSource<DriverTripsTableItem> {
  data: DriverTripsTableItem[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<DriverTripsTableItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void { }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: DriverTripsTableItem[]): DriverTripsTableItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: DriverTripsTableItem[]): DriverTripsTableItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'name': return compare(a.date, b.date, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
