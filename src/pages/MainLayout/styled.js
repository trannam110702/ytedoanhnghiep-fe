import styled from "styled-components";
const LayoutWrapper = styled.div`
  .header {
    color: white;
    font-size: 16px;
    display: flex;
    justify-content: space-between;
    .logo {
      display: flex;
      gap: 10px;
    }
    img {
      height: 32px;
      align-self: center;
    }
  }
  .ant-layout-sider {
    .trigger {
      padding: 20px;
      width: 80px;
      svg {
        height: 20px;
        width: 20px;
      }
    }
  }
`;
export default LayoutWrapper;
