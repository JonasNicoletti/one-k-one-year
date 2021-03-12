import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { useState } from "react";
import React, { FunctionComponent, useEffect } from "react";
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
  CircularProgress,
} from "@material-ui/core";
import WhiteTextTypography from "../../ui/WhiteTextTypograpfy";
import useCookies from "react-cookie/es6/useCookies";
import Constants from "../../utils/constants";
import LinearProgressWithLabel from "../../ui/LinerProgressWithLabel";
import Activities from "../activities/Activities";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CalendarCustomInput from "../../ui/CalendarCustomInput";
import Stats from "../stats/Stats";
import { useUser } from "../../context/UserProvider";
import { Activity } from "../../utils/models";

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

type HomeProps = {
  isDemo: boolean;
};

const Home: FunctionComponent<HomeProps> = ({ isDemo }) => {
  var { fetchActivities, startingDate, saveStartingDate } = useUser();
  const [cookies, , removeCookie] = useCookies([
    Constants.COOKIE_STRAVA_USER,
    Constants.COOKIE_STARTING_DATE,
  ]);

  const classes = useStyles();
  const [activities, setActivities] = useState<Array<Activity>>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getActivites = async () => {
      setLoading(true);
      const fetchedAcivites = await fetchActivities(isDemo);
      setActivities(fetchedAcivites);
      setLoading(false);
    };
    getActivites();
  }, [startingDate, fetchActivities, isDemo]);

  let totalKms = 1000;
  if (activities) {
    totalKms = activities.reduce((acc, act) => acc + +act.distance, 0) / 1000.0;
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar variant="dense">
          <DatePicker
            dateFormat="dd/MM/yyyy"
            maxDate={new Date()}
            selected={startingDate}
            onChange={(date: Date) => {
              startingDate = date;
              saveStartingDate(date, isDemo);
            }}
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
          ) : (
            <Button
              color="inherit"
              onClick={() => (window.location.href = "/login")}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      {loading ? (
        <Grid container justify="center">
          <CircularProgress />
        </Grid>
      ) : (
        <Container>
          <Box my={6}>
            <div className={classes.subTitle}>
              <Typography
                variant="h1"
                align="center"
                color="secondary"
                display="inline"
              >
                {(1000.0 - totalKms).toFixed(2)} km&nbsp;
              </Typography>
              <WhiteTextTypography variant="h1" align="center" display="inline">
                to go
              </WhiteTextTypography>
            </div>
            <div>
              <LinearProgressWithLabel
                className={classes.progressBar}
                value={(totalKms * 100.0) / 1000.0}
              />
            </div>
            <Grid container justify="center" spacing={2}>
              <Grid item xs={6}>
                <Activities activities={activities} />
              </Grid>
              <Grid item xs={6}>
                <Stats startDate={startingDate} activities={activities} />
              </Grid>
            </Grid>
          </Box>
        </Container>
      )}
    </div>
  );
};

export default Home;
