import { GetUsers, Update, DeleteUser } from './../../shared/store/action/users.actions';
import { ChangeDetectorRef, Component, OnInit, TemplateRef } from '@angular/core';
import { AuthService } from './../../shared/services/auth.service';
import { IUser } from './../../shared/interfaces/user.interface';
import { map, pluck, take } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Select, Store } from '@ngxs/store';
import { Observable, pipe } from 'rxjs';
import { UsersState } from 'src/app/shared/store/state/users.state';
import { StreamEmitted } from '@ngxs-labs/firestore-plugin';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})

export class MainPageComponent implements OnInit {
@Select(UsersState.users)
users$: Observable<any>;

  users: IUser[] = [];
  user: IUser;
  modalRef: BsModalRef;
  search: string;
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  phone: string;
  email: string;
  addressType: string;
  country: string;
  city: string;
  postal: string;
  address: string;
  constructor(
    private authService: AuthService,
     private modalService: BsModalService,
      private store: Store,
      private cdRef: ChangeDetectorRef
      ) { }

  ngOnInit(): void {
    this.getStaticUsers();
    this.users$.subscribe(el => this.users = el);
    this.cdRef.detectChanges();
  }

  getStaticUsers(): void {
    this.store.dispatch(new GetUsers()).pipe(take(1))
  }

  saveUser(): void {
    this.user.firstName = this.firstName
    this.user.lastName = this.lastName
    this.user.userName = this.userName
    this.user.phone = this.phone
    this.user.email = this.email
    this.user.addressType = this.addressType
    this.user.country = this.country
    this.user.city = this.city
    this.user.postalCode = this.postal
    this.user.address = this.address
    
    this.store.dispatch(new Update(this.id, this.user)).pipe(take(1));
  }

  edit(user: IUser, id: string): void {
    this.user = user;
    this.id = id
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.userName = user.userName;
    this.phone = user.phone;
    this.email = user.email;
    this.addressType = user.addressType
    this.country = user.country
    this.city = user.city
    this.postal = user.postalCode
    this.address = user.address
  }

  deleteUser(uid: string): void {
    // this.authService.deleteFireCloudUser(uid);
    this.store.dispatch(new DeleteUser(uid))
    this.getStaticUsers();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  reset(): void {
    this.search = '';
  }

}
