import { IUser } from './../../interfaces/user.interface';

export class GetUsers {
    static readonly desc = 'get users';
    static readonly type = '[GetUsers] get users';
}

export class CreateUser {
    static readonly desc = 'create user';
    static readonly type = '[CreateUser] create user';
    constructor(public payload: IUser){}
}