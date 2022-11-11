import { Grid } from "@mui/material";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import "../style/Profile.css";
import Auth from "../utils/auth";
import { Navigate } from "react-router-dom";

export default function UserInfo() {
  const isLoggedIn = Auth.loggedIn();
  console.log(isLoggedIn);
  
  if( !isLoggedIn) {
    return <Navigate to="/LoginSignup"></Navigate>
  }
  const userStuff = Auth.getUser();
  console.log(userStuff);
  return (
    <Grid className="userInfoColumn">
      <Grid className="username">{userStuff.data.username}</Grid>

      <Grid className="picture">
        <Stack direction="row">
          <Avatar className="avatar" src="" sx={{ width: 150, height: 150 }} />
        </Stack>
      </Grid>

      <Grid className="balances">
        <Grid className="gold_balance">gold balance</Grid>

        <Grid className="win_loss">wins/losses</Grid>
      </Grid>
    </Grid>
  );
}
