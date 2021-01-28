import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, QuerySnapshot } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';
import { User } from '../models/user.model';
import { filter, map } from 'rxjs/operators';
import { IUser } from '../interfaces/user.interface';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  actions: Array<any> = [];
  private dbPath = '/users';
  url: string;
  userStatus = new Subject<boolean>();

  categoriesRef: AngularFirestoreCollection<IUser> = null;
  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.categoriesRef = this.db.collection(this.dbPath);
  }


  getLocalUser(): void {
    const USER = JSON.parse(localStorage.getItem('user'));
  }



  signIn(email: string, password: string): void {
    this.auth.signInWithEmailAndPassword(email, password).then(userResponse => {
      this.db.collection('users').ref.where('uid', '==', userResponse.user.uid)
        .onSnapshot(snap => {
          snap.forEach(user => {
            const localUser = {
              id: user.id,
              ...user.data() as IUser
            };
            localStorage.setItem('user', JSON.stringify(localUser));
            this.router.navigateByUrl('profile')
            this.userStatus.next(true);
          })
        })
      this.toastr.success('Success', 'Welcome');
    }).catch(err => console.log(err))
  };

  // deleteFireCloudUser(id: string): void {
  //   this.categoriesRef.doc(id).delete();
  // }

  // updateFireCloudUser(id: string, user: IUser): void {
  // this.categoriesRef.doc(id).update({ ...user }).then(
  //   data => console.log(data)

  // )
  //   console.log('hello');

  // }

  // getFireCloudUsers(): AngularFirestoreCollection<IUser> {
  //   return this.categoriesRef;
  // }


  signOut(): void {
    this.auth.signOut()
      .then(() => {
        localStorage.removeItem('user');
        this.userStatus.next(true);
        this.router.navigateByUrl('/main/create-user');
      })
      .catch(err => console.log(err));
  }
  signUp(
    image: string,
    firstName: string,
    lastName: string,
    userName: string,
    phone: string,
    email: string,
    password: string,
    addressType: string,
    address: string,
    city: string,
    country: string,
    postalCode: string
  ): Promise<any> {

    return this.auth.createUserWithEmailAndPassword(email, password)
      .then(
        userResponse => {
          const NUW_USER = new User(
            userResponse.user.uid,
            image,
            firstName,
            lastName,
            userName,
            phone,
            userResponse.user.email,
            addressType, address,
            city,
            country,
            postalCode
          );
          this.db.collection('users').add(Object.assign({}, NUW_USER)).then(
            collection => collection.get().then(
              userCredentional => {
                this.toastr.success('succes');
              }
            )
          )
        }

      ).catch(err => {
        console.log(err);
        this.toastr.error('already exist')
      })
  }
}
