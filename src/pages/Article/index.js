import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  DatePicker,
  Select,
} from "antd";

import { Table, Tag, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import img404 from "@/assets/error.png";

const { Option } = Select;
const { RangePicker } = DatePicker;

const Article = () => {
  const onFinish = (formValue) => {
    console.log(formValue);
    const { date, status } = formValue;

    const data1 = `${date[0].year()}-${date[0].month() + 1}-${date[0].date()}`;
    console.log(data1);
  };
  const columns = [
    { title: "Title", dataIndex: "title" },
    { title: "Read Count", dataIndex: "read_count" },
    { title: "Comment Count", dataIndex: "comment_count" },
    { title: "Like Count", dataIndex: "like_count" },
    { title: "Publish Date", dataIndex: "pubdate" },
    {
      title: "Status",
      dataIndex: "status",
      render: (data) =>
        data === 2 ? (
          <Tag color="green">Approved</Tag>
        ) : (
          <Tag color="magenta">Pending review</Tag>
        ),
    },

    {
      title: "Action",
      render: (data) => {
        return (
          <Space size="middle">
            <Button type="primary" shape="circle" icon={<EditOutlined />} />
            <Button
              type="primary"
              danger
              shape="circle"
              icon={<DeleteOutlined />}
            />
          </Space>
        );
      },
    },
  ];

  // body data
  const data = [
    {
      id: "8218",
      read_count: 2,
      comment_count: 0,
      like_count: 0,
      pubdate: "2021-09-01 09:00:00",
      status: 2,
      title: "Article 1",
    },
  ];
  return (
    <div>
      <Card
        title={
          <Breadcrumb
            items={[
              { title: <Link to={"/"}>Home</Link> },
              { title: "Post Article" },
            ]}
          />
        }
        style={{ marginBottom: 20 }}
      >
        <Form initialValues={{ status: null }} onFinish={onFinish}>
          <Form.Item label="Status" name="status">
            <Radio.Group>
              <Radio value={null}>All</Radio>
              <Radio value={0}>Draft</Radio>
              <Radio value={2}>Ok to Publish</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Date" name="date">
            <RangePicker />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginleft: 40 }}>
              Select Date
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card>
        <Table rowKey="id" columns={columns} dataSource={data} />
      </Card>
    </div>
  );
};

export default Article;
