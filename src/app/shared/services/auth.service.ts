import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, QuerySnapshot } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';
import { User } from '../models/user.model';
import { filter, map } from 'rxjs/operators';
import { IUser } from '../interfaces/user.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  actions: Array<any> = [];
  private dbPath = '/users';
  url:string
  categoriesRef: AngularFirestoreCollection<IUser> = null;
  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore,
    private toastr: ToastrService,
    ) {
    this.categoriesRef = this.db.collection(this.dbPath);
  }

  
  signIn(email: string, password: string): void {
    this.auth.signInWithEmailAndPassword(email, password).then(
      userResponse => {
        console.log(userResponse);
        this.toastr.success('succes');
      },
      err => {
        console.log(err);
        this.toastr.error('error ');
      }
    )
  };

  deleteFireCloudUser(id: string): void {
    this.categoriesRef.doc(id).delete()
  }

  updateFireCloudUser(id: string, user: IUser): void {
    this.categoriesRef.doc(id).update({ ...user })
  }

  getFireCloudUsers(): AngularFirestoreCollection<IUser> {
    return this.categoriesRef;
  }

  signUp(
    image:string,
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
    postalCode: string): Promise<any> {

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
          console.log(NUW_USER);
          this.db.collection('users').add(Object.assign({}, NUW_USER)).then(
            collection => collection.get().then(
              userCredentional => {
                this.toastr.success('succes');
                console.log(userCredentional.data());
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
