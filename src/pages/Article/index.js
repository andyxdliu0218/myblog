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
import {
  getArticleAPI,
  getArticleByDateAPI,
  getListByDateWithStatusAPI,
} from "@/apis/article";

const { Option } = Select;
const { RangePicker } = DatePicker;

const Article = () => {
  const [list, setList] = useState([]);

  const [requestData, setRequestData] = useState({
    status: 2,
    date1: "",
    date2: "",
  });

  const getListByDate = async (date1, date2) => {
    const res = await getArticleByDateAPI({ date1, date2 });
    setList(
      res.data.sort((a, b) => new Date(b.createTime) - new Date(a.createTime))
    );
  };

  const getListByDateWithStatus = async (date1, date2, status) => {
    const res = await getListByDateWithStatusAPI({ date1, date2 }, status);
    setList(
      res.data.sort((a, b) => new Date(b.createTime) - new Date(a.createTime))
    );
  };

  const getList = async (status) => {
    const res = await getArticleAPI();
    let list1 = res.data.sort(
      (a, b) => new Date(b.createTime) - new Date(a.createTime)
    );
    if (status !== 2) {
      list1 = list1.filter((item) => item.status === status);
    }
    setList(list1);
  };

  useEffect(() => {
    const { date1, date2, status } = requestData;
    if (!date1 && !date2) {
      getList(status);
    } else if (date1 && date2 && status !== 2) {
      getListByDateWithStatus(date1, date2, status);
    } else {
      getListByDate(date1, date2);
    }
  }, [requestData]);

  const [preStatus, setPreStatus] = useState(2);
  const [preDate1, setPreDate1] = useState("");
  const [preDate2, setPreDate2] = useState("");

  const onFinish = ({ date, status }) => {
    const data1 = date ? date[0].format("YYYY-MM-DD") : "";
    const data2 = date ? date[1].format("YYYY-MM-DD") : "";
    if (preStatus === status && preDate1 === data1 && preDate2 === data2) {
      return;
    }
    setRequestData({
      status: status,
      date1: data1,
      date2: data2,
    });
    setPreStatus(status);
    setPreDate1(data1);
    setPreDate2(data2);
    return;
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
  return (
    <div>
      <Card
        title={
          <Breadcrumb
            items={[
              { title: <Link to={"/home"}>Home</Link> },
              { title: "Post Article" },
            ]}
          />
        }
        style={{ marginBottom: 20 }}
      >
        <Form
          initialValues={{ status: 2 }}
          onFinish={onFinish}
          // onChange={onChange}
        >
          <Form.Item label="Status" name="status">
            <Radio.Group>
              <Radio value={2}>All</Radio>
              <Radio value={0}>Draft</Radio>
              <Radio value={1}>Approved</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Date" name="date">
            <RangePicker />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginleft: 40 }}>
              Screening
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
        <Table
          rowKey="id"
          columns={columns}
          dataSource={list}
          pagination={{ total: list.length, pageSize: 4 }}
        />
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
