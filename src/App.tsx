import { useState } from "react";
import { GlobalStyle } from "./GlobalStyle";
import styled from "styled-components";
import Background from "@components/Background";
import { iconList } from "@assets/iconList";
import Folder from "@components/Folder";
import TerminalIcon from "@components/TerminalIcon";
import Terminal from "@components/Terminal";

const App = () => {
  const [isTerminalOpen, setIsTerminalOpen] = useState<boolean>(false);

  const handleOpenTerminal = () => {
    setIsTerminalOpen(true);
  };

  return (
    <Container>
      <GlobalStyle />
      {isTerminalOpen && <Terminal />}
      <Background />
      <section className="content">Hello! RoseJang2000!</section>
      <IconWrapper>
        {iconList.map((item, index) => (
          <Folder key={index} name={item.name} link={item.link} />
        ))}
        <TerminalIcon handleOpenTerminal={handleOpenTerminal} />
      </IconWrapper>
    </Container>
  );
};

const Container = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 3rem;

  .content {
    width: 20rem;
    height: 7rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 0.5rem;
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.25);
  }
`;

const IconWrapper = styled.section`
  width: 50rem
  background-color: #fff;
  display: flex;
  gap: 2rem;
  align-items: flex-end;
`;

export default App;
