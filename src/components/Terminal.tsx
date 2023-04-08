import styled from "styled-components";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import { useRef, useState } from "react";
import { IoFilterOutline } from "react-icons/io5";

const Terminal = () => {
  return (
    <TerminalWrapper>
      <Draggable bounds="body" handle=".bar">
        <ResizableBox
          width={500}
          height={400}
          handle={
            <ResizeHandle>
              <IoFilterOutline size={25} />
            </ResizeHandle>
          }
        >
          <div className="bar"></div>
        </ResizableBox>
      </Draggable>
    </TerminalWrapper>
  );
};

const TerminalWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;

  .react-resizable {
    position: relative;
    width: 500px;
    height: 400px;
    background-color: #111;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
    border: 1px solid #888;
    border-radius: 0.5rem;
    overflow: hidden;
    z-index: 10;
  }

  .bar {
    width: 100%;
    height: 2rem;
    border-bottom: 1px solid #888;
    color: #000;
    background-color: #777;
    cursor: default;
  }
`;

const ResizeHandle = styled.div`
  position: absolute;
  bottom: -0.3rem;
  right: -0.3rem;
  cursor: nw-resize;
  color: #888;
  transform: rotate(-46deg);
`;

export default Terminal;
