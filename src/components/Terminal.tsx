import styled from "styled-components";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import { IoFilterOutline, IoClose } from "react-icons/io5";
import { FaRegWindowMinimize } from "react-icons/fa";
import { useEffect, useState } from "react";
import TerminalScreen from "./TerminalScreen";
import { MdCloseFullscreen, MdOutlineOpenInFull } from "react-icons/md";

const Terminal = ({
  setIsTerminalOpen,
}: {
  setIsTerminalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  const handleBoxSize = () => {
    const windowWidth = window.innerWidth;
    if (isFullScreen) {
      return { width: windowWidth, height: window.innerHeight };
    }

    if (windowWidth <= 576) {
      return { width: 300, height: 400 };
    } else if (windowWidth <= 768) {
      return { width: 500, height: 400 };
    } else if (windowWidth <= 992) {
      return { width: 700, height: 500 };
    }
    return { width: 800, height: 500 };
  };

  const [boxSize, setBoxSize] = useState(handleBoxSize());
  const [isMouseOver, setIsMouseOver] = useState<boolean>(false);

  const handleCloseTerminal = () => {
    setIsTerminalOpen(false);
  };

  const handleResizeWindow = () => {
    setBoxSize(handleBoxSize());
  };

  const handleFullScreenTerminal = () => {
    if (!isFullScreen) {
      setBoxSize({ width: window.innerWidth, height: window.innerHeight });
      setIsFullScreen(true);
    } else {
      setBoxSize(handleBoxSize());
      setIsFullScreen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResizeWindow);
    handleResizeWindow();
    return () => window.removeEventListener("resize", handleResizeWindow);
  }, [isFullScreen]);

  return (
    <TerminalWrapper
      className="bound"
      width={boxSize.width}
      height={boxSize.height}
    >
      <Draggable bounds=".bound" handle=".bar">
        <ResizableBox
          width={boxSize.width}
          height={boxSize.height}
          handle={
            <ResizeHandle>
              <IoFilterOutline size={25} />
            </ResizeHandle>
          }
          minConstraints={[100, 100]}
        >
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
            <div className="circle circle-3" onClick={handleFullScreenTerminal}>
              {isFullScreen ? (
                <MdCloseFullscreen className="icon" size={13} />
              ) : (
                <MdOutlineOpenInFull className="icon" size={13} />
              )}
            </div>
          </div>
          <TerminalScreen setIsTerminalOpen={setIsTerminalOpen} />
        </ResizableBox>
      </Draggable>
    </TerminalWrapper>
  );
};

const TerminalWrapper = styled.div<{ width: number; height: number }>`
  width: 100vw;
  height: 100vh;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;

  .react-resizable {
    position: relative;
    width: 500px;
    height: 400px;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.4);
    border: 1px solid #888;
    border-radius: 0.5rem;
    overflow: hidden;
    z-index: 10;
    /* left: calc(50% - ${(props) => props.width / 2}px);
    top: calc(50% - ${(props) => props.height / 2}px); */
  }
  .bar {
    width: 100%;
    height: 2rem;
    border-bottom: 1px solid #888;
    color: #000;
    background-color: #666;
    display: flex;
    align-items: center;
    cursor: default;
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

const ResizeHandle = styled.div`
  position: absolute;
  bottom: -0.3rem;
  right: -0.3rem;
  cursor: nw-resize;
  color: #888;
  transform: rotate(-46deg);
`;

export default Terminal;
