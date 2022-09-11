import React, { FC } from "react";
import { Button, Form, Input, Row, Select, Space } from "antd";
import { rules } from "../utils/rules";
import { IUser } from "../models/IUser";
import { IEvent } from "../models/IEvent";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { EVENT_TYPES } from "../constants";

interface EventFormProps {
  guests: IUser[];
  submit: (event: IEvent) => void;
}

export const EventForm: FC<EventFormProps> = (props) => {
  const { user } = useTypedSelector((state) => state.auth);
  const [form] = Form.useForm();
  const {
    selectedDate: { date },
  } = useTypedSelector((state) => state.event);

  const submitForm = (values: IEvent) => {
    if (date) {
      props.submit({ ...values, author: user.username, date });
      form.resetFields();
    }
  };

  return (
    <Form initialValues={{type: 'default'}} layout="vertical" onFinish={submitForm} form={form}>
      <div style={{ display: "flex", gap: "10px", width: "100%" }}>
        <Form.Item
          style={{ width: "50%" }}
          label="Event title"
          name="title"
          rules={[rules.required()]}
        >
          <Input />
        </Form.Item>
        <Form.Item style={{ width: "50%" }} label="Type" name="type">
          <Select>
            {EVENT_TYPES.map((type) => (
              <Select.Option key={type} value={type}>
                {type}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </div>

      <Form.Item
        label="Event description"
        name="description"
        rules={[rules.required()]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item label="Guests" name="guest" rules={[rules.required()]}>
        <Select mode="multiple" allowClear>
          {props.guests.map((guest) => (
            <Select.Option key={guest.username} value={guest.username}>
              {guest.username}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Row justify="end">
        <Form.Item>
          <Space direction="horizontal" size="small">
            <Button type="primary" htmlType="submit">
              Create
            </Button>
            <Button onClick={() => form.resetFields()}>Reset</Button>
          </Space>
        </Form.Item>
      </Row>
    </Form>
  );
};
