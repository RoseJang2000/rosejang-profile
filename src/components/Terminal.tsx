import styled from "styled-components";
import Draggable from "react-draggable";
import { useRef, useState } from "react";

const Terminal = () => {
  const dragRef = useRef<HTMLDivElement>(null);

  return (
    <Draggable nodeRef={dragRef} handle=".bar" bounds="body">
      <TerminalContainer ref={dragRef}>
        <div className="bar"> .bar</div>
      </TerminalContainer>
    </Draggable>
  );
};

const TerminalContainer = styled.div`
  width: 30rem;
  height: 20rem;
  background-color: black;
  border-radius: 0.5rem;
  position: absolute;
  z-index: 2;
  margin: auto;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  color: #fff;
  cursor: text;

  .bar {
    width: 100%;
    height: 2rem;
    background-color: lightgray;
    color: #000;
    cursor: default;
  }
`;

export default Terminal;
