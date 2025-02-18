import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
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
      // console.log(res);
      const sortedList = res.data.sort(
        (a, b) => new Date(b.updateTime) - new Date(a.updateTime)
      );

      setList(res.data);
    }
    getList();
  }, []);

  const getListByDate = async (date1, date2) => {
    const res = await getArticleByDateAPI({ date1, date2 });
    setList(
      res.data.sort((a, b) => new Date(b.updateTime) - new Date(a.updateTime))
    );
  };

  const onFinish = (formValue) => {
    // console.log(formValue);
    const { date, status } = formValue;
    if (date == undefined) {
      message.error("Please select date");
      return;
    }
    const data1 = `${date[0].year()}-${date[0].month() + 1}-${date[0].date()}`;
    const data2 = `${date[1].year()}-${date[1].month() + 1}-${date[1].date()}`;
    getListByDate(data1, data2);
    // if (list) {
    //   console.log(list);
    //   const items = list.filter(
    //     (item) => { const date = new Date(item.createTime.substring(0,9));return date >= new Date(data1) && date <= new Date(data2)}
    //   );
    //   console.log(items);
    //   setList(items);
    // }
  };
  const columns = [
    { title: "Title", dataIndex: "title" },
    {
      title: "Status",
      dataIndex: "status",
      render: (data) =>
        data === 1 ? (
          <Tag color="success">Approved</Tag>
        ) : (
          <Tag color="warning">Pending review</Tag>
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
            <Radio.Group defaultValue={0}>
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

      {/* <Space>Date:</Space> <DatePicker
  name="date"
  showTime={{
    format: "HH:mm",
    defaultValue: dayjs("08:00", "HH:mm"), // Ensure default value is valid
    disabledHours: () =>
      Array.from({ length: 24 }, (_, i) =>
        i < 8 || i > 15 ? i : null
      ).filter((i) => i !== null), // Allow only 08:00 - 15:30
    disabledMinutes: (selectedHour) => {
      // Only show minutes 00 and 30
      return Array.from({ length: 60 }, (_, i) =>
        i === 0 || i === 30 ? null : i
      ).filter((i) => i !== null); // Exclude 00 and 30 from the available options
    },
  }}
  format="YYYY-MM-DD HH:mm" // Match the format without seconds
  disabledDate={(current) => current && current <= dayjs().endOf("day")} // Disable today and past dates
  onOk={(date) => {
    if (date) {
      console.log(date.format("YYYY-MM-DD HH:mm:00")); // Format with fixed :00 seconds
    }
  }}
/> */}
    </div>
  );
};

export default Article;
