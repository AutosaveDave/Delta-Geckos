import React from 'react';
import Hero from '../images/hero.png';
import Typewriter from 'typewriter-effect';
import "../style/Home.css";


// import React from 'react'

function Home() {
return (
    <div> 
    <img src={Hero} alt="background"/>
    <div className='Home'>
      <Typewriter 
      onInit={(typewriter)=>{
        typewriter.typeString("ARE YOU READY TO WIN GOLD!?!?")
        .callFunction(()=>{
          alert("Let's go!");
        })
        .pauseFor(2000)
        .deleteAll()
        .typeString("Enter the arena and battle with other users monsters to build your hoard of riches!")
        .pauseFor(2000)
        .deleteAll()
        .typeString("In this two plaer game, you will have a hand of five monsters to choose from. Once both parties have chosen their fighters their unique strengths will determine the victor.")
        .pauseFor(2000)
        .deleteAll()
        .typeString("How much gold can you pile up?")
        .start();
      }}
/>
    </div>
</div>
  );
 }

export default Home;
