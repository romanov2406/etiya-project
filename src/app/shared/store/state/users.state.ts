import { IUser } from './../../interfaces/user.interface';
import { UsersFirestoreService } from './../../services/users-firestore.service';
import { Injectable } from '@angular/core';
import { Emitted, NgxsFirestoreConnect, StreamEmitted } from '@ngxs-labs/firestore-plugin';
import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';
import { GetUsers } from '../action/users.actions';

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
    // Селектор для зберігання стану селектора
    @Selector()
    static users(state: usersStateModel) {
        return state.users;
    }
    
    // ініціалізація 
    constructor(private userFS: UsersFirestoreService, private ngxsFirestoreConnect: NgxsFirestoreConnect) { }
    
    ngxsOnInit() {
        this.ngxsFirestoreConnect.connect(GetUsers, { 
            to: () => this.userFS.collection$(),
        });
    }

    @Action(StreamEmitted(GetUsers))
    getAllEmitted(ctx: StateContext<usersStateModel>, { payload }: Emitted<GetUsers, IUser[]>) {
        ctx.patchState({ users: payload });
    }

}