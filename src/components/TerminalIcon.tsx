import styled from "styled-components";
import { MdKeyboardArrowRight } from "react-icons/md";
import { IconWrapper } from "./Folder";

const TerminalIcon = ({
  handleOpenTerminal,
}: {
  handleOpenTerminal: () => void;
}) => {
  return (
    <TerminalIconWrapper onClick={handleOpenTerminal}>
      <div className="icon">
        <MdKeyboardArrowRight className="arrow" size={40} />
        <span className="underline">_</span>
      </div>
      <div className="name">Terminal</div>
    </TerminalIconWrapper>
  );
};

const TerminalIconWrapper = styled(IconWrapper)`
  .icon {
    width: 5rem;
    height: 4.7rem;
    border-radius: 0.5rem;
    background-color: #1c1c1c;
    box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2), inset 0px 0px 0px 10px black;
    outline: 5px solid lightgray;
    outline-offset: -5px;
    color: #fff;
    position: relative;
    .arrow {
      position: absolute;
      left: 0.2rem;
      top: 0.3rem;
    }
    .underline {
      font-weight: 900;
      font-size: 2rem;
      position: absolute;
      left: 1.9rem;
      top: 0.3rem;
    }
  }
`;

export default TerminalIcon;
