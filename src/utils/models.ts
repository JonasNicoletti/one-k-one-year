
export interface Activity {
    id: number;
    name: string;
    distance: string;
    start_date_local: Date;
    moving_time: number;
}

export interface StravaUser {
    refresh_token: string;
    access_token: string;
    athlete: {
        id: number;
        username: string;
        firstname: string;
        lastname: string;
        
    }
}