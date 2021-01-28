import { IUser } from './../../shared/interfaces/user.interface';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:IUser;
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.getLocalUser();
  }

  signOut():void{
    this.authService.signOut();
  }

  getLocalUser():void{
      this.user = JSON.parse(localStorage.getItem('user'));
  }

}
