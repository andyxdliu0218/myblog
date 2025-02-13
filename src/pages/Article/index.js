import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  DatePicker,
  Select,
  message,
} from "antd";

import { Table, Tag, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import img404 from "@/assets/error.png";
import { getArticleAPI, getArticleByDateAPI } from "@/apis/article";

const { Option } = Select;
const { RangePicker } = DatePicker;

const Article = () => {
  const [list, setList] = useState([]);
  useEffect(() => {
    async function getList() {
      const res = await getArticleAPI();
      console.log(res);
      const sortedList = res.data.sort(
        (a, b) => new Date(b.updateTime) - new Date(a.updateTime)
      );

      setList(res.data);
    }
    getList();
  }, []);

  const getList = async (date1, date2) => {
    const res = await getArticleByDateAPI({ date1, date2 });
    setList(
      res.data.sort((a, b) => new Date(b.updateTime) - new Date(a.updateTime))
    );
  };

  const onFinish = (formValue) => {
    console.log(formValue);
    const { date, status } = formValue;
    if (date == undefined) {
      message.error("Please select date");
      return;
    }
    const data1 = `${date[0].year()}-${date[0].month() + 1}-${date[0].date()}`;
    const data2 = `${date[1].year()}-${date[1].month() + 1}-${date[1].date()}`;
    getList(data1, data2);
  };
  const columns = [
    { title: "Title", dataIndex: "title" },
    {
      title: "Status",
      dataIndex: "status",
      render: (data) =>
        data == undefined || data === 2 ? (
          <Tag color="green">Approved</Tag>
        ) : (
          <Tag color="magenta">Pending review</Tag>
        ),
    },
    { title: "Publish Time", dataIndex: "createTime" },
    { title: "Update Time", dataIndex: "updateTime" },
    // { title: "Read Count", dataIndex: "read_count" },
    // { title: "Comment Count", dataIndex: "comment_count" },
    // { title: "Like Count", dataIndex: "like_count" },
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
  // const data = [
  //   {
  //     id: "8218",
  //     update_time: "2021-09-01 09:00:00",
  //     create_time: "2021-09-01 09:00:00",
  //     status: null,
  //     title: "Article 1",
  //   },
  // ];
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
        <Form initialValues={{ status: "all" }} onFinish={onFinish}>
          <Form.Item label="Status" name="status">
            <Radio.Group>
              <Radio value={0}>All</Radio>
              <Radio value={1}>Draft</Radio>
              <Radio value={2}>Approved</Radio>
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
      <Card
        title={
          <>
            Based on the filtering criteria,{" "}
            <Tag color="#108ee9">{list.length}</Tag>results have been found
          </>
        }
      >
        <Table rowKey="id" columns={columns} dataSource={list} />
      </Card>
    </div>
  );
};

export default Article;
