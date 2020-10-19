import {
  Button,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import EventTwoToneIcon from "@material-ui/icons/EventTwoTone";
import React from "react";
import { forwardRef } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: { display: "flex", alignItems: "center" },
    icon: {
      marginRight: "4px",
    }
  })
);

const CalendarCustomInput = ({
  value,
  onClick,
}: {
  value: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}, ref: ((instance: HTMLButtonElement | null) => void) | React.RefObject<HTMLButtonElement> | null | undefined) => {
  const classes = useStyles();

  return (
    <Button className={classes.button} color="inherit" onClick={onClick} ref={ref}>
        <EventTwoToneIcon className={classes.icon} />
        <Typography align="right">{value}</Typography>
    </Button>
  );
};

export default forwardRef(CalendarCustomInput);
