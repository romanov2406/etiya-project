
import { IUser } from './../interfaces/user.interface';
export class User implements IUser {
    constructor(
        public uid: string,
        public image: string,
        public firstName: string,
        public lastName: string,
        public userName: string,
        public phone: string,
        public email: string,
        public addressType: string,
        public address: string,
        public city: string,
        public country: string,
        public postalCode: string
    ) { }
}