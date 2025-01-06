// import { req } from "@/utils";
import { useEffect } from "react";
import { Layout, Menu, Popconfirm } from "antd";
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

import "./index.scss";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo } from "@/store/modules/user";

const { Header, Sider } = Layout;

const items = [
  {
    label: "First Page",
    key: "/",
    icon: <HomeOutlined />,
  },
  {
    label: "Blog Management",
    key: "/article",
    icon: <DiffOutlined />,
  },
  {
    label: "Create Blog",
    key: "/publish",
    icon: <EditOutlined />,
  },
];

const GeekLayout = () => {
  const navigate = useNavigate();

  const onMenuClick = (value) => {
    navigate(value.key);
  };
  const location = useLocation();
  const selectedKeys = location.pathname;
  const dispatch = useDispatch();

  useEffect(() => {
     dispatch(fetchUserInfo());
  }, [dispatch]);
  const name = useSelector((state) => state.user.userInfo.nickname);

  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{name}</span>
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
            selectedKeys={selectedKeys}
            onClick={onMenuClick}
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
