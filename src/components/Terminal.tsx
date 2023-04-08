import styled from "styled-components";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import { IoFilterOutline, IoClose } from "react-icons/io5";
import { FaRegWindowMinimize } from "react-icons/fa";
import { useEffect, useState } from "react";

const Terminal = ({
  setIsTerminalOpen,
}: {
  setIsTerminalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleBoxSize = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth <= 576) {
      return { width: 300, height: 400 };
    }
    return { width: 500, height: 400 };
  };

  const [boxSize, setBoxSize] = useState(handleBoxSize());
  const [isMouseOver, setIsMouseOver] = useState<boolean>(false);

  const handleCloseTerminal = () => {
    setIsTerminalOpen(false);
  };

  const handleResizeWindow = () => {
    setBoxSize(handleBoxSize());
  };

  useEffect(() => {
    window.addEventListener("resize", handleResizeWindow);
    handleResizeWindow();
    return () => window.removeEventListener("resize", handleResizeWindow);
  }, []);

  return (
    <TerminalWrapper width={boxSize.width}>
      <Draggable bounds="body" handle=".bar">
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
          </div>
        </ResizableBox>
      </Draggable>
    </TerminalWrapper>
  );
};

const TerminalWrapper = styled.div<{ width: number }>`
  width: 100vw;
  height: 100vh;
  position: absolute;
  overflow: auto;

  .react-resizable {
    position: relative;
    width: 500px;
    height: 400px;
    background-color: #111;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.4);
    border: 1px solid #888;
    border-radius: 0.5rem;
    overflow: hidden;
    z-index: 10;
    left: calc(50% - ${(props) => props.width / 2}px);
    top: calc(50% - 200px);
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
    width: 2.5rem;
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
  .icon {
    display: none;
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
