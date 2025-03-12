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
  Col,
  Row,
  Pagination,
} from "antd";
import parse from "html-react-parser";
import dayjs from "dayjs";
import "./index.scss"; // Import SCSS for custom styling
import { useNavigate, Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { getAllArticleAPI } from "@/apis/article";
import { useSelector } from "react-redux";
import img404 from "@/assets/error.png";

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
    const fetchArticles = async () => {
      try {
        const res = await getAllArticleAPI({ page });
        setCount(res.dataCount);
        setList(res.data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };
    fetchArticles();
    // console.log(userInfo)
  }, [page]);

  const userInfo = useSelector((state) => state.user.userInfo);

  return (
    <div className="blog-container">
      <Layout>
        <Card
          title={
            <Breadcrumb
              items={[{ title: <Tag color="yellow">Home Page</Tag> }]}
            />
          }
          style={{ marginBottom: 20 }}
        >
          <Content>
            <Title level={1} className="blog-header">
              <span className="icon"></span> Blogs
            </Title>
            <Row gutter={[32, 32]} className="blog-list">
              {list.map((blog) => (
                <Col xs={24} sm={12} md={12} lg={12} key={blog.id}>
                  <div className="blog-item">
                    <Space size={"middle"}>
                      <Text className="blog-title" strong>
                        {blog.title}
                      </Text>

                      {isRecentPost(blog.createTime) && (
                        <Tag color="green">New</Tag>
                      )}
                    </Space>
                    <br />

                    <img
                      src={
                        (blog.cover.urls != null && blog.cover.urls[0]) ||
                        img404
                      }
                      width={80}
                      height={60}
                      alt="cover"
                    />

                    <Text>{parse(blog.content.slice(0, 10) + " ......")}</Text>
                    {blog.createTime}
                    <br />

                    <Space size={"middle"} className="blog-footer">
                      {blog.userId === userInfo.id && (
                        <Button
                          type="primary"
                          shape="circle"
                          icon={<EditOutlined />}
                          onClick={() => {
                            navigate(`/publish?id=${2}`);
                          }}
                        />
                      )}
                      <Text
                        className="read-more"
                        onClick={() => navigate(`/blog/${blog.id}`)}
                      >
                        Read More
                      </Text>
                    </Space>
                  </div>
                </Col>
              ))}
            </Row>
            <Pagination
              className="blog-pagination"
              current={page}
              total={count}
              pageSize={6}
              onChange={setPage}
            />
          </Content>
        </Card>
      </Layout>
    </div>
  );
}
