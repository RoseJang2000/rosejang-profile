import styled from "styled-components";

const Folder = ({ name, link }: { name: string; link: string }) => {
  const handleIconClick = () => {
    window.open(link);
  };

  return (
    <IconWrapper onClick={handleIconClick}>
      <FolderIcon>
        <div className="piece-1"></div>
        <div className="piece-2"></div>
        <div className="inner"></div>
      </FolderIcon>
      <div className="name">{name}</div>
    </IconWrapper>
  );
};

export const IconWrapper = styled.div`
  width: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;

  .name {
    width: 100%;
    text-align: center;
    text-shadow: 0px 2px 3px rgba(0, 0, 0, 0.2);
  }
`;

const FolderIcon = styled.div`
  width: 5rem;
  height: 4rem;
  background-color: #dcaf24;
  position: relative;
  border-radius: 0 5px 5px 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2);
  .piece-1 {
    background-color: #dcaf24;
    width: 2.5rem;
    height: 0.7rem;
    position: absolute;
    top: -0.7rem;
    left: 0;
    border-radius: 5px 5px 0 0;
  }
  .inner {
    width: 80%;
    height: 85%;
    background-color: #fff;
    position: absolute;
    bottom: 2px;
    border-radius: 5px;
  }
  .piece-2 {
    background-color: #f2bf26;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    border-radius: 5px;
    z-index: 1;
  }
  :hover {
    .piece-2 {
      transform: sKewX(-13deg);
      left: 0.3rem;
      height: 80%;
    }
  }
`;

export default Folder;
