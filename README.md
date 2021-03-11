# 1k1Y

This web-app keeps track of your strava runs

## Setup

1. Create a App in [StravaAPI](https://www.strava.com/settings/api)
2. Set into the StravaAPI the 'Authorization Callback Domain' to the url where you host your webapp
3. This enviroment variables are needed:
   - REACT_APP_client_ID -> StravaAPI.Client ID
   - REACT_APP_client_secret -> StravaAPI.Client Secret
   - REACT_APP_redirect_uri -> StravaAPI.Authorization Callback Domain + /callback

### Local Development

Set up portforwading with [Ngork](https://ngrok.com/) (./ngork http 3000) and copy the forwading-url into the Authorization Callback of your StavaAPI.
