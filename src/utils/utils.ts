import Constants from "./constants";
import { Activity } from "./models";


function getArrayOfDaysBeetweenDates(from: Date, to: Date): Date[] {
    var dateArray = new Array<Date>();
    var currentDate = from;
    while (currentDate <= to) {
        dateArray.push(new Date(currentDate));
        currentDate = addDays(currentDate, 1);
    }
    return dateArray;
}

function addDays(date: Date, days: number): Date {
    var newDate = new Date(date.valueOf());
    newDate.setDate(date.getDate() + days);
    return newDate;
}

function isSameDay(day1: Date, day2: Date): boolean {
    return day1.toDateString().startsWith(day2.toDateString())
}

export function daysBeetween2Days(day1: Date, day2: Date) {
    // Discard the time and time-zone information.
  const utc1 = Date.UTC(day1.getFullYear(), day1.getMonth(), day1.getDate());
  const utc2 = Date.UTC(day2.getFullYear(), day2.getMonth(), day2.getDate());
  return Math.floor((utc2 - utc1) / Constants.MS_PER_DAY);
}

export function getGoalDataSet(startDate: Date) {
    const endingDate = addDays(new Date(), 7)

    var goal = 0;
    const goal_step = 1000.0 / 366
    const data = getArrayOfDaysBeetweenDates(startDate, endingDate).map(day => { goal = goal + goal_step; return { x: day, y: goal.toFixed(2) } })
    return {
        label: 'Goal',
        fill: false,
        lineTension: 0.01,
        backgroundColor: "#FFC154",
        borderColor: "#FFC154",
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: "#FFC154",
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#FFC154",
        pointHoverBorderColor: "#FFC154",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: data
    }
}
export function getResultDataSet(startDate: Date, activites: Activity[]) {
    var total_distance = 0;

    const data = getArrayOfDaysBeetweenDates(startDate, new Date())
        .map( (day) => {
            const act = activites.find(act => isSameDay(day, new Date(act.start_date_local)));
            if (act !== undefined) {
                total_distance += ((+act.distance) / 1000.0);
                return { x: day, y: total_distance.toFixed(2) };
            }
            return null;
        }).filter(el => el != null);
    data.push({x: new Date(), y: total_distance.toFixed(2)})

    return {
        label: 'Result',
        fill: false,
        lineTension: 0.2,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 3,
        pointHitRadius: 10,
        data: data
    }
}
