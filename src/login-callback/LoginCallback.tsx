import React, { useEffect } from "react";
import * as QueryString from "query-string";
import StravaService from "../utils/StravaService";
import { Redirect } from "react-router-dom";
import useCookies from "react-cookie/es6/useCookies";
import Constants from "../utils/constants";

export default function LoginCallBack(props: { location: { search: string } }) {
  const [cookies, setCookie] = useCookies([Constants.COOKIE_STRAVA_USER]);

  const params = QueryString.parse(props.location.search);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const success = await StravaService.saveToken(params.code as string);
        setCookie(Constants.COOKIE_STRAVA_USER, success);
      } catch (e) {
        console.log(e);
      }
    };
    fetchToken();
  }, [params.code, setCookie]);
  return cookies ? <Redirect to="/" /> : <div></div>;
}
