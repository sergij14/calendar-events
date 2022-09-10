import React, { FC, useState } from "react";
import { Button, Form, Input, Row, Select } from "antd";
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
  const [event, setEvent] = useState<IEvent>({
    author: "",
    date: "",
    description: "",
    guest: "",
  } as IEvent);
  const { user } = useTypedSelector((state) => state.auth);
  const {
    selectedDate: { date },
  } = useTypedSelector((state) => state.event);

  const submitForm = () => {
    if (date) {
      props.submit({ ...event, author: user.username, date });
    }
  };

  return (
    <Form onFinish={submitForm}>
      <Form.Item
        label="Event description"
        name="description"
        rules={[rules.required()]}
      >
        <Input
          onChange={(e) => setEvent({ ...event, description: e.target.value })}
          value={event.description}
        />
      </Form.Item>

      <Form.Item label="Guests" name="guest" rules={[rules.required()]}>
        <Select
          onChange={(guest: string) => setEvent({ ...event, guest })}
          mode="multiple"
          allowClear
        >
          {props.guests.map((guest) => (
            <Select.Option key={guest.username} value={guest.username}>
              {guest.username}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Type" name="type" rules={[rules.required()]}>
        <Select
          onChange={(type: IEvent["type"]) => setEvent({ ...event, type })}
        >
          {EVENT_TYPES.map((type) => (
            <Select.Option key={type} value={type}>
              {type}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Row justify="end">
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Row>
    </Form>
  );
};
