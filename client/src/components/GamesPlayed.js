import * as React from "react";
import { Grid } from "@mui/material";

export default function GamesPlayed() {
  return (
    <Grid className="gamesPlayedColumn">
      <Grid className="gamePlayedAmount">Games Played</Grid>
      <Grid className="gameOpponents">Opponent / Date</Grid>
    </Grid>
  );
}
