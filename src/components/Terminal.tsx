import styled from "styled-components";
import Draggable from "react-draggable";
import { Resizable } from "re-resizable";
import { IoClose } from "react-icons/io5";
import { FaRegWindowMinimize } from "react-icons/fa";
import { useState } from "react";
import TerminalScreen from "./TerminalScreen";
import { MdCloseFullscreen, MdOutlineOpenInFull } from "react-icons/md";

const Terminal = ({
  setIsTerminalOpen,
}: {
  setIsTerminalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [boxTransition, setBoxTransition] = useState({ transition: "0.3s" });
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [isMouseOver, setIsMouseOver] = useState<boolean>(false);

  const handleCloseTerminal = () => {
    setIsTerminalOpen(false);
  };

  const handleFullScreenTerminal = () => {
    setIsFullScreen((cur) => !cur);
  };

  const handleTransitionDisable = () => {
    setBoxTransition({ transition: "none" });
  };

  const handleTransitionAble = () => {
    setBoxTransition({ transition: "0.3s" });
  };

  const draggableSettings = {
    bounds: ".bound",
    handle: ".bar",
    position: isFullScreen ? { x: 0, y: 0 } : undefined,
    onStart: handleTransitionDisable,
    onStop: handleTransitionAble,
  };

  const resizableSettings = {
    defaultSize: { width: "75%", height: "70%" },
    minHeight: 100,
    minWidth: 100,
    enable: {
      right: true,
      bottom: true,
      bottomRight: true,
    },
    size: isFullScreen ? { width: "100%", height: "100%" } : undefined,
    style: boxTransition,
    onResizeStart: handleTransitionDisable,
    onResizeStop: handleTransitionAble,
  };

  return (
    <TerminalWrapper className="bound">
      <Draggable {...draggableSettings} disabled={isFullScreen}>
        <Resizable {...resizableSettings}>
          <ContentBox>
            <div className="bar"></div>
            <div
              className={`circles ${isMouseOver ? "mouse-on" : ""}`}
              onMouseOver={() => setIsMouseOver(true)}
              onMouseOut={() => setIsMouseOver(false)}
            >
              <div className="circle circle-1" onClick={handleCloseTerminal}>
                <IoClose className="icon" size={16} />
              </div>
              <div className="circle circle-2" onClick={handleCloseTerminal}>
                <FaRegWindowMinimize className="icon" size={13} />
              </div>
              <div
                className="circle circle-3"
                onClick={handleFullScreenTerminal}
              >
                {isFullScreen ? (
                  <MdCloseFullscreen className="icon" size={13} />
                ) : (
                  <MdOutlineOpenInFull className="icon" size={13} />
                )}
              </div>
            </div>
            <TerminalScreen setIsTerminalOpen={setIsTerminalOpen} />
          </ContentBox>
        </Resizable>
      </Draggable>
    </TerminalWrapper>
  );
};

const TerminalWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  .react-draggable {
    z-index: 10;
  }
`;

const ContentBox = styled.div`
  width: 100%;
  height: 100%;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.4);
  border: 1px solid #888;
  border-radius: 0.5rem;
  overflow: hidden;

  .bar {
    width: 100%;
    height: 2rem;
    border-bottom: 1px solid #888;
    color: #000;
    background-color: #666;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: default;
  }
  .bar-title {
    color: #fff;
  }
  .circles {
    width: 4rem;
    display: flex;
    justify-content: space-between;
    margin-left: 0.5rem;
    position: absolute;
    top: 0.5rem;
  }
  .circle {
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .circle-1 {
    background-color: #ff5f57;
  }
  .circle-2 {
    background-color: #febc2e;
    .icon {
      position: relative;
      top: -0.3rem;
    }
  }
  .circle-3 {
    background-color: #29c840;
  }
  .icon {
    display: none;
    color: #333;
  }
  .mouse-on {
    .icon {
      display: block;
    }
  }
`;

export default Terminal;
