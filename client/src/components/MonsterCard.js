import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import "../style/card.css";

export default function MonsterCard() {
  return (
    <Card sx={{ width: 142, height: 200 }}>
      <CardActionArea>
        <Typography sx={{ fontSize: 13, marginLeft: 1, marginBottom: -3 }}>
          Oscar The Marcus
        </Typography>
        <CardMedia
          component="img"
          height="152"
          image="/assets/characters/2.png"
          alt="monster 2"
        />
        <CardContent>
          <Typography
            sx={{ fontSize: 12, marginTop: -6 }}
            variant="body2"
            color="text.secondary"
          >
            <br></br>
            Watch out.
            <br></br>
            He'll get'cha.
          </Typography>
          <Typography sx={{ fontSize: 10, marginTop: 2, marginLeft: 11 }}>
            A/D
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
