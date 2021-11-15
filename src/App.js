import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: ${window.innerHeight}px;
  position: relative;
  overflow: hidden;
`;

const Bird = styled.div`
  width: 200px;
  height: 200px;
  background-color: crimson;
  position: absolute;
  left: 100px;
  /* transition: 2ms; */
`;

const PoleContainer = styled.div`
  width: 200px;
  position: absolute;
  top: 0px;
  height: 100%;
  background-color: greenyellow;
`;

const PoleSpace = styled.div`
  width: 200px;
  position: absolute;
  top: 0px;
  height: 400px;
  background-color: white;
`;

const DOWN_RANGE_ANIMATION = 4;
const UP_RANGE_ANIMATION = 6;
const POLE_MOVE_RANGE_ANIMATION = 2;
const INITIAL_POSITION_Y = `${window.innerHeight / 2}`;

function App() {
  // const [state, setState] = useState("stop");
  const [posY, setPosY] = useState(INITIAL_POSITION_Y - 100);

  const randomPoleHole = useCallback(() => {
    return Math.floor(Math.random() * (window.innerHeight - 400 - 200)) + 200;
  }, []);
  const [polePosition, setPolePosition] = useState([
    {
      posX: window.innerWidth * 0.5,
      poleHolePos: randomPoleHole(),
    },
    {
      posX: window.innerWidth * 0.75,
      poleHolePos: randomPoleHole(),
    },
    {
      posX: window.innerWidth,
      poleHolePos: randomPoleHole(),
    },
    {
      posX: window.innerWidth * 0.25,
      poleHolePos: randomPoleHole(),
    },
  ]);

  useEffect(() => {
    setInterval(() => {
      setPolePosition((prev) => {
        for (let index = 0; index < prev.length; index++) {
          let element = prev[index];
          if (element.posX < -400) {
            element.posX = window.innerWidth;
            element.poleHolePos = randomPoleHole();
          } else {
            element.posX -= POLE_MOVE_RANGE_ANIMATION;
          }
        }
        return [...prev];
      });
    }, 10);

    let downAnimationInterval = null;
    let upAnimationInterval = null;
    let upAnitionDuration = null;
    downAnimationInterval = setInterval(() => {
      setPosY((prev) => prev + DOWN_RANGE_ANIMATION);
    }, 10);
    window.addEventListener("keydown", (e) => {
      if (e?.code === "ArrowUp" || e?.code === "Space") {
        clearInterval(downAnimationInterval);
        clearInterval(upAnimationInterval);
        clearTimeout(upAnitionDuration);
        upAnimationInterval = setInterval(() => {
          setPosY((prev) => prev - UP_RANGE_ANIMATION);
        }, 10);
        upAnitionDuration = setTimeout(() => {
          clearInterval(upAnimationInterval);
          downAnimationInterval = setInterval(() => {
            setPosY((prev) => prev + DOWN_RANGE_ANIMATION);
          }, 10);
        }, 200);
      }
    });
  }, [randomPoleHole]);

  return (
    <Container>
      <PoleContainer style={{ left: `${polePosition[0].posX}px` }}>
        <PoleSpace
          style={{
            top: `${polePosition[0].poleHolePos}px`,
          }}
        />
      </PoleContainer>
      <PoleContainer style={{ left: `${polePosition[1].posX}px` }}>
        <PoleSpace
          style={{
            top: `${polePosition[1].poleHolePos}px`,
          }}
        />
      </PoleContainer>
      <PoleContainer style={{ left: `${polePosition[2].posX}px` }}>
        <PoleSpace
          style={{
            top: `${polePosition[2].poleHolePos}px`,
          }}
        />
      </PoleContainer>
      <PoleContainer style={{ left: `${polePosition[3].posX}px` }}>
        <PoleSpace
          style={{
            top: `${polePosition[3].poleHolePos}px`,
          }}
        />
      </PoleContainer>
      <Bird style={{ top: `${posY}px` }} />
    </Container>
  );
}

export default App;
