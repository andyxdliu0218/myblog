import { React, useState, useEffect } from "react";
import {
  List,
  Card,
  Tag,
  Typography,
  Button,
  Space,
  Breadcrumb,
  Watermark,
  Layout,
} from "antd";
import parse from "html-react-parser";
import dayjs from "dayjs";
import "./index.scss"; // Import SCSS for custom styling
import { useNavigate, Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { getAllArticleAPI } from "@/apis/article";
const { Content } = Layout;
const { Title, Text } = Typography;

// Function to determine if a blog is recent (last 7 days)
const isRecentPost = (date) => dayjs().diff(dayjs(date), "day") <= 7;

export default function Home() {
  const navigate = useNavigate();
  const [count, setCount] = useState(2);
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getList = async () => {
      const res = await getAllArticleAPI({ page });
      setCount(res.dataCount);
      setList(res.data);
    };
    getList();
  }, [page]);

  const onPageChange = (currPage) => {
    setPage(currPage);
  };
  return (
    <div className="blog-container">
      <Layout>
        <Content style={{ padding: "0 24px", minHeight: 280 }}>
          <Card
            title={
              <Breadcrumb
                items={[{ title: <Tag color="yellow">Home Page</Tag> }]}
              />
            }
            style={{ marginBottom: 20 }}
          >
            <Title level={1} className="blog-title">
              📜 Latest Blogs
            </Title>
            <List
              dataSource={list}
              pagination={{
                pageSize: 2,
                total: count,
                current: page,
                onChange: onPageChange,
              }} // Enables pagination (2 blogs per page)
              renderItem={(blog) => (
                <List.Item className="list-item">
                  <Card className="blog-card" hoverable>
                    <div className="blog-header">
                      <Text strong className="blog-title-text">
                        {blog.title}
                      </Text>
                      {isRecentPost(blog.createTime) && (
                        <Tag color="green">New</Tag>
                      )}
                    </div>
                    <Watermark content="Ant Design">
                      <div className="blog-content">{parse(blog.content)}</div>
                    </Watermark>
                    <div className="blog-footer">
                      <Text type="secondary">
                        🕒 {dayjs(blog.createTime).format("YYYY-MM-DD HH:mm")}
                      </Text>
                    </div>
                    <Space>
                      <Button
                        type="primary"
                        shape="circle"
                        icon={<EditOutlined />}
                        onClick={() => {
                          navigate(`/publish?id=${2}`);
                        }}
                      />
                      <Button
                        type="primary"
                        shape="circle"
                        icon={<EditOutlined />}
                        onClick={() => {
                          navigate(`/publish?id=${2}`);
                        }}
                      />
                    </Space>
                  </Card>
                </List.Item>
              )}
            />
          </Card>
        </Content>
      </Layout>
    </div>
  );
}
