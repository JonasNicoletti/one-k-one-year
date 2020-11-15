export default class Constants {

    static readonly COOKIE_STRAVA_USER = "strava-user";
    static readonly COOKIE_STARTING_DATE = "starting-date";
    static readonly MS_PER_DAY = 1000 * 60 * 60 * 24;
    static readonly CONFIG = {
        client_ID: process.env.REACT_APP_client_ID || "",
        client_secret: process.env.REACT_APP_client_secret || "",
        access_token: "",
        redirect_uri: process.env.REACT_APP_redirect_uri || ""
    };

}