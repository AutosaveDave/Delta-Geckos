import React from "react";
import Hero from "../images/hero.png";
import Typewriter from "typewriter-effect";
import { ThemeProvider } from "@mui/material/styles";
import Theme1 from "../Theme1";

function Home() {
  return (
    <ThemeProvider theme={Theme1}>
      <div>
        <img src={Hero} alt="background" />
        <div className="Home">
          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .typeString("ARE YOU READY TO WIN GOLD!?!?")
                .pauseFor(1000)
                .deleteAll()
                .typeString(
                  "Enter the arena and battle with other users monsters to build your hoard of riches!"
                )
                .pauseFor(1000)
                .deleteAll()
                .typeString(
                  "In this two plaer game, you will have a hand of five monsters to choose from. Once both parties have chosen their fighters their unique strengths will determine the victor."
                )
                .pauseFor(1000)
                .deleteAll()
                .typeString("How much gold can you pile up?")
                .start();
            }}
          />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default Home;
