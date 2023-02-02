import { Layout, Menu, theme, Dropdown } from "antd";
import React, { useContext, useState } from "react";

import { Outlet, useNavigate } from "react-router-dom";
import LayoutWrapper from "./styled";
import MenuItems from "./MenuItems";
import logo from "../../assets/imgs/Logo.svg";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DownOutlined,
} from "@ant-design/icons";

import { Store } from "../../store/store";
const { Header, Content, Sider } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { dispatch } = useContext(Store);
  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const menuItemClick = ({ key }) => {};
  const items = [
    {
      key: "logOut",
      label: "Đăng xuất",
    },
  ];
  return (
    <LayoutWrapper>
      <Layout>
        <Header className="header">
          <div className="logo">
            <img src={logo} alt="" />
            <span>Y tế doanh nghiệp</span>
          </div>
          <div>
            <Dropdown
              menu={{
                items,
                onClick: (info) => {
                  if (info.key === "logOut") {
                    localStorage.removeItem("user_id");
                    localStorage.removeItem("role");
                    dispatch({ type: "logout" });
                    navigate("/signin");
                  }
                },
              }}
              placement="bottomRight"
            >
              <DownOutlined />
            </Dropdown>
          </div>
        </Header>
        <Layout>
          <Sider
            width={250}
            style={{
              background: colorBgContainer,
              overflow: "auto",
              height: "calc(100vh - 64px)",
            }}
            trigger={null}
            collapsible
            collapsed={collapsed}
          >
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: () => setCollapsed(!collapsed),
              }
            )}
            <Menu
              mode="inline"
              defaultSelectedKeys={["quanlykham"]}
              defaultOpenKeys={["quanlykham", "quantrihethong"]}
              style={{
                borderRight: 0,
              }}
              items={MenuItems("admin")}
              onClick={menuItemClick}
            />
          </Sider>
          <Layout
            style={{
              padding: "24px",
              height: "calc(100vh - 64px)",
            }}
          >
            <Content
              style={{
                padding: 24,
                margin: 0,
                background: colorBgContainer,
                height: "100%",
              }}
            >
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </LayoutWrapper>
  );
};
export default MainLayout;
