import React, { FunctionComponent } from "react";
import WhiteTextTypography from "../../ui/WhiteTextTypograpfy";
import { Line } from "react-chartjs-2";
import { daysBeetween2Days, getGoalDataSet, getResultDataSet } from "../../utils/utils";
import { Activity } from "../../utils/models";
import * as _ from "lodash";
import StatsEntry from "./StatsEntry";

type StatsProp = {
  startDate: Date;
  activities: Activity[] | undefined;
};

const Stats: FunctionComponent<StatsProp> = ({ startDate, activities }) => {
  let _activities = activities || new Array<Activity>();
  const dataSet = {
    datasets: [
      getGoalDataSet(startDate),
      getResultDataSet(startDate, _activities),
    ],
  };
  var options = {
    scales: {
      xAxes: [
        {
          title: "time",
          type: "time",
          gridLines: {
            lineWidth: 2,
          },
          time: {
            unit: "day",
            unitStepSize: 1000,
            displayFormats: {
              millisecond: "MMM DD",
              second: "MMM DD",
              minute: "MMM DD",
              hour: "MMM DD",
              day: "MMM DD",
              week: "MMM DD",
              month: "MMM DD",
              quarter: "MMM DD",
              year: "MMM DD",
            },
          },
          ticks: {
            display: true
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: true,
            drawBorder: true,
          },
          ticks: {
            display: true,
          },
        },
      ],
    },
  };
  const dayPassend = daysBeetween2Days(new Date(startDate), new Date())
  const totalMetersRun = _.sumBy(activities, (act) => +act.distance) 

  const avgKmWeekGoal = 1000.0 / 52;
  const avgKmWeekResult = (totalMetersRun / 1000.0) / (dayPassend / 7)

  const totalTimeRunned = _.sumBy(activities, (act) => act.moving_time)
  const totalHoursRunned =  totalTimeRunned / (60*60)
  const totalMinutesRunned = (totalTimeRunned - (~~totalHoursRunned * 60 * 60)) / 60
  const totalSecondsRunned = totalTimeRunned - (~~totalHoursRunned * 60* 60) - (~~totalMinutesRunned * 60)

  const totalDistancePerRun = (totalMetersRun / _activities.length) / 1000

  const runsLeft = Math.ceil(1000000  / (totalMetersRun / _activities.length))
  return (
    <div>
      <WhiteTextTypography variant="h3" align="center">
        Stats
      </WhiteTextTypography>
      <Line data={dataSet} options={options} />
      <StatsEntry statName="" goalValue="GOAL" resultValue="RESULT" />
      <StatsEntry statName="Avg distance per week" goalValue={`${avgKmWeekGoal.toFixed(2)} km`} resultValue={`${avgKmWeekResult.toFixed(2)} km`} />
      <StatsEntry statName="Total time run" goalValue={"-"} resultValue={`${~~totalHoursRunned}:${~~totalMinutesRunned}:${~~totalSecondsRunned}`} />
      <StatsEntry statName="Avg distance per run" goalValue={"-"} resultValue={`${totalDistancePerRun.toFixed(2)} km`} />
      <StatsEntry statName="Runs left" statDescription="based on avg distance per run" goalValue={runsLeft.toString()} resultValue={_activities.length.toString()} />
    </div>
  );
};
export default Stats;
