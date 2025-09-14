import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { CommonModule } from '@angular/common';
import { UserCardComponent } from '../user-card/user-card.component';
import { TableComponent } from "../table/table.component";
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { IUser } from '../../interface/user.interface';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    UserCardComponent,
    TableComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, OnDestroy {
  dashboardService: DashboardService = inject(DashboardService);
  searchControl: FormControl = new FormControl('');
  users: IUser[] = [];
  filteredUsers: IUser[] = [];
  searchText = '';
  isTableView = true;
  isLoading = true;

  private subscriptions = new Subscription();

  constructor() {
    this.isTableView = (localStorage.getItem('dashboardView') ?? 'table') === 'table';
  }

  ngOnInit() {
    const storedSearch = sessionStorage.getItem('dashboardSearch') || '';
    this.searchControl.setValue(storedSearch, { emitEvent: false });

    const dataSub = this.dashboardService.getDashboardData().subscribe({
      next: (res: IUser[]) => {
        this.users = res;
        this.filteredUsers = [...this.users];

        if (storedSearch) {
          this.filterUsers(storedSearch);
        }

        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
    this.subscriptions.add(dataSub);

    this.dashboardService.search$.subscribe(value => {
      this.searchControl.setValue(value, { emitEvent: false });
      this.filterUsers(value);
    });

    const searchSub = this.searchControl.valueChanges
      .pipe(debounceTime(300))
      .subscribe(value => this.dashboardService.setSearch(value));

    this.subscriptions.add(searchSub);

  }

  toggleView() {
    this.isTableView = !this.isTableView;
    localStorage.setItem('dashboardView', this.isTableView ? 'table' : 'card');
  }

  filterUsers(searchText: string) {
    const lower = searchText?.toLowerCase() ?? '';
    this.filteredUsers = lower
      ? this.users.filter(user =>
        (user.name?.toLowerCase().includes(lower) || user.email?.toLowerCase().includes(lower))
      )
      : [...this.users];
  }


  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
