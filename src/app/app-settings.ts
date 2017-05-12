import { environment } from 'environments/environment';

export class AppSettings {
    public static API_ENDPOINT = environment.api_endpoint;
    public static LOGIN_ENDPOINT = environment.login_endpoint;
    public static LOGOUT_ENDPOINT = environment.logout_endpoint;
}
