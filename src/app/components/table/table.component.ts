import { Component, input } from '@angular/core';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { IUser } from '../../interface/user.interface';


@Component({
  selector: 'app-table',
  imports: [ NgbPaginationModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  users = input<IUser[]>([]);
  page = 1;
  pageSize = 5;

  tableHeaders = [
    { key: 'sn', label: 'S.N' },
    { key: 'name', label: 'Name' },
    { key: 'username', label: 'Username' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'website', label: 'Website' },
    { key: 'company', label: 'Company' },
    { key: 'city', label: 'City' }
  ];

  get pagedUsers() {
    if (!this.users()) return [];
    const start = (this.page - 1) * this.pageSize;
    const end = this.page * this.pageSize;
    return this.users().slice(start, end);
  }

}
