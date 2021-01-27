import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UsersState } from 'src/app/shared/store/state/users.state';
import { IUser } from './../../shared/interfaces/user.interface';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  @Select(UsersState.users) users$: Observable<any>;

  users: IUser[] = [];
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.getStaticUsers();
    this.users$.subscribe(el => console.log(this.users = el));
  }

  getStaticUsers(): void {
    this.users = JSON.parse(localStorage.getItem('users'));
    console.log(this.users);
  }
}
