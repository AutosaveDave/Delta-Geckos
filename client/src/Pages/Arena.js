import React from "react";
import Grid from "@mui/material/Grid"; // Grid version 1
import Grid2 from "@mui/material/Unstable_Grid2"; // Grid version 2
import MonsterCard from "../components/MonsterCard";
import { Paper } from "@mui/material";
import PanToolIcon from "@mui/icons-material/PanTool";
import Avatar from '@mui/material/Avatar';
import "../style/Arena.css";
import { makeStyles, makeStyls } from '@material-ui/core'

const useStyles = makeStyles({
  
})

function Arena() {
  return (
    <Grid container spacing={9}>
      {/* <Grid item xs={7.25}sm={6.25}> */}
        <Paper sx={{ marginLeft: 30, marginTop: 16 }}>
          <MonsterCard/>
          </Paper>
      {/* </Grid> */}
      <Grid item xs={9}>
      <Avatar alt="gold" src="/gold.png" className="gold"/>
      </Grid>
      <Grid item xs={5}>
      <Paper sx={{ marginLeft: 30 }}>
          <MonsterCard/>
          </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ marginBottom: 3}} >
          <PanToolIcon></PanToolIcon>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Arena;
