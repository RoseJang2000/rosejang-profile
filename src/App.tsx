import Background from "@components/Background";
import styled from "styled-components";
import { GlobalStyle } from "./GlobalStyle";

const App = () => {
  return (
    <Container>
      <GlobalStyle />
      <Background />
      <section className="content">Hello! RoseJang2000!</section>
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

export default App;
