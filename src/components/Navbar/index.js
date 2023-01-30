import React from "react";
import NavbarWrapper, { Content, Left, Right, Menu } from "./styled";
import { Link } from "react-router-dom";
import logo from "../../assets/imgs/Logo.svg";
const Navbar = () => {
  return (
    <NavbarWrapper>
      <Content>
        <Left>
          <img src={logo} alt="" />
          <Menu>
            <Link to={`/`}>Trang chủ</Link>
            <Link to={`/`}>Giới thiệu sản phẩm</Link>
          </Menu>
        </Left>
        <Right>
          <Link to={`/signin`}>Đăng ký</Link>
          <Link to={`/signin`}>Đăng nhập</Link>
        </Right>
      </Content>
    </NavbarWrapper>
  );
};

export default Navbar;
