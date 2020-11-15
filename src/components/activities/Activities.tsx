import {
  ListItem,
  ListItemText,
  Typography,
  Link,
  List,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core";
import React, { FunctionComponent, ReactNode } from "react";
import { Activity } from "../../utils/models";
import WhiteTextTypography from "../../ui/WhiteTextTypograpfy";

type ActivitiesProp = {
  activities: Activity[] | undefined;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    inline: {
      display: "inline",
      marginInlineEnd: "4px",
    },
    listItem: {
      color: "#FFFFFF",
    }
  })
);

const Activities: FunctionComponent<Partial<ActivitiesProp>> = ({
  activities,
}) => {
  const classes = useStyles();
  var list = new Array<ReactNode>();
  if (activities !== undefined) {
    list = activities.map((act: Activity) => (
      <ListItem alignItems="flex-start" key={act.id}>
        <ListItemText
          primary={
            <Typography
              variant="h6"
              className={classes.inline}
              color="secondary"
              display="inline"
            >
              {(parseFloat(act.distance) / 1000).toFixed(2)}&nbsp;km &nbsp;
            </Typography>
          }
          secondary={
            <React.Fragment>
              <Typography variant="body2" display="inline" component="span">
                <Link href={`https://www.strava.com/activities/${act.id}`}>
                  {" "}
                  {act.name}{" "}
                </Link>
              </Typography>

              <WhiteTextTypography
                variant="caption"
                className={classes.inline}
                display="inline"
              >
                {new Date(act.start_date_local).toLocaleDateString("it")}
              </WhiteTextTypography>
            </React.Fragment>
          }
        ></ListItemText>
      </ListItem>
    ));
  }
  return (
    <div>
      <WhiteTextTypography variant="h3" align="center">
        Runs
      </WhiteTextTypography>
      {list.length > 0 ? <List> {list} </List>: null}
    </div>
  );
};

export default Activities;
