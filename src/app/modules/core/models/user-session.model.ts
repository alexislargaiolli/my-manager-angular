import { User } from './user.model';

export class UserSession {
    user: User;
    authenticated: boolean;
    logging_in: boolean;
    logging_out: boolean;
    gettingUserInfo: boolean;
    error: string;

    constructor(public userId: number, public token: string) { }
}
