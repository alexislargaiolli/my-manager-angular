import { User } from './user.model';

export class UserSession {
    user: User;

    constructor(public userId: number, public token: string){}
}
