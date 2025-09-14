import { Component, inject, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IUser } from '../../interface/user.interface';

@Component({
  selector: 'app-user-detail',
  imports: [CommonModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit {

  dashboardService: DashboardService = inject(DashboardService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  user!: IUser;
  isLoading = true;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const numericId = Number(id);
      this.dashboardService.getUserById(numericId).subscribe({
        next: (data) => {
          this.user = data;
          this.isLoading = false;
        },
        error: (err) => {
          console.error(err);
          this.isLoading = false;
        }
      });
    }
  }

  userSections = [
    {
      title: 'Basic Info',
      fields: [
        { icon: 'bi-person-fill', label: '', value: (u: IUser) => u.username },
        { icon: 'bi-envelope-fill', label: '', value: (u: IUser) => u.email },
        { icon: 'bi-telephone-fill', label: '', value: (u: IUser) => u.phone },
        { icon: 'bi-globe', label: '', value: (u: IUser) => u.website, isLink: true }
      ]
    },
    {
      title: 'Address',
      fields: [
        { icon: 'bi-geo-alt-fill', label: '', value: (u: IUser) => `${u.address.suite}, ${u.address.street}, ${u.address.city} - ${u.address.zipcode}` },
        { icon: 'bi-pin-fill', label: 'Latitude:', value: (u: IUser) => u.address.geo.lat },
        { icon: 'bi-pin-map-fill', label: 'Longitude:', value: (u: IUser) => u.address.geo.lng }
      ]
    },
    {
      title: 'Company',
      fields: [
        { icon: 'bi-person-badge-fill', label: 'Name:', value: (u: IUser) => u.company.name },
        { icon: 'bi-chat-dots-fill', label: 'Catch Phrase:', value: (u: IUser) => u.company.catchPhrase },
        { icon: 'bi-briefcase-fill', label: 'Business:', value: (u: IUser) => u.company.bs }
      ]
    }
  ];

  back() {
    this.router.navigate(['/']);
  }

}
