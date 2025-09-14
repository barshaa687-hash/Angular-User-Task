import { Routes } from '@angular/router';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'user/:id', component: UserDetailComponent },
    { path: '**', redirectTo: '' }
]
