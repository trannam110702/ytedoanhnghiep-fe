import styled from "styled-components";
const EnterpriseListWrapper = styled.div`
  overflow: hidden;
  height: 100%;
  width: 100%;

  #taskbar-row {
    margin-bottom: 20px;
    height: 30px;
    gap: 12px;
    #add-btn {
      width: 100%;
    }
    .txt {
      line-height: 30px;
    }
  }
  #content-row {
    flex-wrap: nowrap;
    height: calc(100% - 60px);
  }
  .ant-col,
  .ant-tree {
    height: 100%;
  }
  .ant-tree {
    overflow-y: auto;
    overflow-x: hidden;
  }
  .ant-table-wrapper {
    overflow-y: scroll;
    height: 100%;
  }
`;
export const FormWrapper = styled.div`
  padding: 20px;
  .footer {
    display: flex;
    gap: 10px;
    justify-content: end;
  }
`;
export default EnterpriseListWrapper;
