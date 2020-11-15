import strava from 'strava-v3';
import Constants from "./constants";
import { Activity, StravaUser } from './models';
import moment from 'moment';
import { randomNumber } from './utils';

async function saveToken(code: string): Promise<boolean> {
    strava.config({
        access_token: "",
        client_id: Constants.CONFIG.client_ID,
        client_secret: Constants.CONFIG.client_secret,
        redirect_uri: Constants.CONFIG.redirect_uri
    });
    const user = await strava.oauth.getToken(code);
    if (user !== undefined) {
        setCookie<StravaUser>(Constants.COOKIE_STRAVA_USER, user, 30);
        return Promise.resolve(user !== undefined)
    }
    return Promise.reject();

}

function getLoginUrl(): Promise<string> {
    strava.config({
        access_token: "",
        client_id: Constants.CONFIG.client_ID,
        client_secret: Constants.CONFIG.client_secret,
        redirect_uri: Constants.CONFIG.redirect_uri
    });
    return strava.oauth.getRequestAccessURL({ scope: 'activity:read' });
}

function getUser(): StravaUser | undefined {
    const user = getCookie<StravaUser>(Constants.COOKIE_STRAVA_USER)
    return user;
}

function getStartingDate(): Date {
    return getCookieAsDate(Constants.COOKIE_STARTING_DATE) || new Date(new Date().getFullYear(), 0, 1);
}

function storeStartingDate(date: Date) {
    return setCookie<Date>(Constants.COOKIE_STARTING_DATE, date, 30);
}

function getMockedActivities(): Array<Activity> {
    return getMockedData();
}

function getActivities(): Promise<Array<Activity>> {

    const token = getUser()?.access_token
    const startingDate = getCookieAsDate(Constants.COOKIE_STARTING_DATE)
    if (token === undefined || startingDate === undefined) {
        return Promise.resolve([]);
    }
    const endingDate = new Date(startingDate).setFullYear(new Date(startingDate).getFullYear() + 1);
    strava.config({
        access_token: token,
        client_id: Constants.CONFIG.client_ID,
        client_secret: Constants.CONFIG.client_secret,
        redirect_uri: Constants.CONFIG.redirect_uri
    });
    return new Promise((resolve, reject) => {
        strava.athlete.listActivities({ access_token: token, after: new Date(startingDate).getTime() / 1000, before: endingDate / 1000 }, (err, data) => {
            if (err) {
                console.error(err);
                return reject(err);
            }
            resolve(data as Activity[])
        });
    });
}
function setCookie<T>(name: string, value: T, days: number) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    if (!(value instanceof Date)) {
        document.cookie = name + "=" + (JSON.stringify(value) || "") + expires + "; path=/";
        return;
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie<T>(name: string): T | undefined {
    const nameLenPlus = (name.length + 1);
    const cookie = document.cookie
        .split(';')
        .map(c => c.trim())
        .filter(cookie => {
            return cookie.substring(0, nameLenPlus) === `${name}=`;
        })
        .map(cookie => {
            return decodeURIComponent(cookie.substring(nameLenPlus));
        })[0];
    if (cookie !== undefined) {
        return JSON.parse(cookie) as T;
    }
    return undefined;
}

function getCookieAsDate(name: string): Date | undefined {
    const nameLenPlus = (name.length + 1);
    const cookie = document.cookie
        .split(';')
        .map(c => c.trim())
        .filter(cookie => {
            return cookie.substring(0, nameLenPlus) === `${name}=`;
        })
        .map(cookie => {
            return decodeURIComponent(cookie.substring(nameLenPlus));
        })[0];
    if (cookie !== undefined) {
        return new Date(cookie);
    }
    return undefined;
}

function getMockedData(): Activity[] {
    const activities = []
    const [distanceMin, distanceMax] = [4000, 20000];
    const [paceMin, paceMax] = [2, 10];
    const [runsMin, runsMax] = [10, 40];
    const runs = randomNumber(runsMin, runsMax);
    let activity: Activity;
    for (let index = 1; index < runs; index++) {
        let day = moment().subtract(index*4, 'days').toDate();
        let distance = randomNumber(distanceMin, distanceMax);
        let pace = randomNumber(paceMin, paceMax);
        activity = {
            id: index,
            name: "Activity #" + (runs - index).toString(),
            distance: distance.toString(),
            start_date_local: day,
            moving_time: distance * pace
        };
        activities.push(
            activity
        );
    }


    return activities;
}



export { getUser, getActivities, getLoginUrl, saveToken, getStartingDate, storeStartingDate, getMockedActivities }