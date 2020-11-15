import React, { useEffect, useState } from "react";
import * as QueryString from "query-string";
import { Redirect } from "react-router-dom";
import { saveToken } from "../utils/AuthClient";

export default function LoginCallBack(props: { location: { search: string } }) {
  const [loggedIn, setLoggedIn] = useState(false);

  const params = QueryString.parse(props.location.search);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        setLoggedIn(await saveToken(params.code as string))
      } catch (e) {
        console.log(e);
      }
    };
    fetchToken();
  }, [params.code]);
  return loggedIn ? <Redirect to="/" /> : <div></div>;
}
