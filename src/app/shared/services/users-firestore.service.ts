import { IUser } from './../interfaces/user.interface';
import { Injectable } from '@angular/core';
import { NgxsFirestore } from '@ngxs-labs/firestore-plugin';
@Injectable({
  providedIn: 'root'
})
export class UsersFirestoreService extends NgxsFirestore<IUser> {
  protected path = '/users';
}
