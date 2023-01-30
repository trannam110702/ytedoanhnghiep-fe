import styled from "styled-components";
const CardWrapper = styled.div`
  width: 254px;
  .background {
    height: 294px;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
  }
  .title {
    width: 50%;
    position: absolute;
    right: 16px;
    top: 33px;
  }
  .text {
    position: absolute;
    top: 120px;
    padding: 0 24px;
  }
`;
export default CardWrapper;
