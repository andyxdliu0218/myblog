import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./index.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const { Option } = Select;

const Publish = () => {
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
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 1 }}
        >
          <Form.Item
            label="Title"
            // name="title"
            rules={[{ required: true, message: "Please input title" }]}
          >
            <Input placeholder="Please input title" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item label="Tags" name="tags">
            <Select
              mode="tags"
              placeholder="Please input tags"
              style={{ width: 400 }}
            ></Select>
          </Form.Item>
          <Form.Item label="Type" name="type">
            <Radio.Group>
              <Radio value={1}>Original</Radio>
              <Radio value={2}>Reprint</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="Content"
            // name="content"
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
              <Button type="primary">Submit</Button>
              <Button>Cancel</Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Publish;
