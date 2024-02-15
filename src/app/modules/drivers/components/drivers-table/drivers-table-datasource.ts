import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface DriversTableItem {
  id: number;
  name: string;
  status: boolean;
  rating: number;
  phoneNumber: string;
  driverCode: string;
  email: string;
  payments: number;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: DriversTableItem[] = [
  { id: 1, name: 'Mohammed Samir', status: true, rating: 5, phoneNumber: '01009823165', driverCode: "524", email: 'm@m.com', payments: 500 },
  { id: 2, name: 'Mohammed Samir', status: true, rating: 5, phoneNumber: '01009823165', driverCode: "525", email: 'm@m.com', payments: 500 },
  { id: 3, name: 'Mohammed Samir', status: true, rating: 5, phoneNumber: '01009823165', driverCode: "526", email: 'm@m.com', payments: 500 },
  { id: 4, name: 'Mohammed Samir', status: true, rating: 5, phoneNumber: '01009823165', driverCode: "527", email: 'm@m.com', payments: 500 },
  { id: 5, name: 'Mohammed Samir', status: true, rating: 5, phoneNumber: '01009823165', driverCode: "528", email: 'm@m.com', payments: 500 },
  { id: 6, name: 'Mohammed Samir', status: true, rating: 3, phoneNumber: '01009823165', driverCode: "529", email: 'm@m.com', payments: 500 },
  { id: 7, name: 'Mohammed Samir', status: true, rating: 5, phoneNumber: '01009823165', driverCode: "530", email: 'm@m.com', payments: 500 },
  { id: 8, name: 'Mohammed Samir', status: true, rating: 3, phoneNumber: '01009823165', driverCode: "531", email: 'm@m.com', payments: 500 },
  { id: 9, name: 'Mohammed Samir', status: true, rating: 5, phoneNumber: '01009823165', driverCode: "532", email: 'm@m.com', payments: 500 },
  { id: 10, name: 'Mohammed Samir', status: true, rating: 5, phoneNumber: '01009823165', driverCode: "533", email: 'm@m.com', payments: 500 },
  { id: 11, name: 'Mohammed Samir', status: true, rating: 5, phoneNumber: '01009823165', driverCode: "534", email: 'm@m.com', payments: 500 },
  { id: 12, name: 'Mohammed Samir', status: true, rating: 5, phoneNumber: '01009823165', driverCode: "535", email: 'm@m.com', payments: 500 },
  { id: 13, name: 'Mohammed Samir', status: true, rating: 5, phoneNumber: '01009823165', driverCode: "536", email: 'm@m.com', payments: 500 },
  { id: 14, name: 'Mohammed Samir', status: true, rating: 5, phoneNumber: '01009823165', driverCode: "537", email: 'm@m.com', payments: 500 },
  { id: 15, name: 'Mohammed Samir', status: true, rating: 5, phoneNumber: '01009823165', driverCode: "538", email: 'm@m.com', payments: 500 },
  { id: 16, name: 'Mohammed Samir', status: true, rating: 5, phoneNumber: '01009823165', driverCode: "539", email: 'm@m.com', payments: 500 },
  { id: 17, name: 'Mohammed Samir', status: true, rating: 5, phoneNumber: '01009823165', driverCode: "540", email: 'm@m.com', payments: 500 },
  { id: 18, name: 'Mohammed Samir', status: true, rating: 5, phoneNumber: '01009823165', driverCode: "541", email: 'm@m.com', payments: 500 },
  { id: 19, name: 'Mohammed Samir', status: true, rating: 5, phoneNumber: '01009823165', driverCode: "542", email: 'm@m.com', payments: 500 },
];

/**
 * Data source for the DriversTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DriversTableDataSource extends DataSource<DriversTableItem> {
  data: DriversTableItem[] = EXAMPLE_DATA;
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
  connect(): Observable<DriversTableItem[]> {
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
  private getPagedData(data: DriversTableItem[]): DriversTableItem[] {
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
  private getSortedData(data: DriversTableItem[]): DriversTableItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'name': return compare(a.name, b.name, isAsc);
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
