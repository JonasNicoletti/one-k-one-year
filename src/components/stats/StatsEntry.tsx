import {
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import React from "react";
import { FunctionComponent } from "react";
import WhiteTextTypography from "../../ui/WhiteTextTypograpfy";

type StatsEntryProp = {
  statName: string;
  statDescription?: string;
  goalValue: string;
  resultValue: string;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    goalText: {
      color: "#FFC154",
    },
    resultText: {
      color: "rgba(75,192,192,1)",
    },
  })
);

const StatsEntry: FunctionComponent<StatsEntryProp> = ({
  statName,
  statDescription,
  goalValue,
  resultValue,
}) => {
  const classes = useStyles();

  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <WhiteTextTypography>{statName}</WhiteTextTypography>
        {statDescription ? (
          <WhiteTextTypography
            variant="caption"
            display="block"
          >{`(${statDescription})`}</WhiteTextTypography>
        ) : null}
      </Grid>
      <Grid item xs={3}>
        <Typography className={classes.goalText}>{goalValue}</Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography className={classes.resultText}>{resultValue}</Typography>
      </Grid>
    </Grid>
  );
};

export default StatsEntry;
