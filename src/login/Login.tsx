import { Button, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import StravaService from "../utils/StravaService";
import "./Login.css";

export default function Login() {
  const [loginUrl, setLoginUrl] = useState("");

  useEffect(() => {
    const fetchLoginUrl = async () => {
      try {
        const data = await StravaService.getLoginUrl();
        setLoginUrl(data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchLoginUrl();
  }, []);

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={3}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => window.open(loginUrl)}
        >
          Login with Strava
        </Button>
      </Grid>
    </Grid>
  );
}
