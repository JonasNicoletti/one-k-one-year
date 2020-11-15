import { Button, Grid, Link } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { getLoginUrl } from "../../utils/AuthClient";
import "./Login.css";

export default function Login() {
  const [loginUrl, setLoginUrl] = useState("");
  const [goToDemo, setGoToDemo] = useState(false);

  useEffect(() => {
    const fetchLoginUrl = async () => {
      try {
        const data = await getLoginUrl();
        setLoginUrl(data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchLoginUrl();
  }, []);

  if (goToDemo) {
    return <Redirect to='/demo'/>
  }
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
      <Link
          component="button"
          color="secondary"
          onClick={() => {
            setGoToDemo(true);
          }}
        >
          Go to Demo
        </Link>
    </Grid>
  );
}
