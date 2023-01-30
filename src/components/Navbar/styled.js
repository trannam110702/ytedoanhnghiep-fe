import styled from "styled-components";
const NavbarWrapper = styled.nav`
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  background-color: #032475;
  height: 60px;
  font-style: normal;
  font-size: 16px;
`;
export const Content = styled.div`
  padding: 0 24px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  max-width: ${(props) => props.theme.maxWidth};
  margin: auto;
  color: white;
`;
export const Left = styled.div`
  padding: 10px;
  display: flex;
  gap: 24px;
  align-items: center;
  img {
    height: 30px;
  }
`;
export const Menu = styled.div`
  display: flex;
  gap: 24px;
  a {
    cursor: pointer;
    padding: 10px 5px;
    position: relative;
    &::after {
      background-color: #0d99ff;
      content: "";
      position: absolute;
      width: 20px;
      height: 20px;
      left: 50%;
      bottom: 0;
      transform: translateX(-50%);
      height: 2px;
      width: 0;
      transition: width 0.5s ease;
    }
    &.active::after,
    &:hover::after {
      width: 100%;
    }
  }
`;
export const Right = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 24px;
  a:hover {
    cursor: pointer;
    color: rgb(13, 153, 255);
  }
  a {
    padding: 10px;
  }
`;
export default NavbarWrapper;
