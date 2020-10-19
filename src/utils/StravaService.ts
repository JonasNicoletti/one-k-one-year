import strava from 'strava-v3';
import { Activity, StravaUser } from './models';

interface BaseArgs {
    access_token: string;
}

interface ActivitiesArgs extends BaseArgs {
    before: number;
    after: number;
}


export default class StravaService {



    static readonly CONFIG = {
        client_ID: "54089",
        client_secret: "9ea9f280531fb5873686c0d66885022308a80d39",
        access_token: "",
        redirect_uri: "https://one-k-one-year.herokuapp.com/loginCallback"
    };
    BASE_ARGS: BaseArgs;
    ACTIVITIES_ARGS: ActivitiesArgs

    constructor(stravaUser: StravaUser, startingDate: Date) {
        const access_token = stravaUser !== undefined ? stravaUser.access_token : "";
        strava.config({
            access_token: stravaUser !== undefined ? stravaUser.access_token : "",
            client_id: StravaService.CONFIG.client_ID,
            client_secret: StravaService.CONFIG.client_secret,
            redirect_uri: StravaService.CONFIG.redirect_uri
        });
        this.BASE_ARGS =  { access_token: access_token }
        const endingDate =  new Date(startingDate).setFullYear(startingDate.getFullYear() + 1);
        this.ACTIVITIES_ARGS = { ...this.BASE_ARGS, after: startingDate.getTime() / 1000, before: endingDate / 1000}
    }

    static getLoginUrl(): Promise<string> {
        strava.config({
            access_token: "",
            client_id: this.CONFIG.client_ID,
            client_secret: this.CONFIG.client_secret,
            redirect_uri: this.CONFIG.redirect_uri
        });
        return strava.oauth.getRequestAccessURL({ scope: 'activity:read' });
    }

    static saveToken(code: string): Promise<StravaUser> {
        strava.config({
            access_token: "",
            client_id: this.CONFIG.client_ID,
            client_secret: this.CONFIG.client_secret,
            redirect_uri: this.CONFIG.redirect_uri
        });
       return strava.oauth.getToken(code);
        
    }

    async getActivities(): Promise<Activity[]> {
        return new Promise((resolve, reject) => {
            strava.athlete.listActivities(this.ACTIVITIES_ARGS, (err, data) => {
                if (err) {
                    return reject(err);
                }
                resolve(data as Activity[])
            });
        });
    }
}