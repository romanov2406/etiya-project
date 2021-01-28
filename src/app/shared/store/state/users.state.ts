import { DeleteUser } from './../action/users.actions';
import { catchError, filter, map } from 'rxjs/operators';
import { IUser } from './../../interfaces/user.interface';
import { UsersFirestoreService } from './../../services/users-firestore.service';
import { Injectable } from '@angular/core';
import { Emitted, NgxsFirestoreConnect, StreamEmitted } from '@ngxs-labs/firestore-plugin';
import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';
import { GetUsers, Update } from '../action/users.actions';
import { AuthService } from '../../services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';

export interface usersStateModel {
    users: IUser[];
}

@State<usersStateModel>({
    name: 'users',
    defaults: {
        users: []
    }
})

@Injectable()
export class UsersState {
    authServece: any;
    categoriesRef = this.db.collection('/users');

    @Selector()
    static users(state: usersStateModel) {
        return state.users;
    }

    constructor(
        private userFS: UsersFirestoreService,
        private ngxsFirestoreConnect: NgxsFirestoreConnect,
        private authService: AuthService,
        private db: AngularFirestore,
    ) { }

    ngxsOnInit() {
        this.ngxsFirestoreConnect.connect(GetUsers, {
            to: () => this.userFS.collection$(),
        });
    }

    @Action(StreamEmitted(GetUsers))
    getAllEmitted(ctx: StateContext<usersStateModel>, { }: Emitted<GetUsers, IUser[]>) {
        this.db.collection('/users').snapshotChanges().pipe(
            map(collection =>
              collection.map(c =>
                ({ id: c.payload.doc.id, ...c.payload.doc.data() as IUser})
              )
            )
          ).subscribe( data => {
              ctx.patchState({users: data});
          })
    }

    @Action(Update)
    public update(ctx: StateContext<usersStateModel>, { id, changes }: Update) {
       this.categoriesRef.doc(id).update(changes)
    }

    @Action(DeleteUser)
    public delete(ctx:StateContext<usersStateModel>,{id}:DeleteUser){
        this.categoriesRef.doc(id).delete()
    }


}