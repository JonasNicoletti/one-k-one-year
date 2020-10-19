import {
  Box,
  LinearProgress,
  LinearProgressProps,
} from "@material-ui/core";
import React from "react";
import WhiteTextTypography from "./WhiteTextTypograpfy";

export default function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <WhiteTextTypography variant="body2" color="textSecondary">{`${Math.round(
          props.value
        )}%`}</WhiteTextTypography>
      </Box>
    </Box>
  );
}
