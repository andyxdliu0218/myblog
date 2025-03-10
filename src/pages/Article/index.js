import { Link, useNavigate } from "react-router-dom";
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
  Popconfirm,
} from "antd";

import { Table, Tag, Space } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  QuestionCircleFilled,
} from "@ant-design/icons";
import img404 from "@/assets/error.png";
import {
  getArticleAPI,
  getArticleByDateAPI,
  getListByDateWithStatusAPI,
  deleteArticleAPI,
  updateArticleStatusAPI,
} from "@/apis/article";
import { useSelector } from "react-redux";

const { Option } = Select;
const { RangePicker } = DatePicker;

const Article = () => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);

  const [requestData, setRequestData] = useState({
    status: 2,
    date1: "",
    date2: "",
    page: 1,
  });

  const [count, setCount] = useState(0);

  const getListByDate = async (date1, date2, page) => {
    const res = await getArticleByDateAPI({ date1, date2, page });
    setCount(res.dataCount);
    setList(
      res.data
      // res.data.sort((a, b) => new Date(b.createTime) - new Date(a.createTime))
    );
  };

  const getListByDateWithStatus = async (date1, date2, page, status) => {
    const res = await getListByDateWithStatusAPI(
      { date1, date2, page },
      status
    );
    setCount(res.dataCount);
    setList(
      res.data
      // res.data.sort((a, b) => new Date(b.createTime) - new Date(a.createTime))
    );
  };

  const getList = async (status, page) => {
    const res = await getArticleAPI({ status, page });
    setCount(res.dataCount);
    setList(res.data);
  };

  const userInfo = useSelector((state) => state.user.userInfo);
  useEffect(() => {
    const { date1, date2, status, page } = requestData;
    if (!date1 && !date2) {
      getList(status, page);
    } else if (date1 && date2 && status !== 2) {
      getListByDateWithStatus(date1, date2, page, status);
    } else {
      getListByDate(date1, date2, page);
    }
    // console.log(userInfo);
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
      page: 1,
    });
    setPreStatus(status);
    setPreDate1(data1);
    setPreDate2(data2);
    return;
  };

  const onPageChange = (page) => {
    setRequestData({
      ...requestData,
      page,
    });
  };

  const onDeleteConfirm = async (data) => {
    await deleteArticleAPI(data.userId, data.id);

    setRequestData({
      ...requestData,
    });
  };
  const onApproveStatus = async (data) => {
    if (data.status === 1) {
      return;
    }
    await updateArticleStatusAPI(data.id, 1);

    setRequestData({
      ...requestData,
    });
  };
  const onChangeToPendingStatus = async (data) => {
    if (data.status === 0) {
      return;
    }
    await updateArticleStatusAPI(data.id, 0);

    setRequestData({
      ...requestData,
    });
  };
  const columns = [
    { title: "Title", dataIndex: "title" },
    { title: "Channel", dataIndex: "channel" },
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
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => {
                navigate(`/publish?id=${data.id}`);
              }}
            />

            <Popconfirm
              title="Delete this blog"
              description="Are you sure to delete this blog?"
              onConfirm={() => {
                onDeleteConfirm(data);
              }}
              // onCancel={onDeleteChange}
              okText="Yes"
              cancelText="No"
            >
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
              />
            </Popconfirm>

            <Popconfirm
              title="Change Status"
              description="Are you sure to switch its blog status?"
              onConfirm={() => {
                onApproveStatus(data);
              }}
              onCancel={() => {
                onChangeToPendingStatus(data);
              }}
              okText="Approve this blog"
              cancelText="Pending review"
            >
              <Button
                type="dashed"
                shape="circle"
                icon={<QuestionCircleFilled />}
              />
            </Popconfirm>
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
              Search
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card
        title={
          <>
            Based on the filtering criteria,{" "}
            <Tag color="#108ee9"> {count} </Tag>results have been found
          </>
        }
      >
        <Table
          rowKey="id"
          columns={columns}
          dataSource={list}
          pagination={{
            total: count,
            pageSize: 4,
            onChange: onPageChange,
            current: requestData.page,
          }}
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
