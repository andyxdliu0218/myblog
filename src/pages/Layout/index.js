// import { req } from "@/utils";
// import { useEffect } from "react";
import { Layout, Menu, Popconfirm } from "antd";
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

import "./index.scss";
import { Outlet } from "react-router-dom";

const { Header, Sider } = Layout;

const items = [
  {
    label: "First Page",
    key: "1",
    icon: <HomeOutlined />,
  },
  {
    label: "Blog Management",
    key: "2",
    icon: <DiffOutlined />,
  },
  {
    label: "Create Blog",
    key: "3",
    icon: <EditOutlined />,
  },
];

const GeekLayout = () => {
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">Andy</span>
          <span className="user-logout">
            <Popconfirm
              title="Please confirm to log out"
              okText="logout"
              cancelText="cancel"
            >
              <LogoutOutlined /> logout
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            defaultOpenKeys={["1"]}
            items={items}
            style={{ height: "100%", borderRight: 0 }}
          ></Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default GeekLayout;
