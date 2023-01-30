import styled from "styled-components";
const SignInWrapper = styled.div`
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${(props) => props.bg});
  width: 100%;
  height: 100vh;
  display: flex;
  .form {
    background-color: white;
    width: 464px;
    border-radius: 10px;
    margin: auto;
    align-self: center;
    padding: 80px;
    .title {
      padding: 24px 0;
      text-align: center;
      font-size: 24px;
    }
    .login-form-button {
      display: block;
      margin: auto;
      width: 100%;
    }
    .ant-spin {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;
export default SignInWrapper;
