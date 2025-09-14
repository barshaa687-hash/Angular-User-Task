import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../../interface/user.interface';

@Component({
  selector: 'app-user-card',
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {
  router = inject(Router)
  users = input<IUser[]>([]);

  userFields = [
    { label: '', icon: 'bi-envelope-fill', value: (user: IUser) => user.email, isLink: false },
    { label: '', icon: 'bi-person-fill', value: (user: IUser) => user.username, isLink: false },
    { label: '', icon: 'bi-telephone-fill', value: (user: IUser) => user.phone, isLink: false },
    { label: '', icon: 'bi-globe', value: (user: IUser) => user.website, isLink: true },
  ];

  redirectToDetail(user: any) {
    this.router.navigate(['/user', user.id])
  }

}
