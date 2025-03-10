import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Upload,
  Radio,
  Input,
  Space,
  Select,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link, useSearchParams } from "react-router-dom";
import "./index.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  createArticleAPI,
  getArticleById,
  updateArticleAPI,
  getChannelListAPI,
} from "@/apis/article";
import { use, useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";

const { Option } = Select;

const Publish = () => {
  const [imageType, setImageType] = useState(0);
  const [imageList, setImageList] = useState([]);
  const [channellist, setChannellist] = useState([]);

  // const onFinish = (formValue) => {
  //   console.log(formValue);
  // };

  const [searchParams] = useSearchParams();
  const blogId = searchParams.get("id");

  const [form] = Form.useForm();

  useEffect(() => {
    async function getChannelList() {
      const res = await getChannelListAPI();
      setChannellist(res.data);
    }
    getChannelList();
  }, []);

  useEffect(() => {
    // get id from url
    // console.log(blogId);
    // use id to get data from backend
    async function getArticleDetail() {
      const res = await getArticleById(blogId);
      form.setFieldsValue(res.data);
    }
    if (blogId) {
      getArticleDetail();
    }
  }, [blogId, form]);

  const onFinish = async (formValue) => {
    const { title, channel, content, imageType } = formValue;
    const reqData = {
      title: title,
      content: content,
      cover: {
        imageType: imageType,
        urls: imageList.map((item) => item.response.data),
      },

      channel: channel,
    };

    if (
      !formValue.content ||
      formValue.content.trim() === "" ||
      formValue.content === "<p><br></p>"
    ) {
      form.resetFields();
      return;
    } else {
      if (blogId) {
        const res = await updateArticleAPI(formValue, blogId);
        message.success("Successfully Updated Blog");
      } else {
        // console.log(reqData);
        const res = await createArticleAPI(reqData);
        message.success("Successfully Created Blog");
        form.resetFields();
      }
    }
  };

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb
            items={[
              { title: <Link to={"/"}>Home</Link> },
              { title: `${blogId ? "Edit" : "Post"} Blog` },
            ]}
          />
        }
      >
        <Form
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 0 }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please input title" }]}
          >
            <Input placeholder="Please input title" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item label="Channel" name="channel" required>
            <Select
              placeholder="Please select a channel"
              style={{ width: 200 }}
            >
              {channellist.map((item) => {
                return (
                  <Option key={item.id} value={item.id}>
                    {item.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item label="Cover">
            <Form.Item name="imageType">
              <Radio.Group onChange={(e) => setImageType(e.target.value)}>
                <Radio value={1}>One Picture</Radio>
                <Radio value={2}>Two Pictures</Radio>
                <Radio value={0}>No picture</Radio>
              </Radio.Group>
            </Form.Item>

            {imageType > 0 && (
              <Upload
                name="image"
                listType="picture-card"
                showUploadList
                action={"http://localhost:8080/image/upload"}
                onChange={(value) => {
                  setImageList(value.fileList);
                }}
                maxCount={imageType}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            )}
          </Form.Item>

          <Form.Item
            label="Content"
            name="content"
            rules={[{ required: true, message: "Please input content" }]}
          >
            {/* input area */}
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="Please enter your content here"
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                {blogId ? "Update" : "Submit"}
              </Button>
              <Button htmlType="reset">Reset</Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Publish;
