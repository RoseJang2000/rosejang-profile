import styled from "styled-components";
import Draggable from "react-draggable";
import { useRef } from "react";

const Terminal = () => {
  const dragRef = useRef<HTMLDivElement>(null);

  return (
    <Draggable nodeRef={dragRef} handle=".bar" bounds="body">
      <TerminalContainer ref={dragRef}>
        <div className="bar"></div>
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
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
  border: 1px solid #888;
  cursor: text;

  .bar {
    width: 100%;
    height: 2rem;
    background-color: #777;
    border-bottom: 1px solid #888;
    color: #000;
    cursor: default;
  }
`;

export default Terminal;
