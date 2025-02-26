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
import { createArticleAPI, getArticleById, updateArticleAPI } from "@/apis/article";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";

const { Option } = Select;

const Publish = () => {
  // const [imageType, setImageType] = useState(0);

  // const onChange = (e) => {
  //   console.log(e.target.value);
  //   setImageType(e.target.value);
  // };

  // const onFinish = (formValue) => {
  //   console.log(formValue);
  // };

  const [searchParams] = useSearchParams();
  const blogId = searchParams.get("id");

  const [form] = Form.useForm();

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
    if (
      !formValue.content ||
      formValue.content.trim() === "" ||
      formValue.content === "<p><br></p>"
    ) {
      form.resetFields();
      return;
    } else {
      if (blogId) {
        const res = await updateArticleAPI(formValue,blogId)
        message.success("Successfully Updated Blog");
      } else {
        const res = await createArticleAPI(formValue);
        message.success("Successfully Created Blog");
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

          {/* <Form.Item label="Cover">
            <Form.Item name="type">
              <Radio.Group onChange={onChange}>
                <Radio value={0}>Type 0</Radio>
                <Radio value={1}>Type 1</Radio>
                <Radio value={2}>Type 2</Radio>
              </Radio.Group>
            </Form.Item>

            {imageType > 0 && (
              <Upload listType="picture-card" showUploadList={true}>
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            )}
          </Form.Item> */}

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
