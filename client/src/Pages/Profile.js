import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

function Profile() {
  return (
    <div>
    <Card sx={{ maxWidth: 345}}>
      <CardContent>
        <Typography>
          Username
        </Typography>
        <CardMedia
          component="img"
          height="152"
          image="\assets\characters\2.png"
          alt="monster 2"
        />
        

      </CardContent>
    </Card>
    </div>
  )
}

export default Profile