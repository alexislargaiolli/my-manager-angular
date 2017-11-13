import { User } from './user.model';

export interface ISessionState {
    userId: number;
    token: string;
    authenticated: boolean;
    auto_login?: boolean;
    logging_in: boolean;
    logging_out: boolean;
    gettingUserInfo: boolean;
    error: string;
    register: {
        registering: boolean;
        registered: boolean;
        error: string;
    }
}
