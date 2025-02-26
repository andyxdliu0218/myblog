import React from "react";
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
const { Content } = Layout;
const { Title, Text } = Typography;

// Sample Blog Data
const blogsData = [
  {
    id: 22,
    userId: 6,
    title: "Introduction to React",
    content:
      "<p>React is a powerful JavaScript library for building user interfaces.</p>",
    createTime: "2025-02-24 21:29:37",
  },
  {
    id: 21,
    userId: 6,
    title: "Ant Design in Action",
    content: "<p>Ant Design makes UI development faster and more elegant.</p>",
    createTime: "2025-02-24 21:12:26",
  },
  {
    id: 15,
    userId: 6,
    title: "Understanding Local Time",
    content: "<p>Why does local time mismatch occur? Let's discuss.</p>",
    createTime: "2025-02-11 22:52:27",
  },
  {
    id: 14,
    userId: 6,
    title: "My Career Aspirations",
    content: "<p>I wish I could find a Computer Science job.</p>",
    createTime: "2025-02-10 22:52:06",
  },
];

// Function to determine if a blog is recent (last 7 days)
const isRecentPost = (date) => dayjs().diff(dayjs(date), "day") <= 7;

export default function Home() {
  const navigate = useNavigate();
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
              dataSource={blogsData}
              pagination={{ pageSize: 2 }} // Enables pagination (2 blogs per page)
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
