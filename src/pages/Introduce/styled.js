import styled from "styled-components";
const IntroduceWrapper = styled.div`
  color: white;
  h1 {
    text-align: center;
    line-height: 1.3;
    font-size: 40px;
    padding-top: 100px;
  }
  p {
    text-align: center;
    font-weight: 100;
    font-size: 16px;
  }
`;
export const Images = styled.div`
  position: relative;
  margin-top: 60px;
  .posterImg {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  .posterImg:nth-child(1) {
    height: 516px;
  }
  .posterImg:nth-child(2) {
    height: 480px;
    position: absolute;
    width: 100%;
    max-width: 1142px;
    top: 60%;
    left: 50%;
    transform: translateX(-50%);
  }
`;
export const Intro = styled.div`
  color: ${(props) => props.theme.mainTextColor};
  max-width: ${(props) => props.theme.maxWidth};
  margin: 100px auto;
  #ellipse {
    position: absolute;
    z-index: -1;
  }
  .main {
    display: flex;
    margin-top: 100px;
    padding: 24px;
    width: 100%;
    justify-content: center;
    #laptop {
      width: 50%;
    }
    .content {
      width: 50%;
      h2 {
        font-size: 40px;
      }
      .use {
        display: flex;
        padding: 10px 0;
        font-size: 20px;
        img {
          height: 36px;
          margin-right: 10px;
        }
      }
    }
  }
`;
export const Cards = styled.div`
  height: 534px;
  background-color: #f3f3f9;
  .content {
    max-width: ${(props) => props.theme.maxWidth};
    margin: auto;
    padding: 120px 24px;
    display: flex;
    justify-content: center;
    gap: 24px;
  }
`;
export const Footer = styled.div`
  background-color: #032475;
  .content {
    max-width: ${(props) => props.theme.maxWidth};
    margin: auto;
    h1 {
      font-size: 16px;
      padding: 20px;
    }
  }
`;
export default IntroduceWrapper;
