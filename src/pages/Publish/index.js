import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Space,
  Select,
} from "antd";
// import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./index.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { createArticleAPI } from "@/apis/article";

const { Option } = Select;

const Publish = () => {
  const [form] = Form.useForm();

  const onFinish = async (formValue) => {
    console.log(formValue);
    if (
      !formValue.content ||
      formValue.content.trim() === "" ||
      formValue.content === "<p><br></p>"
    ) {
      form.resetFields();
      return;
    } else {
      const res = await createArticleAPI(formValue);
      console.log(res);
    }
  };

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb
            items={[
              { title: <Link to={"/"}>Home</Link> },
              { title: "Post Article" },
            ]}
          />
        }
      >
        <Form
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 1 }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please input title" }]}
          >
            <Input placeholder="Please input title" style={{ width: 400 }} />
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
                Submit
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
