import React from "react";
import Grid from "@mui/material/Grid"; // Grid version 1
import Grid2 from "@mui/material/Unstable_Grid2"; // Grid version 2
import MonsterCard from "../components/MonsterCard";
import { Paper } from "@mui/material";
import PanToolIcon from "@mui/icons-material/PanTool";

function Arena() {
  return (
    <Grid container spacing={9}>
      <Grid item xs={7.25}>
        <Paper sx={{ fontSize: 14, marginLeft: 13, marginTop: 1 }}>enemy card</Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper>Gold</Paper>
      </Grid>
      <Grid item xs={5}>
        <Paper sx={{ fontSize: 16, marginLeft: 1}}>your card</Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ marginBottom: 3}} >your hand</Paper>
      </Grid>
    </Grid>
  );
}

export default Arena;
