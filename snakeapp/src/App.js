import React, { useEffect, useState, useRef, useCallback } from "react";
import styled from "styled-components";
import * as d3 from "d3";

import Food from "./Food";
import Snake from "./Snake";

const Svg = styled.svg`
  width: 480px;
  height: 480px;
  background: #0b0c10;
`;

//Random food coordinates for X and Y inside the game area
const getRandomCoordinates = () => {
  // The board is Square so moving horizontally or vertically the min is 1 and max 99
  let min = 1;
  //98 because it's an even number. Explains more below
  let max = 98;

  // Need a random even number generated.
  //
  // A random number is generated, multiplied by the max number, divided by two, decimals dropped,
  // and then multiplied by 2.
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;

  //return coordinates for random food
  return [x, y];
};
const initialState= {
  food: getRandomCoordinates(),
  speed: 200,
  direction: 'RIGHT',
  snakeDots: [
    [0,0],
    [2,0]
  ],
  time: 0
}
function App() {
  const [time, setTime] = useState(0)
  let food = useRef(getRandomCoordinates())
  let speed = useRef(200)
  let direction = useRef('RIGHT')
  let snakeDots = useRef([[0,0],[2,0]])

  const onGameOver = useCallback(event => {
    //string formating with back ticks.
    alert(`Game Over. Snake length is ${snakeDots.current.length}`);
    
    
    snakeDots.current = [[0,0],[0,2]]
    direction.current = 'RIGHT'
    speed.current = 200
    
    // clearInterval(this.state.intervalId);  
    console.log(snakeDots.current)
  }, [])
  // Did the snake hit a wall?
  const checkIfOutOfBorders = useCallback(event => {
    // all in one we get the head from the snake body array. 
    //a method is run inside the brackets to get the last item array
    
    let head = snakeDots.current[snakeDots.current.length - 1];
    // if snake collides call game over function
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      onGameOver();
    }
  },[onGameOver]);

  

  const moveSnake = () => {
    let dots = [...snakeDots.current];

    let head = dots[dots.length - 1];

    switch (direction.current) {
      // the individual body parts of the snake are 2x2
      // so movement is incremented by 2
      // Coordinate System [x,y]

      // snake moves right: [X+2,Y] 
      case 'RIGHT':
        head = [head[0] + 2, head[1]];
        break;
      // snake moves left: [X-2,Y]
      case 'LEFT':
        head = [head[0] - 2, head[1]];
        break;
      // snake moves down: [X,Y-2] 
      case 'DOWN':
        head = [head[0], head[1] + 2];
        break;
      // snake moves up: [X,Y+2] 
      case 'UP':
        head = [head[0], head[1] - 2];
        break;
      default:
    }
    // add the new head coordinate to the array
    dots.push(head);
    // delete the last item of the array 
    dots.shift();

    snakeDots.current = dots

  }


  const handleUserKeyPress = useCallback(event => {
    const { key, keyCode } = event;

    switch (keyCode) {
      case 38:
        direction.current="UP";
        break;
      case 40:
        direction.current="DOWN";
        break;
      case 37:
        direction.current="LEFT";
        break;
      case 39:
        direction.current="RIGHT";
        break;
      // add default to get rid of errors.
      default:
    }
    
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);
    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  }, [handleUserKeyPress]);


  useEffect(() => {
    const interval = d3.interval(() => {
      setTime(time => time+=1)
    }, 1000);
    
    return () => {
      interval.stop();
    };
    
  }, []);

  useEffect(() => {
    moveSnake()
    checkIfOutOfBorders()
    
    return () => {
      console.log('goodbye')
    };
  }, [time, checkIfOutOfBorders])

  console.log(time)
  return (
    <Svg>
      <Snake snakeDots={snakeDots.current} />
      <Food dot={food.current} />
      <g>{time}</g>
    </Svg>
  );
}

export default App;
