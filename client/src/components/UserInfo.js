import * as React from "react";
import "./styles.css";
import { makeStyles } from "@material-ui/core";
import { Typography } from "@mui/material";

const styles = makeStyles((theme) => ({
  username: {
    height: 300,
    backgroundColor: "yellow",
    marginBottom: "5px",
    border: "1px solid black",
  },
  picture: {
    height: 300,
    backgroundColor: "green",
    marginBottom: "5px",
    border: "1px solid black",
  },
  balances: {
    [theme.breakpoints.up("sm")]: {
      display: "flex",
      columnGap: "5px",
    },
  },
 
