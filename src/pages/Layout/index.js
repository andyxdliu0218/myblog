// import { req } from "@/utils";
import { useEffect, useCallback} from "react";
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
import { clearUserInfo, fetchUserInfo } from "@/store/modules/user";
import { getToken } from "@/utils";

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
  const dispatch = useDispatch();
  const location = useLocation();
  const selectedKeys = location.pathname;

  const onMenuClick = useCallback((value) => {
    if (value.key === "/article" || value.key === "/publish") {
      dispatch(fetchUserInfo());
    }
    if (getToken()) {
      navigate(value.key);
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await dispatch(fetchUserInfo());
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };
    
    fetchUser();
  }, [dispatch]);
  

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);

  const name = useSelector((state) => state.user.userInfo.nickname);

  const confirm = () => {
    // 1. clear token
    // 2. redirect to login page
    dispatch(clearUserInfo());
    navigate("/login");
  };

  // const cancel = ()=>{

  // }

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
              onConfirm={confirm}
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
