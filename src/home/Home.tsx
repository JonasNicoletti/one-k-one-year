import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import React, { useEffect, useState } from "react";
import "./Home.css";
import {
  AppBar,
  Button,
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
} from "@material-ui/core";
import StravaService from "../utils/StravaService";
import { Activity } from "../utils/models";
import WhiteTextTypography from "../ui/WhiteTextTypograpfy";
import useCookies from "react-cookie/es6/useCookies";
import Constants from "../utils/constants";
import LinearProgressWithLabel from "../ui/LinerProgressWithLabel";
import Activities from "../activities/Activities";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CalendarCustomInput from "../ui/CalendarCustomInput";
import Stats from "../stats/Stats";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      flexGrow: 1,
      textAlign: "center",
    },
    subTitle: {
      textAlign: "center",
      backgroundColor: theme.palette.background.default,
    },
    progressBar: {
      height: 10,
      borderRadius: 5,
    },
  })
);

function Home() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [totalKms, setTotalKms] = useState(1000);
  const [loading, setLoading] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies([
    Constants.COOKIE_STRAVA_USER,
    Constants.COOKIE_STARTING_DATE,
  ]);

  const classes = useStyles();
  useEffect(() => {
    const fetchActivities = async () => {
      if (cookies[Constants.COOKIE_STARTING_DATE] === undefined) {
        setCookie(
          Constants.COOKIE_STARTING_DATE,
          new Date(new Date().getFullYear(), 0, 1)
        );
      }
      const stravaService = new StravaService(
        cookies[Constants.COOKIE_STRAVA_USER],
        new Date(cookies[Constants.COOKIE_STARTING_DATE])
      );
      try {
        const data = await stravaService.getActivities();
        setActivities(data);
        setTotalKms(data.reduce((a, c) => a - +c.distance, 1000000) / 1000);
      } catch (e) {
        setActivities([]);
        setTotalKms(1000);
      } finally {
        setLoading(false);
      }
    };
    fetchActivities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cookies]);

  const selectedDate =
    cookies[Constants.COOKIE_STARTING_DATE] !== undefined
      ? new Date(cookies[Constants.COOKIE_STARTING_DATE])
      : new Date(new Date().getFullYear(), 0, 1);
  return (
    <div>
      <AppBar position="static">
        <Toolbar variant="dense">
          <DatePicker
            dateFormat="dd/MM/yyyy"
            maxDate={new Date()}
            selected={selectedDate}
            onChange={(date: Date) =>
              setCookie(Constants.COOKIE_STARTING_DATE, date)
            }
            customInput={React.createElement(CalendarCustomInput)}
          />
          <Typography variant="h6" color="inherit" className={classes.title}>
            1K in 1 Year
          </Typography>

          {cookies["strava-user"] ? (
            <Button
              color="inherit"
              onClick={() => removeCookie(Constants.COOKIE_STRAVA_USER)}
            >
              Logout
            </Button>
          ) : null}
        </Toolbar>
      </AppBar>
      {loading ? null : (
        <Container>
          <Box my={6}>
            <div className={classes.subTitle}>
              <Typography
                variant="h1"
                align="center"
                color="secondary"
                display="inline"
              >
                {totalKms.toFixed(2)} km&nbsp;
              </Typography>
              <WhiteTextTypography variant="h1" align="center" display="inline">
                to go
              </WhiteTextTypography>
            </div>
            <div>
              <LinearProgressWithLabel
                className={classes.progressBar}
                value={100 - (totalKms * 100.0) / 1000.0}
              />
            </div>
            <Grid container justify="center" spacing={2}>
              <Grid item xs={6}>
                <Activities activities={activities} />
              </Grid>
              <Grid item xs={6}>
                <Stats startDate={selectedDate} activities={activities} />
              </Grid>
            </Grid>
          </Box>
        </Container>
      )}
    </div>
  );
}

export default Home;
